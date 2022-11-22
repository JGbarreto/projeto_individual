var medidaModel = require("../models/medidaModel");

function buscarMaquinas(req, res){
    medidaModel.buscarMaquinas().then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontradas máquinas!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar resgatar as máquinas! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarComponentesMaquina(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idMaquina = req.params.idMaquina;

    medidaModel.buscarComponentesMaquina(idEmpresa, idMaquina).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados componentes!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar resgatar os componentes da máquina! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarComponentesMaquinaPorUser(req, res){

    var idUsuario = req.params.idUsuario;
    var idMaquina = req.params.idMaquina;

    medidaModel.buscarComponentesMaquinaPorUser(idUsuario, idMaquina).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados componentes!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar resgatar os componentes da máquina! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarUltimosRegistros(req, res){

    const limite_linhas = 7;

    var idEmpresa = req.params.idEmpresa;
    var idMaquina = req.params.idMaquina;
    var fkComponente = req.params.fkComponente;

    medidaModel.buscarUltimosRegistros(idEmpresa, idMaquina, fkComponente, limite_linhas).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados registros!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar os últimos registros no controller! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function qtdRegistrosPorUser(req, res){

    

    var idUsuario = req.params.idUsuario;
    var idMaquina = req.params.idMaquina;
    

    medidaModel.qtdRegistrosPorUser(idUsuario, idMaquina).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados registros!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar a quantidade de registros no controller! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarUltimosRegistrosUser(req, res){

    const limite_linhas = 50;

    var idUsuario = req.params.idUsuario;
    var idMaquina = req.params.idMaquina;
    var fkComponente = req.params.fkComponente;

    medidaModel.buscarUltimosRegistrosUser(idUsuario, idMaquina, fkComponente, limite_linhas).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados registros!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar os últimos registros no controller! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarRegistroTempoReal(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idMaquina = req.params.idMaquina;
    var fkComponente = req.params.fkComponente;

    medidaModel.buscarRegistroTempoReal(idEmpresa, idMaquina, fkComponente).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados registros!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar os últimos registros no controller! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    }); 
}

function mediaUsoComponente(req, res){
    medidaModel.mediaUsoComponente().then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados componentes para calculo da média!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar resgatar a média do uso dos componentes! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarServidores(req, res) {

    var idEmpresa = req.body.idEmpresa;
    

    medidaModel.buscarServidores(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta dos livros! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function infoMaquina(req, res){

    var idMaquina = req.params.idMaquina;

    medidaModel.infoMaquina(idMaquina).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Não foram encontrados componentes da maquina do idMaquina informado!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao tentar resgatar a média do uso dos componentes! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })

}

module.exports = {
    buscarMaquinas,
    buscarUltimosRegistros,
    buscarComponentesMaquina,
    buscarRegistroTempoReal,
    mediaUsoComponente,
    buscarServidores,
    infoMaquina,
    buscarComponentesMaquinaPorUser,
    buscarUltimosRegistrosUser,
    qtdRegistrosPorUser
    
    // buscarUltimasMedidas,
    // buscarMedidasEmTempoReal

}