var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/validarEmailEmpresa/:emailEmpresa", function(req, res){
    usuarioController.validarEmailEmpresa(req, res);
});

router.get("/validarEmailUsuario/:emailUsuario", function(req, res){
    usuarioController.validarEmailUsuario(req, res);
});

router.get("/selecionarUltimaEmpresa", function (req, res){
    usuarioController.selecionarUltimaEmpresa(req, res);
})
//buscar funcionarios de uma empresa
router.post("/buscarFuncionarios", function (req, res) {
    usuarioController.buscarFuncionarios(req, res);
    
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastrarEmpresa", function (req, res){
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;