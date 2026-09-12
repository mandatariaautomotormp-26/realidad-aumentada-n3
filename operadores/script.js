document.addEventListener("DOMContentLoaded", function () {

    const escena = document.querySelector("a-scene");

    const botonIniciar =
        document.getElementById("iniciar");

    const pantallaInicio =
        document.getElementById("inicio");

    const mensaje =
        document.getElementById("mensaje");

    const objetivo =
        document.getElementById("objetivo");


    let sistemaAR = null;


    /*
    ==========================================
    CUANDO A-FRAME TERMINÓ DE CARGAR
    ==========================================
    */

    escena.addEventListener("loaded", function () {

        console.log("A-Frame cargado.");

        sistemaAR =
            escena.systems["mindar-image-system"];

        if (sistemaAR) {

            console.log("MindAR encontrado.");

            mensaje.innerText =
                "Listo para iniciar.";

        } else {

            console.error(
                "No se encontró el sistema MindAR."
            );

            mensaje.innerText =
                "Error al cargar MindAR.";

        }

    });



    /*
    ==========================================
    BOTÓN INICIAR
    ==========================================
    */

    botonIniciar.addEventListener(
        "click",
        async function () {

            console.log(
                "Botón INICIAR presionado."
            );


            if (!sistemaAR) {

                sistemaAR =
                    escena.systems[
                        "mindar-image-system"
                    ];

            }


            if (!sistemaAR) {

                mensaje.innerText =
                    "No se pudo cargar la realidad aumentada.";

                return;

            }


            try {

                mensaje.innerText =
                    "Solicitando cámara...";


                await sistemaAR.start();


                pantallaInicio.style.display =
                    "none";


                mensaje.innerText =
                    "✓ Cámara activa · Buscando la imagen...";


                console.log(
                    "MindAR iniciado correctamente."
                );


            } catch (error) {

                console.error(
                    "Error al iniciar MindAR:",
                    error
                );


                pantallaInicio.style.display =
                    "flex";


                mensaje.innerText =
                    "❌ No se pudo iniciar la cámara.";

            }

        }
    );



    /*
    ==========================================
    MINDAR LISTO
    ==========================================
    */

    escena.addEventListener(
        "arReady",
        function () {

            console.log(
                "MindAR está listo."
            );

            mensaje.innerText =
                "✓ Cámara activa · Buscando la imagen...";

        }
    );



    /*
    ==========================================
    ERROR DE MINDAR
    ==========================================
    */

    escena.addEventListener(
        "arError",
        function (evento) {

            console.error(
                "Error de MindAR:",
                evento
            );

            mensaje.innerText =
                "❌ Error al iniciar la cámara.";

        }
    );



    /*
    ==========================================
    IMAGEN RECONOCIDA
    ==========================================
    */

    objetivo.addEventListener(
        "targetFound",
        function () {

            console.log(
                "¡¡¡IMAGEN RECONOCIDA!!!"
            );


            mensaje.innerText =
                "🎉 ¡IMAGEN RECONOCIDA!";

        }
    );



    /*
    ==========================================
    IMAGEN PERDIDA
    ==========================================
    */

    objetivo.addEventListener(
        "targetLost",
        function () {

            console.log(
                "Imagen perdida."
            );


            mensaje.innerText =
                "Buscando la imagen...";

        }
    );

});