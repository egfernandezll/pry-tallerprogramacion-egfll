

const usuarios = [
  { usuario: "egfernandez", password: "123456", nombre: "Dr. Esgar Fernández", rol: "Médico" },
  { usuario: "jgarcia",     password: "123456", nombre: "Dr. Carlos García",   rol: "Médico" },
  { usuario: "admin",       password: "admin",  nombre: "Administrador",       rol: "TI"     },
];

const SVG_OK = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#198754" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const SVG_ERROR = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';


function validarLogin() {
  const inputUsuario = document.getElementById("usuario").value.trim();
  const inputPassword = document.getElementById("password").value.trim();

  console.log("Intento de login — usuario:", inputUsuario);

  if (inputUsuario === "" || inputPassword === "") {
    mostrarModalError("Por favor completa todos los campos.");
    return;
  }

  const btn = document.getElementById("btn-login");
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Verificando...';

  setTimeout(function () {
    let usuarioEncontrado = null;


    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].usuario === inputUsuario && usuarios[i].password === inputPassword) {
        usuarioEncontrado = usuarios[i];
        break;
      }
    }

    if (usuarioEncontrado) {
      sessionStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
      console.log("Login exitoso:", usuarioEncontrado.nombre);
      mostrarModalBienvenida(usuarioEncontrado.nombre);
    } else {
      console.log("Login fallido — credenciales incorrectas");
      mostrarModalError("Usuario o contraseña incorrectos. Intenta nuevamente.");
      // Restaura el botón
      btn.disabled = false;
      btn.innerHTML = 'Ingresar al sistema';
      // Limpia los campos
      document.getElementById("usuario").value = "";
      document.getElementById("password").value = "";
    }
  }, 3000);
}


function mostrarModalBienvenida(nombre) {
  document.getElementById("modal-titulo").textContent = "¡Bienvenido!";
  document.getElementById("modal-mensaje").textContent = "Hola, " + nombre + ". Acceso concedido al sistema.";
  document.getElementById("modal-icono").className = "modal-icono modal-icono-ok";
  document.getElementById("modal-icono").innerHTML = SVG_OK;  // ícono check verde
  document.getElementById("modal-btn-ok").style.display = "inline-flex";
  document.getElementById("modal-btn-ok").onclick = function () {
    window.location.href = "medicos.html";
  };
  document.getElementById("modal-login").style.display = "flex";
  console.log("Modal bienvenida:", nombre);
}

function mostrarModalError(mensaje) {
  document.getElementById("modal-titulo").textContent = "Acceso denegado";
  document.getElementById("modal-mensaje").textContent = mensaje;
  document.getElementById("modal-icono").className = "modal-icono modal-icono-error";
  document.getElementById("modal-icono").innerHTML = SVG_ERROR;  // ícono X roja
  document.getElementById("modal-btn-ok").style.display = "inline-flex";
  document.getElementById("modal-btn-ok").onclick = function () {
    cerrarModalLogin();
  };
  document.getElementById("modal-login").style.display = "flex";
  console.log("Modal error:", mensaje);
}

function cerrarModalLogin() {
  document.getElementById("modal-login").style.display = "none";
  console.log("Modal login cerrado");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-login").addEventListener("click", validarLogin);
  document.getElementById("password").addEventListener("keypress", function (e) {
    if (e.key === "Enter") validarLogin();
  });
});
