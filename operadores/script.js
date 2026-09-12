document.addEventListener("DOMContentLoaded", function () {

    const sceneEl = document.querySelector("a-scene");
    const startButton = document.querySelector("#iniciar");
    const inicio = document.querySelector("#inicio");
    const mensaje = document.querySelector("#mensaje");
    const target = document.querySelector("#objetivo");

    let arSystem = null;

    // Esperamos a que A-Frame cargue la escena
    sceneEl.addEventListener("loaded", function () {

        arSystem = sceneEl.systems["mindar-image-system"];

        console.log("ESCENA CARGADA");
        console.log("MINDAR:", arSystem);

    });

    // BOTÓN INICIAR
    startButton.addEventListener("click", function () {

        console.log("BOTÓN INICIAR");

        mensaje.innerText = "Iniciando cámara...";

        if (!arSystem) {
            mensaje.innerText =
                "Esperando que cargue la realidad aumentada...";
            return;
        }

        // ESTA ES LA FORMA SIMPLE DE ARRANCAR MINDAR
        arSystem.start();

    });

    // MindAR terminó de iniciar
    sceneEl.addEventListener("arReady", function () {

        console.log("CÁMARA INICIADA");

        inicio.style.display = "none";

        mensaje.innerText =
            "✓ Cámara activa · Buscando la imagen...";

    });

    // Error de cámara
    sceneEl.addEventListener("arError", function (event) {

        console.error("ERROR MINDAR:", event);

        mensaje.innerText =
            "❌ No se pudo iniciar la cámara.";

    });

    // IMAGEN RECONOCIDA
    target.addEventListener("targetFound", function () {

        console.log("IMAGEN RECONOCIDA");

        mensaje.innerText =
            "🎉 ¡IMAGEN RECONOCIDA!";

    });

    // IMAGEN PERDIDA
    target.addEventListener("targetLost", function () {

        mensaje.innerText =
            "Buscando la imagen...";

    });

});