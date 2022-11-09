CREATE USER 'sampUser'@'localhost' IDENTIFIED BY 'samp';
GRANT ALL PRIVILEGES ON samp.* TO 'sampUser'@'localhost';

CREATE DATABASE SAMP;

USE SAMP;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100),
    email VARCHAR (100),
    cnpj CHAR(14)
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100),
    email VARCHAR (100),
    senha VARCHAR (100),
    cargo VARCHAR (100),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	serialMaquina CHAR(12),
    nome VARCHAR(100),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);



CREATE TABLE Medida(
	idMedida INT PRIMARY KEY AUTO_INCREMENT,
    unidadeMedida VARCHAR (8)
);

CREATE TABLE Metrica(
	idMetrica INT PRIMARY KEY AUTO_INCREMENT,
    capturaMin DOUBLE,
    capturaMax DOUBLE
);

CREATE TABLE Componente(
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nomeComponente VARCHAR (50),
    tamanho DOUBLE,
    fkMaquina INT,
    fkMetrica INT,
    fkMedida INT,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina (idMaquina),
    FOREIGN KEY (fkMetrica) REFERENCES Metrica (idMetrica),
    FOREIGN KEY (fkMedida) REFERENCES Medida (idMedida)
);

CREATE TABLE Dados(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    registro DOUBLE,
    momento DATETIME,
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES Componente (idComponente)
);

USE SAMP;

CREATE VIEW DadosServidor
AS
	SELECT
		idEmpresa,
		idRegistro,
		idMaquina,
        fkComponente,
        nomeComponente,
        tamanho,
        registro,
        DATE_FORMAT(momento,'%d/%m/%Y %H:%i:%s') AS 'momento',
        unidadeMedida
	FROM
		Maquina
	INNER JOIN
		Empresa ON Maquina.fkEmpresa = Empresa.idEmpresa
	INNER JOIN
		Componente ON Maquina.idMaquina = Componente.fkMaquina
	INNER JOIN
		Medida ON Componente.fkMedida = Medida.idMedida
	INNER JOIN
		Dados ON Componente.idComponente = Dados.fkComponente;
        
CREATE VIEW MediaUsoComponente
AS
	SELECT
		idMaquina,
		fkComponente,
        nomeComponente,
		ROUND(AVG(registro), 2) AS 'MediaUso'
	FROM Maquina
	INNER JOIN
		Componente ON Maquina.idMaquina = Componente.fkMaquina
	INNER JOIN
		Medida ON Componente.fkMedida = Medida.idMedida
	INNER JOIN
		Dados ON Componente.idComponente = Dados.fkComponente
	GROUP BY fkComponente;
    
CREATE VIEW UsuarioEmpresa
AS
	SELECT
		idEmpresa,
		Empresa.nome AS 'nomeEmpresa',
		Empresa.email AS 'emailEmpresa',
		cnpj,
		idUsuario,
		Usuario.nome AS 'nomeUsuario',
		Usuario.email AS 'emailUsuario',
		senha,
		cargo
	FROM Empresa
	INNER JOIN
		Usuario ON Empresa.idEmpresa = Usuario.fkEmpresa;
        
        

insert into medida values(NULL, '%'), (NULL, 'Ghz'), (NULL, 'Gb');

