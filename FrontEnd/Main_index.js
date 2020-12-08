'use strict'
//Registro de usuario

document.getElementById("SubmitRegistro").disabled = true;
let formulario = document.querySelector('form') 
formulario.addEventListener("change",()=>{ 

let inputs = document.querySelectorAll("#registro input:invalid") 
if(inputs.length >= 1){ 
    document.getElementById("SubmitRegistro").disabled = true
}
else if (document.getElementById("passwIni").value == document.getElementById("passConf").value){
    document.getElementById("SubmitRegistro").disabled = false
} 
else{
    document.getElementById("SubmitRegistro").disabled = true
}
})

let submit = document.getElementById("SubmitRegistro")
let datosRegistro
submit.addEventListener("click",function(event){ 
event.preventDefault()
let url = document.getElementById('url').value
let fecha = document.getElementById('fecha').value
let password = document.getElementById('passConf').value
let sexo
let nombre = document.getElementById('nombre').value
let apellido = document.getElementById('apellido').value
let correo = document.getElementById('email').value
if(document.getElementById('sexoFem').checked == true) sexo = 'M'
else sexo = 'H'

datosRegistro = {
    nombre: nombre,
    apellido:apellido,
    correo : correo,
    url: url,
    sexo: sexo,
    fecha: fecha,
    password: password
}

let datosJSON = JSON.stringify(datosRegistro);
var urlPost = 'https://cinefan.herokuapp.com/home';

fetch(urlPost, { 
    method: 'POST',
    body: [datosJSON],
    headers:{
         'Content-Type': 'application/json'
         //,'x-auth': tokenAuth
    } 
}) .then(res => res.json())
.catch(error => console.error('Error:',error))
.then( () => alert('Usuario registrado'))

})

//login
/*
let tokenAuth = localStorage.getItem('tokenAuth');
let login = document.getElementById("LoginBtn");
login.addEventListener("click", function(event){
    event.preventDefault()
    let correoLogin = document.getElementById("CorreoLogin").value
    let passwordLogin = document.getElementById("PasswordLogin").value
    let infoLogin = {
        correo: correoLogin,
        password: passwordLogin
    }
var href = 'https://app-users-dasw.herokuapp.com/api/login';
fetch(href,{
    method: 'POST',
    body: JSON.stringify(infoLogin),
    headers: {
        'Content-Type': 'application/json',
        'x-auth': tokenAuth
    }
}).then(response=>response.json())
.then(function(myJson){
    let datos = JSON.stringify(myJson);
    if(datos.substr(2,5) == "token"){ 
        window.localStorage.setItem('tokenUser',myJson.token);
        location.href = "consulta.html";
    }else{
        alert(datos);
    }
})
})
*/