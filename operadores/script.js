document.addEventListener("DOMContentLoaded", function () {

    const escena = document.querySelector("a-scene");
    const boton = document.getElementById("iniciar");
    const pantalla = document.getElementById("inicio");
    const mensaje = document.getElementById("mensaje");
    const objetivo = document.getElementById("objetivo");


    // ==========================================
    // BOTÓN INICIAR
    // ==========================================

    boton.addEventListener("click", function () {

        console.log("INICIAR presionado");

        mensaje.innerText = "Iniciando cámara...";

        const sistemaAR =
            escena.systems["mindar-image-system"];

        if (!sistemaAR) {

            console.error("MindAR no está disponible.");

            mensaje.innerText =
                "Error: no se pudo cargar MindAR.";

            return;
        }


        // Ocultamos la pantalla de inicio
        pantalla.style.display = "none";


        // Iniciamos la realidad aumentada
        sistemaAR.start();

        console.log("MindAR iniciado.");

    });



    // ==========================================
    // MINDAR LISTO
    // ==========================================

    escena.addEventListener("arReady", function () {

        console.log("Cámara activa.");

        mensaje.innerText =
            "✓ Cámara activa · Buscando la imagen...";

    });



    // ==========================================
    // ERROR
    // ==========================================

    escena.addEventListener("arError", function (evento) {

        console.error(
            "Error de realidad aumentada:",
            evento
        );

        pantalla.style.display = "flex";

        mensaje.innerText =
            "❌ No se pudo iniciar la cámara.";

    });



    // ==========================================
    // IMAGEN RECONOCIDA
    // ==========================================

    objetivo.addEventListener("targetFound", function () {

        console.log("¡¡¡IMAGEN RECONOCIDA!!!");

        mensaje.innerText =
            "🎉 ¡IMAGEN RECONOCIDA!";

    });



    // ==========================================
    // IMAGEN PERDIDA
    // ==========================================

    objetivo.addEventListener("targetLost", function () {

        console.log("Imagen perdida.");

        mensaje.innerText =
            "Buscando la imagen...";

    });

});