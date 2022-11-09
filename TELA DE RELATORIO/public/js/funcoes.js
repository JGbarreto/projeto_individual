// import Swal from 'sweetalert2'

function entrar() {

    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;

    if (emailVar == "" && senhaVar == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Preencha o email e a senha'
          })
    }else if(emailVar == ""){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Email inválido'
          })
    }else if(senhaVar == ""){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Senha inválido'
          })
    }else{
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);
    
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);
    
                resposta.json().then(json => {
    
    
                    console.log(json);
                    console.log(JSON.stringify(json));
                    
    
                    sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                    sessionStorage.NOME_USUARIO = json.nomeUsuario;
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.ID_EMPRESA = json.idEmpresa;
                    sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
                    sessionStorage.CARGO_USUARIO = json.cargo;
    
                    
                    window.location = "dashboard/dashboard.html";
                     // apenas para exibir o loading
    
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'Login ou senha inválidos'
                  })
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }
        
}

// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;
    var cargo = sessionStorage.CARGO_USUARIO;
    var nomeEmpresa = sessionStorage.NOME_EMPRESA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    if (email != null && nome != null && idUsuario != null && cargo != null && nomeEmpresa != null && idEmpresa != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        var h3_empresa = document.getElementById("nome_empresa");
        h3_empresa.innerHTML = `${nomeEmpresa}`;
        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

function listarMaquinasSlc(idEmpresa){
    var select = document.getElementById("slcMaquinas");
    fetch("/medidas/buscarServidores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresa: idEmpresa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            
            resposta.json().then(json => {
                
                    console.log(JSON.stringify(json));
                    console.log(json);

                for (var index = 0; index < json.length; index++) {

                        var idMaquina = json[index].idMaquina;
                        var serialMaquina = json[index].serialMaquina;
                        var nomeMaquina = json[index].nome;
                        var fkEmpresa = json[index].fkEmpresa;
                        
                        var idItem = `${idMaquina}`;
                        
                        var option = document.createElement("option");
                        option.setAttribute("id", idItem);
                        option.setAttribute("value", idItem);
                        option.innerHTML = nomeMaquina;
                        select.appendChild(option);
                    }
                  
            })
        

        } 
    });
}