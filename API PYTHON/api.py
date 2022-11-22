import time
import datetime
import getpass
import mysql.connector
import pyautogui
from psutil import *
import platform 
from pynput import keyboard
import cpuinfo

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
    chamados = 0
    inicio = datetime.datetime.now()
    def on_press(key):
        
        if key.char == "s":
            insert(f'insert into Relatorio values(null, {idUsuario[0]}, {idMaquina}, {numeroRegistros}, {chamados}, "{inicio}", "{datetime.datetime.now()}")')
            print("Encerrando API...")
            time.sleep(7)
            pyautogui.hotkey("Ctrl","c")
    
                    
    while True:
            
            with keyboard.Listener(
                on_press=on_press) as listener:
                    
               
                usoAtualMemoria = virtual_memory().percent
                usoCpuPorc = cpu_percent()
                freqCpu = round(cpu_freq().current,0)
            
                


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
        
        print('Login feito com sucesso!')
        serial = input("Digite o serial da máquina: ")
        idMaquina = select(f"select idMaquina from maquina where serialMaquina = '{serial}'")
        print('Iniciando captura')
        insertPeriodico(idMaquina[0], serial)