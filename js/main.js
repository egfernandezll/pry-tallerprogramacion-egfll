

// Carga el nombre del usuario desde sessionStorage y lo muestra en el header
function cargarNombreUsuario() {
  const nombre = sessionStorage.getItem("nombreUsuario") || "Usuario";
  const el = document.getElementById("header-nombre");
  if (el) {
    el.textContent = nombre;
    console.log("Usuario cargado en header:", nombre);
  }
}

// ── MENÚ HAMBURGUESA ─────────────────────────────
// Abre o cierra el menú de navegación en móvil
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  const abierto = nav.classList.toggle("nav-abierto");
  console.log("Menú:", abierto ? "abierto" : "cerrado");
}

// ── CERRAR SESIÓN ─────────────────────────────────
// Muestra modal de confirmación antes de cerrar sesión
function confirmarCerrarSesion() {
  document.getElementById("modal-cerrar").style.display = "flex";
  console.log("Modal cerrar sesión abierto");
}

// Ejecuta el cierre de sesión — limpia storage y redirige al login
function cerrarSesion() {
  sessionStorage.removeItem("nombreUsuario");
  console.log("Sesión cerrada — redirigiendo a login");
  window.location.href = "index.html";
}

// Cancela el cierre de sesión
function cancelarCerrarSesion() {
  document.getElementById("modal-cerrar").style.display = "none";
  console.log("Cerrar sesión cancelado");
}

// ── EVENT LISTENERS COMPARTIDOS ──────────────────
document.addEventListener("DOMContentLoaded", function () {

  // Carga el nombre del usuario en el header
  cargarNombreUsuario();

  // Botón hamburguesa — toggle del menú
  const btnHamburguesa = document.getElementById("btn-hamburguesa");
  if (btnHamburguesa) {
    btnHamburguesa.addEventListener("click", toggleMenu);
  }

  // Botón cerrar sesión en header
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", confirmarCerrarSesion);
  }

  // Cierra el menú si se hace click fuera de él
  document.addEventListener("click", function (e) {
    const nav = document.getElementById("nav-menu");
    const btn = document.getElementById("btn-hamburguesa");
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("nav-abierto");
    }
  });
});
