var formEmpresa = document.getElementById("form_empresa");
var formUsuario = document.getElementById("form_usuario");

function navegar(){
    if(formEmpresa.style.display == 'flex'){
        formUsuario.style.display = 'flex';
        formUsuario.style.flexDirection = 'column';
        formEmpresa.style.display = 'none';
    }else{
        formUsuario.style.display = 'none';
        formEmpresa.style.display = 'flex';
        formEmpresa.style.flexDirection = 'column';
    }
}
