import time
import datetime
import getpass
import mysql.connector
import pyautogui
from psutil import *
import platform 
from pynput import keyboard
import cpuinfo
import requests
from json import loads

serial = ''
chamados = 0
sistema = platform.system()
cnx = mysql.connector.connect(user="root",
                              password="pjTw&XK^tmkA", 
                              host="localhost", 
                              database="SAMP", 
                              autocommit=True)
def insert(query): 
    try: # o comando try serve para verificar se toos os comandos serão executados de maneira exata, caso o contrário, ele para no momento em que detectou um erro, indo para o except que informa o erro.

        cnx.reconnect()
        cursor = cnx.cursor(buffered=True)
        cursor.execute(query)
    except mysql.connector.Error as error:
        print("ERRO {}".format(error))
    finally: # Após a execução dos comandos acima, o finally fecha as conexões
        if cnx.is_connected():
            linhas = cursor.rowcount
            cursor.close()
            cnx.close()
            return linhas

def select(query, isAllRequested = False):
    try:
        
        cnx.reconnect()
        cursor = cnx.cursor(buffered=True)
        cursor.execute(query)
        
        if isAllRequested: # verificando se retornou do banco
            dados = cursor.fetchall() # retornando os dados do banco
            
        else:
            dados = cursor.fetchone()
        
    except mysql.connector.Error as error:
        print(f"Erro: {error}")
        dados = error
        
    finally:
        if cnx.is_connected():
            cursor.close()
            cnx.close()
            
            time.sleep(2)
            return dados

def insertPeriodico(idMaquina, serialMaquina):
    metricaCpu = select(f'select capturaMin, capturaMax from metrica join componente on idMetrica = fkMetrica where fkMaquina = {idMaquina} and nomeComponente like "CPU%"')
    metricaRam = select(f'select capturaMin, capturaMax from metrica join componente on idMetrica = fkMetrica where fkMaquina = {idMaquina} and nomeComponente like "RAM%"')
    idUsuario = select(f'select idUsuario from usuario join empresa on idEmpresa = usuario.fkEmpresa join maquina on idEmpresa = maquina.fkEmpresa where idMaquina = {idMaquina};')
    numeroRegistros = 0
    
    inicio = datetime.datetime.now()
    def on_press(key):
        
        if key.char == "s":
            insert(f'insert into Relatorio values(null, {idUsuario[0]}, {idMaquina}, {numeroRegistros}, {chamados}, "{inicio}", "{datetime.datetime.now()}")')
            print("Encerrando API...")
            pyautogui.hotkey("Ctrl","c")
    
                    
    while True:
            
            with keyboard.Listener(
                on_press=on_press) as listener:
                    
               
                usoAtualMemoria = virtual_memory().percent
                usoCpuPorc = cpu_percent()
               
            
                if(usoAtualMemoria > 40):
                    abrirChamado('RAM', serial, usoAtualMemoria, 40)
                    


                particoes = []
                if sistema == "Windows":
                    for part in disk_partitions(all=False): # identificando partições
                        if part[0] == "F:\\":
                            break
                        elif part[0] == "E:\\":
                            break
                        else:
                            particoes.append(part[0])
                elif sistema == "Linux":
                    particoes.append("/")


                porcentagemOcupados = [] 
                for j in particoes:
                    porcentagemOcupados.append(disk_usage(j).percent) 

                usoDisco = porcentagemOcupados[0]

                dataHora = datetime.datetime.now()
                marcaCpu = 'CPU ' + cpuinfo.get_cpu_info()['brand_raw']
                query = f"INSERT INTO Dados VALUES(NULL, {usoCpuPorc}, '{dataHora}', (select idComponente from componente where nomeComponente = '{marcaCpu}' and fkMaquina = {idMaquina})), (NULL, {usoAtualMemoria}, '{dataHora}', (select idComponente from componente where nomeComponente = 'RAM' and fkMaquina = {idMaquina})), (NULL, {usoDisco}, '{dataHora}', (select idComponente from componente where nomeComponente = 'Disco {particoes[0]}\\' and fkMaquina = {idMaquina}));"
                

                insert(query)
                
                numeroRegistros+=1
            
def abrirChamado(componente, serial, valorAtual, metrica):
    url = "https://api.pipefy.com/graphql"

    query = {"query": "{allCards(pipeId: 302763672) {edges {node {id title age}}}}"}

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwODY5MjUsImVtYWlsIjoiam9hby5jb25jZWljYW9Ac3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMDc0NzZ9fQ.SRZx-58-x8HKCSTanwLU7MzGVoenpQwrmFpDppWzJduSo8NDJKtAw65ECGCGWEOO_1SJ65LnacQmgQ0aEIunXA"
    }

    response = requests.post(url, json=query, headers=headers)
    jason = response.text
    data = loads(jason)

    dados = data['data']['allCards']['edges']

    if valorAtual < metrica:
        problema = f'A {componente} está acima de {metrica}%!'
    elif valorAtual > metrica:
        problema = f'A {componente} está abaixo de {metrica}%!'

    temIgual = False
    i = 0
    while i < len(dados):
        age = dados[i]['node']['age']
        titulo = dados[i]['node']['title']
        if age <86400 and titulo == problema:
            temIgual = True
        i += 1
    payload = {'query':  'mutation{createCard(input: {pipe_id:302763672, title: "Novo Card", fields_attributes: [{field_id: "qual_o_serial_da_m_quina", field_value: "%s"} {field_id: "qual_o_componente_afetado", field_value: "%s"}{field_id: "problema", field_value: "%s"}{field_id: "mais_informa_es", field_value: "A %s da máquina de serial %s atingiu um uso de %.2f. Valor fora do limite estabelecido de %.2f"}]}){card {title}}}' % (serial, componente, problema, componente, serial, valorAtual, metrica)}

    if temIgual:
        print('o card ja existe')
    else:
        criar = requests.post(url, json=payload, headers=headers)
        global chamados
        chamados += 1
          
entrou = False
while entrou ==False:
    print(f"Bem vindo, faça login para iniciar a captura!")
    email = input('Digite o seu email: ')
    senha = getpass.getpass('Digite a sua senha')
    query = f"select * from usuario where email = '{email}' and senha = md5('{senha}');"
    resultado = select(query)
    if resultado == None:
        print('erro')
        print(resultado)
    else:
        url = "https://api.pipefy.com/graphql"

        query = {"query": "{me {id}}"}

        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwODY5MjUsImVtYWlsIjoiam9hby5jb25jZWljYW9Ac3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMDc0NzZ9fQ.SRZx-58-x8HKCSTanwLU7MzGVoenpQwrmFpDppWzJduSo8NDJKtAw65ECGCGWEOO_1SJ65LnacQmgQ0aEIunXA"
        }

        response = requests.post(url, json=query, headers=headers)
        jason = response.text
        data = loads(jason)
        idPipefy = data['data']['me']['id']
        insert(f"update usuario set idPipefy = '{idPipefy}' where email = '{email}'")
        print('Login feito com sucesso!')
        serial = input("Digite o serial da máquina: ")
        idMaquina = select(f"select idMaquina from maquina where serialMaquina = '{serial}'")
        print('Iniciando captura')
        insertPeriodico(idMaquina[0], serial)