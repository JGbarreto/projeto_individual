var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function buscarFuncionarios(req, res) {

    var idEmpresa = req.body.idEmpresa
    

    usuarioModel.buscarFuncionarios(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta dos usuários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function validarEmailEmpresa(req, res){

    var emailEmpresa = req.params.emailEmpresa;

    usuarioModel.validarEmailEmpresa(emailEmpresa).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Email válido!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao validar se o email da empresa era válido! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function validarEmailUsuario(req, res){

    var emailUsuario = req.params.emailUsuario;

    usuarioModel.validarEmailUsuario(emailUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Email válido!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao validar se o email do usuário era válido! Erro: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // empresa ^^^^^^
    // usuario VVVVV
    // var fkEmpresa = req.body.fkEmpresaServer;
    var nome = req.body.nomeServer;
    var cargo = "Responsável";
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erroblé: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // empresa ^^^^^^
    // usuario VVVVV
    // var fkEmpresa = req.body.fkEmpresaServer;
    var nome = req.body.nomeServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUsuario(nome, email, senha, idEmpresa, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erroblé: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res){
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var emailEmpresa = req.body.emailEmpresaServer;
    var cnpj = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    } else if (emailEmpresa == undefined) {
        res.status(400).send("Seu email da empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    }else {
        
        usuarioModel.cadastrarEmpresa(cnpj, nomeEmpresa, emailEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

        
    }
}

function selecionarUltimaEmpresa(req, res){

    usuarioModel.selecionarUltimaEmpresa().then(
        function(resultado){
            if(resultado.length == 1){
                res.status(200).json(resultado);
            }else{
                console.log("Algo deu errado na função de retornar a empreda cadastrada!");
            }
        }
    ).catch(
        function (erro){
            console.log("Erro no catch do selecionar ultima empresa! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )

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
    testar,
    buscarFuncionarios
}