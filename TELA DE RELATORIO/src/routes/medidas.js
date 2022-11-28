var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/resgatarMaquinas", function(req, res){
    medidaController.buscarMaquinas(req, res);
});

router.get("/mediaUsoComponente", function(req, res){
    medidaController.mediaUsoComponente(req, res);
});

router.get("/buscarComponentesMaquina/:idEmpresa/:idMaquina", function (req, res){
    medidaController.buscarComponentesMaquina(req, res);
});

router.get("/buscarComponentesMaquinaPorUser/:idUsuario/:idMaquina", function (req, res){
    medidaController.buscarComponentesMaquinaPorUser(req, res);
});

router.get("/infoMaquina/:idMaquina", function(req, res){
    medidaController.infoMaquina(req, res);
});

router.get("/ultimosRegistros/:idEmpresa/:idMaquina/:fkComponente", function (req, res){
    medidaController.buscarUltimosRegistros(req, res);
});

router.get("/qtdRegistrosPorUser/:idUsuario/:idMaquina/", function (req, res){
    medidaController.qtdRegistrosPorUser(req, res);
});

router.get("/ultimosRegistrosUser/:idUsuario/:idMaquina/:fkComponente", function (req, res){
    medidaController.buscarUltimosRegistrosUser(req, res);
});

router.get("/registrosTempoReal/:idEmpresa/:idMaquina/:fkComponente", function(req, res){
    medidaController.buscarRegistroTempoReal(req, res);
});

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.post("/buscarServidores", function (req, res) {
    medidaController.buscarServidores(req, res);
})

router.post("/buscarMonitorados", function (req, res) {
    medidaController.buscarMonitorados(req, res);
})



module.exports = router;