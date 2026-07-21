function Enviar() {  

let respuesta = confirm("¿Seguro que desea enviar la consulta?");

if (respuesta === true) {
    alert("Consulta enviada correctamente. Nos pondremos en contacto contigo pronto.");
    console.log("Consulta enviada.");
    window.location.href = "soporte.html";
} else {
    alert("Consulta no enviada. Puedes revisar tu mensaje y enviarlo cuando estés listo.");
    console.log("Consulta no enviada.");
}
}