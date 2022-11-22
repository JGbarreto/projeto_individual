select * from componente where fkMaquina = 2 and nomeComponente like "CPU%";
select * from dados order by idRegistro desc;

select * from maquina;
select * from usuario;
select * from relatorio;
select registro, DATE_FORMAT(momento,'%d/%m/%Y %H:%i:%s') as momento from dados join componente on dados.fkComponente = idComponente join maquina on idMaquina = componente.fkMaquina join relatorio on idMaquina = relatorio.fkMaquina where idComponente = 5 and relatorio.fkUsuario = 1 and momento >=(select inicio from relatorio where relatorio.fkUsuario = 1 order by inicio limit 1) and momento <= (select inicio from relatorio where relatorio.fkUsuario = 1 order by final desc limit 1) order by momento desc limit 50;
select sum(numeroRegistros) as qtdDados, DATE_FORMAT(momento, '%d/%m/%Y') as dia from dados join componente on dados.fkComponente = idComponente join maquina on idMaquina = componente.fkMaquina join relatorio on idMaquina = relatorio.fkMaquina where idMaquina=1 and relatorio.fkUsuario = 1 and momento >=(select inicio from relatorio where relatorio.fkUsuario = 1 order by inicio limit 1) and momento <= (select inicio from relatorio where relatorio.fkUsuario = 1 order by final desc limit 1) group by DATE_FORMAT(momento, '%d/%m/%Y') order by momento;
select * from usuario where email = 'joao@banana.com' and senha = md5('123');
select idRegistro from dadosservidor where idEmpresa = 1;
select idMaquina from usuario join empresa on empresa.idEmpresa = usuario.fkEmpresa join maquina on empresa.idEmpresa = maquina.fkEmpresa join componente on maquina.idMaquina = componente.fkMaquina join dados on maquina.idMaquina = dados.fkComponente where idUsuario = 1;
-- retornar o numero de maquinas que esse usuario ja monitorou
select count(relatorio.fkMaquina) from relatorio where fkUsuario=1 group by relatorio.fkMaquina;
-- select para retornar tempo de atividade
select DATE_FORMAT(inicio,'%d') as dia, DATE_FORMAT(inicio,'%H') as hora from relatorio;