var database = require("../database/config");

function buscarMaquinas(){
    var query = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        // ADAPTAR

        query = `SELECT * FROM Maquina;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `SELECT * FROM Maquina;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}



function buscarServidores(idEmpresa){
    var query = ``;

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        query = `SELECT * FROM Maquina WHERE fkEmpresa = ${idEmpresa};`;
    }else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        query = `SELECT * FROM Maquina WHERE fkEmpresa = ${idEmpresa};`;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}


function buscarComponentesMaquina(idEmpresa, idMaquina){
    var query = ``;

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        //TALVEZ PRECISE ADAPTAR
        query = `SELECT fkComponente FROM DadosServidor WHERE idMaquina = ${idMaquina} AND idEmpresa = ${idEmpresa} GROUP BY fkComponente;`;
    }else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        query = `SELECT fkComponente FROM DadosServidor WHERE idMaquina = ${idMaquina} AND idEmpresa = ${idEmpresa} GROUP BY fkComponente;`;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarComponentesMaquinaPorUser(idUsuario, idMaquina){
    var query = ``;

    if(process.env.AMBIENTE_PROCESSO == "producao") {
        //TALVEZ PRECISE ADAPTAR
        query = `SELECT fkComponente FROM DadosServidor WHERE idMaquina = ${idMaquina} AND idEmpresa = ${idEmpresa} GROUP BY fkComponente;`;
    }else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        query = `SELECT idComponente FROM componente join maquina on componente.fkMaquina = idMaquina join empresa on idEmpresa = maquina.fkEmpresa join usuario on idEmpresa = usuario.fkEmpresa where idMaquina = '${idMaquina}' and idUsuario = '${idUsuario}'`;
    }else{
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarUltimosRegistros(idEmpresa, idMaquina, fkComponente, limite_linhas) {

    var query = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        // ADAPTAR SE PRECISAR
        query = `SELECT TOP ${limite_linhas} * FROM DadosServidor 
        WHERE idEmpresa = ${idEmpresa} AND idMaquina = ${idMaquina} AND fkComponente = ${fkComponente} ORDER BY idRegistro;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `SELECT * FROM DadosServidor 
                    WHERE idEmpresa = ${idEmpresa} AND idMaquina = ${idMaquina} AND fkComponente = ${fkComponente} ORDER BY idRegistro LIMIT ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarUltimosRegistrosUser(idUsuario, idMaquina, fkComponente, limite_linhas) {

    var query = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        // ADAPTAR SE PRECISAR
        query = `SELECT TOP ${limite_linhas} * FROM DadosServidor 
        WHERE idEmpresa = ${idEmpresa} AND idMaquina = ${idMaquina} AND fkComponente = ${fkComponente} ORDER BY idRegistro;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `select registro, momento from dados join componente on dados.fkComponente = idComponente join maquina on idMaquina = componente.fkMaquina join relatorio on idMaquina = relatorio.fkMaquina where idComponente = ${fkComponente} and relatorio.fkUsuario = ${idUsuario} and momento >=(select inicio from relatorio where relatorio.fkUsuario = ${idUsuario} order by inicio limit 1) and momento <= (select inicio from relatorio where relatorio.fkUsuario = ${idUsuario} order by final desc limit 1) order by momento desc limit 50;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarRegistroTempoReal(idEmpresa, idMaquina, fkComponente) {

    var query = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        // ADAPTAR SE PRECISAR
        query = `SELECT TOP 1 * FROM DadosServidor 
            WHERE idEmpresa = ${idEmpresa} AND idMaquina = ${idMaquina} AND fkComponente = ${fkComponente} ORDER BY idRegistro DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `SELECT * FROM DadosServidor 
                    WHERE idEmpresa = ${idEmpresa} AND idMaquina = ${idMaquina} AND fkComponente = ${fkComponente} ORDER BY idRegistro DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function mediaUsoComponente(){
    var query = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        // ADAPTAR

        query = `SELECT * FROM MediaUsoComponente;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `SELECT * FROM MediaUsoComponente;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function infoMaquina(idMaquina){
    var query = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        query = `SELECT * FROM InfoMaquina WHERE idMaquina = ${idMaquina}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        query = `SELECT * FROM InfoMaquina WHERE idMaquina = ${idMaquina}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);

}

// function buscarUltimasMedidas(idAquario, limite_linhas) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top ${limite_linhas}
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         momento,
//                         FORMAT(momento, 'HH:mm:ss') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc`;
//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         momento,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc limit ${limite_linhas}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoReal(idAquario) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top 1
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         CONVERT(varchar, momento, 108) as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarMaquinas,
    buscarComponentesMaquina,
    buscarUltimosRegistros,
    buscarRegistroTempoReal,
    mediaUsoComponente,
    buscarServidores,
    infoMaquina,
    buscarComponentesMaquinaPorUser,
    buscarUltimosRegistrosUser
    // buscarUltimasMedidas,
    // buscarMedidasEmTempoReal
}
