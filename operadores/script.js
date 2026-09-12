document.addEventListener("DOMContentLoaded", function () {

    const escena = document.querySelector("a-scene");
    const boton = document.getElementById("iniciar");
    const pantallaInicio = document.getElementById("inicio");
    const mensaje = document.getElementById("mensaje");
    const objetivo = document.getElementById("objetivo");

    mensaje.style.zIndex = "20000";

    boton.addEventListener("click", async function () {

        console.log("INICIAR PRESIONADO");

        boton.disabled = true;
        boton.innerText = "INICIANDO...";
        mensaje.innerText = "Iniciando cámara...";

        try {

            if (!escena.hasLoaded) {
                await new Promise(function(resolve) {
                    escena.addEventListener("loaded", resolve, {
                        once: true
                    });
                });
            }

            const sistemaAR =
                escena.systems["mindar-image-system"];

            if (!sistemaAR) {
                throw new Error("MindAR no está disponible.");
            }

            console.log("MINDAR ENCONTRADO");

            await sistemaAR.start();

            console.log("CAMARA INICIADA");

            pantallaInicio.style.display = "none";

            boton.disabled = false;
            boton.innerText = "INICIAR";

            mensaje.innerText =
                "✓ Cámara activa · Buscando la imagen...";

        } catch (error) {

            console.error("ERROR:", error);

            boton.disabled = false;
            boton.innerText = "INICIAR";

            mensaje.innerText =
                "❌ No se pudo iniciar la cámara. Revisá el permiso de cámara.";
        }
    });

    escena.addEventListener("arReady", function () {

        console.log("MINDAR LISTO");

        mensaje.innerText =
            "✓ Cámara activa · Buscando la imagen...";

    });

    escena.addEventListener("arError", function (evento) {

        console.error("ERROR MINDAR:", evento);

        mensaje.innerText =
            "❌ Error al iniciar la realidad aumentada.";

    });

    objetivo.addEventListener("targetFound", function () {

        console.log("IMAGEN RECONOCIDA");

        mensaje.innerText =
            "🎉 ¡IMAGEN RECONOCIDA!";

    });

    objetivo.addEventListener("targetLost", function () {

        mensaje.innerText =
            "Buscando la imagen...";

    });

});