function Enviar() {  

let respuesta = confirm("¿Seguro que desea enviar la consulta?");

if (respuesta === true) {
    console.log("Consulta enviada.");
} else {
    console.log("Consulta no enviada.");
}
}