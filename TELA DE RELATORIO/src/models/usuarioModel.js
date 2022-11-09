var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT * FROM UsuarioEmpresa 
            WHERE emailUsuario = '${email}' AND senha = HashBytes('MD5', '${senha}');
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
            SELECT * FROM UsuarioEmpresa 
                WHERE emailUsuario = '${email}' AND senha = MD5('${senha}');
        `;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

        
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarFuncionarios(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarLivros()");
    var instrucao = `
    select * from usuario where fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarEmailEmpresa(emailEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarLivros()");
    var instrucao = `
        SELECT emailEmpresa FROM usuarioEmpresa WHERE emailEmpresa LIKE '${emailEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarEmailUsuario(emailUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarLivros()");
    var instrucao = `
        SELECT emailUsuario FROM usuarioEmpresa WHERE emailUsuario LIKE '${emailUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(cnpj, nomeEmpresa, emailEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, nomeEmpresa, emailEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO Empresa (cnpj, nome, email) VALUES ('${cnpj}', '${nomeEmpresa}', '${emailEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionarUltimaEmpresa(){
    var query = `
        SELECT MAX(idEmpresa) AS 'idEmpresa' FROM Empresa;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, fkEmpresa, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa, cargo);

    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            INSERT INTO Usuario (nome, email, senha, fkEmpresa, cargo) VALUES ('${nome}', '${email}', HashBytes('MD5', '${senha}'), ${fkEmpresa}, '${cargo}');
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
            INSERT INTO Usuario (nome, email, senha, fkEmpresa, cargo) VALUES ('${nome}', '${email}', MD5('${senha}'), ${fkEmpresa}, '${cargo}');
        `;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, idEmpresa, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, idEmpresa, cargo);

    var instrucao = ``;

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            INSERT INTO Usuario (nome, email, senha, fkEmpresa, cargo) VALUES ('${nome}', '${email}', HashBytes('MD5', '${senha}'), ${idEmpresa}, '${cargo}');
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
            INSERT INTO Usuario (nome, email, senha, fkEmpresa, cargo) VALUES ('${nome}', '${email}', MD5('${senha}'), ${idEmpresa}, '${cargo}');
        `;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    validarEmailEmpresa,
    validarEmailUsuario,
    cadastrar,
    cadastrarUsuario,
    cadastrarEmpresa,
    selecionarUltimaEmpresa,
    listar,
    buscarFuncionarios
};