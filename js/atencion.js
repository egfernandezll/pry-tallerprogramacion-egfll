// ================================================
// atencion.js — Lógica de la página de atención
// PRY-EGFLL 2026
// ================================================

// SVG ícono tacho — usado en botones eliminar
const SVG_TACHO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';

// Array de recetas — cada una con id único para poder eliminarla
let recetas = [
  { id: 1, medicamento: "Ibuprofeno 400mg", dosis: "1 tableta cada 8h · 5 días · Con alimentos" },
  { id: 2, medicamento: "Enalapril 5mg",    dosis: "1 tableta cada 24h · Continuo · En ayunas" },
];
let contadorReceta = 3; // siguiente id disponible para nuevas recetas

// Array de procedimientos — cada uno con id único
let procedimientos = [
  { id: 1, nombre: "Inyección intramuscular", detalle: "Ketorolaco 30mg · Glúteo derecho" },
  { id: 2, nombre: "Curación de herida",      detalle: "Región dorsal · Limpieza y apósito estéril" },
];
let contadorProc = 3; // siguiente id disponible para nuevos procedimientos

// ── GUARDAR ATENCIÓN ─────────────────────────────
// Muestra modal de confirmación antes de guardar
function confirmarGuardar() {
  document.getElementById("modal-guardar").style.display = "flex";
  console.log("Modal guardar atención abierto");
}

// Si confirma guardar — redirige a médicos
function aceptarGuardar() {
  console.log("Atención guardada — redirigiendo a médicos");
  window.location.href = "medicos.html";
}

// Si cancela guardar — cierra modal
function cancelarGuardar() {
  document.getElementById("modal-guardar").style.display = "none";
  console.log("Guardar atención cancelado");
}

// ── MODAL RECETA ─────────────────────────────────
// Abre el modal para agregar una nueva receta
function abrirModalReceta() {
  document.getElementById("input-medicamento").value = "";
  document.getElementById("input-dosis").value = "";
  document.getElementById("receta-error").textContent = "";
  document.getElementById("modal-receta").style.display = "flex";
  console.log("Modal agregar receta abierto");
}

// Cierra el modal de receta
function cerrarModalReceta() {
  document.getElementById("modal-receta").style.display = "none";
  console.log("Modal receta cerrado");
}

// Agrega una nueva receta verificando duplicados con for
function agregarReceta() {
  const medicamento = document.getElementById("input-medicamento").value.trim();
  const dosis       = document.getElementById("input-dosis").value.trim();

  if (medicamento === "" || dosis === "") {
    document.getElementById("receta-error").textContent = "Completa todos los campos.";
    console.log("Receta no agregada — campos vacíos");
    return;
  }

  // Recorre el array con for para verificar si el medicamento ya existe
  for (let i = 0; i < recetas.length; i++) {
    if (recetas[i].medicamento.toLowerCase() === medicamento.toLowerCase()) {
      document.getElementById("receta-error").textContent = "Este medicamento ya fue recetado.";
      console.log("Medicamento duplicado:", medicamento);
      return;
    }
  }

  // Agrega la nueva receta al array con su id único
  recetas.push({ id: contadorReceta, medicamento: medicamento, dosis: dosis });
  console.log("Receta agregada:", medicamento);

  // Crea la fila en la tabla usando DOM
  const tabla = document.getElementById("tabla-recetas");
  const fila  = document.createElement("div");
  fila.className = "receta-item";
  fila.id = "receta-" + contadorReceta; // id en el DOM para poder eliminarla
  fila.innerHTML = `
    <div class="receta-ico">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    </div>
    <div style="flex:1">
      <div class="receta-nombre">${medicamento}</div>
      <div class="receta-dosis">${dosis}</div>
    </div>
    <span class="badge b-success">Activo</span>
    <button class="btn-eliminar" onclick="eliminarReceta(${contadorReceta})" title="Eliminar">${SVG_TACHO}</button>
  `;
  tabla.appendChild(fila);
  contadorReceta++;

  cerrarModalReceta();
}

// Elimina una receta del array y de la tabla por su id
function eliminarReceta(id) {
  recetas = recetas.filter(function (r) { return r.id !== id; });
  document.getElementById("receta-" + id).remove();
  console.log("Receta eliminada — id:", id);
}

// ── MODAL PROCEDIMIENTO ───────────────────────────
// Abre el modal para agregar un nuevo procedimiento
function abrirModalProcedimiento() {
  document.getElementById("input-procedimiento").value = "";
  document.getElementById("input-detalle-proc").value = "";
  document.getElementById("proc-error").textContent = "";
  document.getElementById("modal-procedimiento").style.display = "flex";
  console.log("Modal agregar procedimiento abierto");
}

// Cierra el modal de procedimiento
function cerrarModalProcedimiento() {
  document.getElementById("modal-procedimiento").style.display = "none";
  console.log("Modal procedimiento cerrado");
}

// Agrega un nuevo procedimiento verificando duplicados con for
function agregarProcedimiento() {
  const nombre  = document.getElementById("input-procedimiento").value.trim();
  const detalle = document.getElementById("input-detalle-proc").value.trim();

  if (nombre === "" || detalle === "") {
    document.getElementById("proc-error").textContent = "Completa todos los campos.";
    console.log("Procedimiento no agregado — campos vacíos");
    return;
  }

  // Verifica duplicados con for
  for (let i = 0; i < procedimientos.length; i++) {
    if (procedimientos[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      document.getElementById("proc-error").textContent = "Este procedimiento ya fue registrado.";
      console.log("Procedimiento duplicado:", nombre);
      return;
    }
  }

  // Agrega al array con su id único
  procedimientos.push({ id: contadorProc, nombre: nombre, detalle: detalle });
  console.log("Procedimiento agregado:", nombre);

  // Crea el elemento en el DOM
  const contenedor = document.getElementById("lista-procedimientos");
  const item = document.createElement("div");
  item.className = "proc-item";
  item.id = "proc-" + contadorProc; // id en el DOM para poder eliminarlo
  item.innerHTML = `
    <div class="proc-ico">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    </div>
    <div style="flex:1">
      <div class="proc-nombre">${nombre}</div>
      <div class="proc-sub">${detalle}</div>
    </div>
    <span class="badge b-success">Realizado</span>
    <button class="btn-eliminar" onclick="eliminarProcedimiento(${contadorProc})" title="Eliminar">${SVG_TACHO}</button>
  `;
  contenedor.appendChild(item);
  contadorProc++;

  cerrarModalProcedimiento();
}

// Elimina un procedimiento del array y de la lista por su id
function eliminarProcedimiento(id) {
  procedimientos = procedimientos.filter(function (p) { return p.id !== id; });
  document.getElementById("proc-" + id).remove();
  console.log("Procedimiento eliminado — id:", id);
}

// ── EVENT LISTENERS ───────────────────────────────
document.addEventListener("DOMContentLoaded", function () {

  const btnGuardar = document.getElementById("btn-guardar");
  if (btnGuardar) btnGuardar.addEventListener("click", confirmarGuardar);

  const btnReceta = document.getElementById("btn-agregar-receta");
  if (btnReceta) btnReceta.addEventListener("click", abrirModalReceta);

  const btnProc = document.getElementById("btn-agregar-proc");
  if (btnProc) btnProc.addEventListener("click", abrirModalProcedimiento);
});
