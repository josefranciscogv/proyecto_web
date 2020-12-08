obtenerUsuarios();

function obtenerUsuarios() {
    makeRequest('https://cinefan.herokuapp.com/api/users', 'GET', null, null, 
    (value) => {
        console.log('Ok');
        console.log(value);
        mostrarUsuarios(value);
    }, (err) => {
        console.log('Error');
        console.log(err);
    });
}
function mostrarUsuarios(users) {
    let lista = document.getElementById('lista');
    users.forEach(user => {
        let userHTML = obtenerCardUsuario(user);
        lista.insertAdjacentHTML('beforeend', userHTML);
    });
}
function obtenerCardUsuario(user) {
    return `<div class="media col-8 mt-2" id="modelo">
    <div class="media-left align-self-center mr-3">
        <img class="rounded-circle" style="width: inherit;" src="${user.url}">
    </div>
    <div class="media-body">
        <h4>${user.nombre} ${user.apellido}</h4>
        <p >Correo: ${user.correo}</p>
        <p >Fecha de nacimiento: ${user.fecha} </p>
    </div>
    <div class="media-right align-self-center">
        <div class="row">
            <a href="#" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></a>
        </div>
        <div class="row">
        <a href="#" class="btn btn-primary mt-2" id="btnEdit" data-toggle="modal" data-target="#editarUsuario" onclick ="EditarUsuario(event) "><i class="fas fa-pencil-alt edit "></i></a>
        </div>
        <div class="row">
        <a href="consulta.html" class="btn btn-primary mt-2" data-toggle="modal" data-target="#eliminarUsuario" id="btnRemove" onclick = "EliminarUsuario(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
        </div>
    </div>
</div>`;
}