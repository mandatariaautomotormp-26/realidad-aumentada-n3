document.addEventListener("DOMContentLoaded", function () {

    const botonIniciar = document.getElementById("iniciar");
    const pantallaInicio = document.getElementById("pantalla-inicio");

    const escena = document.querySelector("a-scene");

    // Cuando MindAR está listo
    escena.addEventListener("arReady", function () {

        console.log("MindAR está listo");

    });

    // Botón INICIAR
    botonIniciar.addEventListener("click", function () {

        console.log("Iniciando realidad aumentada...");

        // Ocultamos la pantalla inicial
        pantallaInicio.style.display = "none";

        // Iniciamos MindAR
        const sistemaAR = escena.systems["mindar-image-system"];

        if (sistemaAR) {
            sistemaAR.start();
        } else {
            console.error("No se encontró el sistema MindAR");
        }

    });


    // Cuando la imagen es encontrada
    const objetivo = document.getElementById("objetivo");

    objetivo.addEventListener("targetFound", function () {

        console.log("¡IMAGEN ENCONTRADA!");

    });


    // Cuando la imagen deja de verse
    objetivo.addEventListener("targetLost", function () {

        console.log("Imagen perdida");

    });

});