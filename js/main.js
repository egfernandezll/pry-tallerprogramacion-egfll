

function cargarNombreUsuario() {
  const nombre = sessionStorage.getItem("nombreUsuario") || "Usuario";
  const el = document.getElementById("header-nombre");
  if (el) {
    el.textContent = nombre;
    console.log("Usuario cargado en header:", nombre);
  }
}

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  const abierto = nav.classList.toggle("nav-abierto");
  console.log("Menú:", abierto ? "abierto" : "cerrado");
}

function confirmarCerrarSesion() {
  document.getElementById("modal-cerrar").style.display = "flex";
  console.log("Modal cerrar sesión abierto");
}

function cerrarSesion() {
  sessionStorage.removeItem("nombreUsuario");
  console.log("Sesión cerrada — redirigiendo a login");
  window.location.href = "index.html";
}

function cancelarCerrarSesion() {
  document.getElementById("modal-cerrar").style.display = "none";
  console.log("Cerrar sesión cancelado");
}

document.addEventListener("DOMContentLoaded", function () {

  cargarNombreUsuario();

  const btnHamburguesa = document.getElementById("btn-hamburguesa");
  if (btnHamburguesa) {
    btnHamburguesa.addEventListener("click", toggleMenu);
  }

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", confirmarCerrarSesion);
  }

  document.addEventListener("click", function (e) {
    const nav = document.getElementById("nav-menu");
    const btn = document.getElementById("btn-hamburguesa");
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("nav-abierto");
    }
  });
});
