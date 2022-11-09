var quantidadeDiscos = 0;


// Mexer quando for fazer os links para maquinas
function plotarBotoes() {
    area_botoes.innerHTML = '';

    fetch("/medidas/resgatarMaquinas").then(function (resposta) {
        if (resposta.ok) {
            if (resposta == 204) {
                console.log("Retorno vazio de máquinas!");
            }
            resposta.json().then(function (resposta) {
                console.log("Máquinas recebidas: ", JSON.stringify(resposta));

                for (var i = 0; i < resposta.length; i++) {

                    var dadosMaquina = resposta[i];

                    var botao = document.createElement("button");
                    botao.setAttribute("id", `botaoMaquina${dadosMaquina.idMaquina}`);
                    botao.setAttribute("onClick", `gerar(1, ${dadosMaquina.idMaquina})`);
                    botao.innerHTML = `${dadosMaquina.nome}`;
                    document.getElementById("area_botoes").appendChild(botao);

                }
            })
        }
    })
}

function gerar(idEmpresa, idMaquina) {



    // Mexer quando for fazer os links para maquinas
    // plotarBotoes();

    // area_grafico.innerHTML = '';

    // var titulo = document.createElement("h1");
    // titulo.innerHTML = `Monitoramento`;
    // area_grafico.appendChild(titulo);

    fetch(`/medidas/buscarComponentesMaquina/${idEmpresa}/${idMaquina}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            quantidadeDiscos = 0;
            resposta.json().then(function (retorno) {
                console.log(`Dados recebidos dos componentes: ${JSON.stringify(retorno)}`);

                var areaDiscoGeral = document.getElementById("area_disco");
                var areaRam = document.getElementById("area_ram");
                areaDiscoGeral.innerHTML = "";

                areaRam.style.height = '55%';
                areaDiscoGeral.style.height = '40%';

                for (var i = 0; i < retorno.length; i++) {
                    gerarGrafico(retorno[i].fkComponente);
                }
                // graficosMedia(idMaquina);

            })
        }
    });


    function gerarGrafico(idComponente) {
        fetch(`/medidas/ultimosRegistros/${idEmpresa}/${idMaquina}/${idComponente}`, {
            cache: 'no-store'
        }).then(function (resposta) {
            if (resposta.ok) {
                var areaDiscoGeral = document.getElementById("area_disco");
                var areaRam = document.getElementById("area_ram");
                resposta.json().then(function (retorno) {
                    console.log(`Dados recebidos: ${JSON.stringify(retorno)}`);
                    configurarGraficoMon(retorno, idComponente);

                    console.log("Valor final disco: " + quantidadeDiscos);

                    if (quantidadeDiscos > 2) {
                        areaDiscoGeral.classList.remove("disco_rede");
                        areaDiscoGeral.classList.add("disco_rede2");

                        areaRam.style.height = '40%';
                        areaDiscoGeral.style.height = '55%';

                        var divsDisco = document.querySelectorAll('.disco');

                        var alturaIdeal = 100 / quantidadeDiscos;
                        alturaIdeal = alturaIdeal - 1;

                        divsDisco.forEach(caixaDisco => {
                            caixaDisco.style.height = `${alturaIdeal}%`;
                        });
                    }
                });

            } else {
                console.error('Nada foi encontrado!');
            }
        });
    }

    function configurarGraficoMon(retorno, idComponente) {



        // var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        // gradient.addColorStop(0, 'rgba(214, 31, 31, 0.5)');   
        // gradient.addColorStop(1, 'rgba(214, 31, 31, 0)');

        var nomeComponente = retorno[0].nomeComponente;
        var nomeSplit = nomeComponente.substring(0, 3);

        if (nomeSplit == "CPU" || nomeSplit == "RAM") {

            if (nomeSplit == "CPU") {
                var areaCpu = document.getElementById("divGraficoCpu");

                document.getElementById("graficoCpu").remove();
                var canvasCpu = document.createElement("canvas");
                canvasCpu.setAttribute("class", "cnvGrafico");
                canvasCpu.setAttribute("id", "graficoCpu");
                areaCpu.append(canvasCpu);
            }

            if (nomeSplit == "RAM") {
                var areaRam = document.getElementById("divGraficoRam");

                document.getElementById("graficoRam").remove();
                var canvasRam = document.createElement("canvas");
                canvasRam.setAttribute("class", "cnvGrafico");
                canvasRam.setAttribute("id", "graficoRam");
                areaRam.append(canvasRam);
            }

            var vetorData = [];
            var vetorRegistro = [];

            for (var i = 0; i < retorno.length; i++) {
                var tupla = retorno[i];
                vetorData.push(tupla.momento);
                vetorRegistro.push(tupla.registro);
            }

            var data = {
                labels: vetorData,
                datasets: [{
                    label: `${retorno[0].nomeComponente} | Unidade de Medida: ${retorno[0].unidadeMedida}`,
                    backgroundColor: 'rgba(255, 250, 250, 0.8)',
                    borderColor: 'rgba(255, 250, 250, 0.8)',
                    data: vetorRegistro,
                    fill: true,
                    tension: 0.5
                }]
            }

            var config = {
                type: 'line',
                data: data,
                backgroundColor: '#1E1E1E',
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 10
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 7
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
            };
        } else {

            quantidadeDiscos++;

            console.log("Estou aumentando aqui: " + quantidadeDiscos);

            var areaDiscoGeral = document.getElementById("area_disco");

            var divDisco = document.createElement("div");
            var tituloUsoDisco = document.createElement("h3");
            var divGrafDisco = document.createElement("div");
            var canvasGrafDisco = document.createElement("canvas");

            divDisco.setAttribute("class", "disco");
            divDisco.setAttribute("id", `div_disco${retorno[0].fkComponente}`);

            tituloUsoDisco.innerHTML = `Uso do ${retorno[0].nomeComponente}`;

            divGrafDisco.setAttribute("class", "divGrafico");
            divGrafDisco.setAttribute("id", `divGraficoDisco${retorno[0].fkComponente}`);

            canvasGrafDisco.setAttribute("class", "cnvGrafico");
            canvasGrafDisco.setAttribute("id", `graficoDisco${retorno[0].fkComponente}`);

            divGrafDisco.appendChild(canvasGrafDisco);
            divDisco.appendChild(tituloUsoDisco);
            divDisco.appendChild(divGrafDisco);
            areaDiscoGeral.append(divDisco);

            var areaDisco = document.getElementById(`divGraficoDisco${retorno[0].fkComponente}`);

            document.getElementById(`graficoDisco${retorno[0].fkComponente}`).remove();
            var canvasDisco = document.createElement("canvas");
            canvasDisco.setAttribute("class", "cnvGrafico");
            canvasDisco.setAttribute("id", `graficoDisco${retorno[0].fkComponente}`);
            areaDisco.append(canvasDisco);

            var data = {
                labels: ['Usado', 'Livre'],
                datasets: [{
                    label: `Teste`,
                    backgroundColor: ['rgba(77, 158, 65, 0.58)', 'rgba(255, 250, 250, 0.8)'],
                    borderColor: ['rgb(77, 158, 65', 'rgb(255, 250, 250)'],
                    hoverBackgroundColor: ['rgb(77, 158, 65)', 'rgb(255, 250, 250)'],
                    data: [retorno[0].registro, 100 - retorno[0].registro]
                }]
            }

            var config = {
                type: 'pie',
                data: data,
                backgroundColor: '#1E1E1E',
                options: {
                    plugins: {
                        legend: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                text: 'Uso do Disco'
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
            };
        }

        var h3Nome = document.createElement("h3");
        h3Nome.innerHTML = retorno[0].nomeComponente;

        if (nomeSplit == "CPU") {
            var graficoMon = new Chart(
                document.getElementById(`graficoCpu`),
                config,
            );

            setTimeout(() => atualizarGrafico(idEmpresa, idMaquina, idComponente, data), 5000);

        } else if (nomeSplit == "RAM") {
            var graficoMon = new Chart(
                document.getElementById(`graficoRam`),
                config,
            );

            setTimeout(() => atualizarGrafico(idEmpresa, idMaquina, idComponente, data), 5000);

        } else {
            var graficoMon = new Chart(
                document.getElementById(`graficoDisco${retorno[0].fkComponente}`),
                config,
            );
        }

        // var div = document.createElement("div");
        // var canva = document.createElement("canvas");
        // canva.setAttribute('id', `grafico${retorno[0].fkComponente}`);
        // div.append(h3Nome);
        // div.appendChild(canva);
        // document.getElementById("area_grafico").appendChild(div);

        // var graficoMon = new Chart(
        //     document.getElementById(`grafico${retorno[0].fkComponente}`),
        //     config,
        // );

        function atualizarGrafico(idEmpresa, idMaquina, fkComponente, data) {
            fetch(`/medidas/registrosTempoReal/${idEmpresa}/${idMaquina}/${fkComponente}`, {
                cache: 'no-store'
            }).then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (novoPonto) {
                        console.log(`Novo dado recebido: ${JSON.stringify(novoPonto)}`);
                        console.log(`Dados atuais do gŕafico: ${data}`);

                        console.log("ME AJUDA SENHOR: " + data.datasets.length);

                        data.labels.shift();
                        data.labels.push(novoPonto[0].momento);

                        data.datasets[0].data.shift();
                        data.datasets[0].data.push(novoPonto[0].registro);

                        graficoMon.update('none');

                        proximaAtt = setTimeout(() => atualizarGrafico(idEmpresa, idMaquina, idComponente, data), 5000);
                    })
                } else {
                    console.error('Nada foi encontrado!');
                    proximaAtt = setTimeout(() => atualizarGrafico(idEmpresa, idMaquina, idComponente, data), 5000);
                }
            })
        }

    }

}

function graficosMedia(idMaquina) {
    var selecionado = idMaquina.value;
    fetch("/medidas/mediaUsoComponente").then(function (retorno) {
        if (retorno.ok) {
            if (retorno == 204) {
                console.log("Retorno vazio de máquinas!");
            }
            retorno.json().then(function (resposta) {
                console.log("Médias Recebidas: ", JSON.stringify(resposta));

                plotarGraficoMedia(resposta, selecionado);

            })
        }
    })

    function plotarGraficoMedia(retorno, idMaquina) {
        for (var i = 0; i < retorno.length; i++) {

            if (idMaquina == retorno[i].idMaquina) {

                var nomeComponente = retorno[i].nomeComponente;
                var nomeSplit = nomeComponente.substring(0, 3);

                if (nomeSplit == "CPU") {
                    var areaCpu = document.getElementById("divGraficoCpu");

                    document.getElementById("graficoCpu").remove();
                    var canvasCpu = document.createElement("canvas");
                    canvasCpu.setAttribute("class", "cnvGrafico");
                    canvasCpu.setAttribute("id", "graficoCpu");
                    areaCpu.append(canvasCpu);
                }

                if (nomeSplit == "RAM") {
                    var areaRam = document.getElementById("divGraficoRam");

                    document.getElementById("graficoRam").remove();
                    var canvasRam = document.createElement("canvas");
                    canvasRam.setAttribute("class", "cnvGrafico");
                    canvasRam.setAttribute("id", "graficoRam");
                    areaRam.append(canvasRam);
                }

                if (nomeSplit == "Dis") {
                    var areaDisco = document.getElementById("divGraficoDisco");

                    document.getElementById("graficoDisco").remove();
                    var canvasDisco = document.createElement("canvas");
                    canvasDisco.setAttribute("class", "cnvGrafico");
                    canvasDisco.setAttribute("id", "graficoDisco");
                    areaDisco.append(canvasDisco);
                }

                if (nomeSplit == "CPU" || nomeSplit == "RAM") {

                    const dataMedia = {
                        labels: [
                            'Média de Uso (%)',
                            'Média não sendo usada (%)'
                        ],
                        datasets: [{
                            label: `Média Registro ${retorno[i].nomeComponente}`,
                            data: [retorno[i].MediaUso, 100 - retorno[i].MediaUso],
                            backgroundColor: [
                                '#4d9e4194',
                                '#6B6568',
                            ],
                            hoverOffset: 4
                        }]
                    };

                    const config = {
                        type: 'doughnut',
                        data: dataMedia,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                        font: {
                                            size: 14
                                        }
                                    }
                                }
                            }
                        }
                    };

                    if (nomeSplit == "CPU") {
                        var graficoMon = new Chart(
                            document.getElementById(`graficoCpu`),
                            config,
                        );
                    } else if (nomeSplit == "RAM") {
                        var graficoMon = new Chart(
                            document.getElementById(`graficoRam`),
                            config,
                        );
                    }
                } else {
                    const dataMedia = {
                        labels: [
                            'Média Usada do Disco (%)',
                            'Média Espaço Livre (%)',
                        ],
                        datasets: [{
                            label: `Média Registro ${retorno[i].nomeComponente}`,
                            data: [retorno[i].MediaUso, 100 - retorno[i].MediaUso],
                            backgroundColor: [
                                '#4d9e4194',
                                '#6B6568',
                            ],
                            hoverOffset: 4
                        }]
                    };

                    const config = {
                        type: 'doughnut',
                        data: dataMedia,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                        font: {
                                            size: 14
                                        }
                                    }
                                }
                            }
                        }
                    };

                    var graficoMon = new Chart(
                        document.getElementById(`graficoDisco`),
                        config,
                    );
                }
            }

        }
    }
}

function buscarInfoMaquina(idMaquina) {
    fetch(`/medidas/infoMaquina/${idMaquina}`, { cache: 'no-store' }).then(function (retorno) {
        if (retorno.ok) {
            if (retorno == 204) {
                console.log("Retorno vazio de informação da máquina!");
            }
            retorno.json().then(function (resposta) {
                console.log("Informação da máquina recebida: ", JSON.stringify(resposta));
                var areaInfo = document.getElementById("info_maquina");
                areaInfo.innerHTML = "";
                var h2Titulo = document.createElement("h2");
                h2Titulo.innerHTML = "Informações da Máquina";
                areaInfo.appendChild(h2Titulo);

                for (var i = 0; i < resposta.length; i++) {
                    infoComponente = resposta[i];
                    var paragrafo = document.createElement("p");
                    nomeComponenteRetorno = infoComponente.nomeComponente.substring(0, 3);
                    if (nomeComponenteRetorno == "CPU") {
                        paragrafo.innerHTML = "Processador: " + infoComponente.nomeComponente;
                    } else if (nomeComponenteRetorno == "RAM") {
                        paragrafo.innerHTML = "Memória RAM Total: " + infoComponente.tamanho + " GB";
                    } else {
                        paragrafo.innerHTML = infoComponente.nomeComponente + " - Espaço Total de Disco: " + infoComponente.tamanho + " GB";
                    }
                    areaInfo.appendChild(paragrafo);
                }

            })
        } else {
            console.log("VAI TOMAR NO CUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
        }
    })
}

function buscarComponentesUser(idUsuario, idMaquina) {
    fetch(`/medidas/buscarComponentesMaquinaPorUser/${idUsuario}/${idMaquina}`, 
    { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            
            resposta.json().then(function (resposta) {
                console.log(`Dados recebidos dos componentes: ${JSON.stringify(resposta)}`);

               
                var cpu = gerarGraficoUser(resposta[0].idComponente);
                var ram = gerarGraficoUser(resposta[1].idComponente);
                
                console.log(cpu)
                
                // graficosMedia(idMaquina);
                plotarGraficoUser(cpu, ram)
            })
        }
    });
}

function plotarGraficoUser(cpu, ram) {
    var cpuDados = [];
    var momento = [];
    var ramDados = [];
    
    for (let i = 0; i < cpu.length; i++) {
        cpuDados.push(cpu[i].registro)
        momento.push(cpu[i].momento)
        ramDados.push(ram[i].registro)
    }


    const data = {
        labels: momento,
        datasets: [{
            label: 'CPU',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: cpuDados,
        },
        {
            label: 'RAM',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ramDados,
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('grafico_qtd_dados'),
        config
      );
}

function gerarGraficoUser(idComponente) {
    fetch(`/medidas/ultimosRegistrosUser/${sessionStorage.ID_USUARIO}/${idMaquina}/${idComponente}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (retorno) {
                console.log(`Dados recebidos: ${JSON.stringify(retorno)}`);
                
                return JSON.stringify(retorno)
                
            });

        } else {
            console.error('Nada foi encontrado!');
        }
    });
}