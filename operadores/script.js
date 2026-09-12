document.addEventListener("DOMContentLoaded", function () {

    const sceneEl = document.querySelector("#escena-ar");
    const startButton = document.querySelector("#iniciar");
    const inicio = document.querySelector("#inicio");
    const mensaje = document.querySelector("#mensaje");
    const target = document.querySelector("#objetivo");


    // ==============================
    // COMPROBACIÓN
    // ==============================

    console.log("JAVASCRIPT CARGADO");


    // ==============================
    // BOTÓN INICIAR
    // ==============================

    startButton.addEventListener("click", function () {

        console.log("BOTÓN INICIAR");

        mensaje.innerText = "Iniciando cámara...";


        // Obtenemos MindAR directamente
        const arSystem =
            sceneEl.systems["mindar-image-system"];


        if (!arSystem) {

            console.log("MINDAR TODAVÍA NO ESTÁ LISTO");

            mensaje.innerText =
                "Esperando que cargue la realidad aumentada...";

            return;
        }


        console.log("MINDAR ENCONTRADO");

        arSystem.start();

    });


    // ==============================
    // MINDAR LISTO
    // ==============================

    sceneEl.addEventListener("arReady", function () {

        console.log("CÁMARA INICIADA");

        inicio.style.display = "none";

        mensaje.style.display = "block";

        mensaje.innerText =
            "✓ Cámara activa · Buscando la imagen...";

    });


    // ==============================
    // ERROR
    // ==============================

    sceneEl.addEventListener("arError", function (event) {

        console.error("ERROR MINDAR:", event);

        mensaje.innerText =
            "❌ No se pudo iniciar la cámara.";

    });


    // ==============================
    // IMAGEN RECONOCIDA
    // ==============================

    target.addEventListener("targetFound", function () {

        console.log("IMAGEN RECONOCIDA");

        mensaje.innerText =
            "🎉 ¡IMAGEN RECONOCIDA!";

    });


    // ==============================
    // IMAGEN PERDIDA
    // ==============================

    target.addEventListener("targetLost", function () {

        console.log("IMAGEN PERDIDA");

        mensaje.innerText =
            "Buscando la imagen...";

    });

});