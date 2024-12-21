document.addEventListener("DOMContentLoaded", () => {
    const bodyElement = document.getElementById('Body');

    if (!bodyElement) {
        console.error('No se encontró el elemento Body en el DOM.');
        return;
    }

    // Función que carga una vista específica (login o registro)
    const loadView = (view) => {
        bodyElement.innerHTML = ''; // Limpiar el contenido previo

        // Ruta al archivo de la vista
        const filePath = `../../components/${view}/${view}.html`;

        // Cargar el archivo correspondiente (login o registro)
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar el archivo de ${view}`);
                }
                return response.text();
            })
            .then(data => {
                bodyElement.innerHTML = data;

                // Añadir los scripts correspondientes
                const scripts = bodyElement.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.src || '';
                    newScript.innerHTML = script.innerHTML || '';
                    document.body.appendChild(newScript);
                });

                if (view === 'login') {
                    setupLogin();
                } else if (view === 'register') {
                    setupRegister();
                }
            })
            .catch(error => {
                console.error(`Error al cargar el archivo de ${view}`, error);
            });
    };

    // Función para configurar el formulario de login
    const setupLogin = () => {
        const loginForm = document.getElementById('login-form');
        const createAccountLink = document.getElementById('create-account-link');

        if (!loginForm || !createAccountLink) {
            console.error('Algunos elementos del login no están disponibles');
            return;
        }

        // Mostrar formulario de login
        loginForm.style.display = 'block';

        // Evento para cambiar a la vista de registro
        createAccountLink.addEventListener('click', () => {
            loadView('register');
        });

        // Evento de login
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validación del login
            if (username === '' || password === '') {
                alert('Por favor, ingresa usuario y contraseña.');
            } else {
                const usuarioData = localStorage.getItem(username);

                if (usuarioData) {
                    const parsedData = JSON.parse(usuarioData);

                    if (parsedData.contrasenaUsuario === password) {
                        alert('Ingreso exitoso.');
                    } else {
                        alert('Contraseña incorrecta.');
                    }
                } else {
                    alert('Usuario no existe.');
                }
            }
        });
    };

    // Función para configurar el formulario de registro
    const setupRegister = () => {
        const formularioRegistro = document.getElementById('formulario-registro');
        const enlaceLogin = document.getElementById('enlace-login');

        if (!formularioRegistro || !enlaceLogin) {
            console.error('Algunos elementos del registro no están disponibles');
            return;
        }

        // Mostrar formulario de registro
        formularioRegistro.style.display = 'block';

        // Evento para cambiar a la vista de login al hacer clic en el enlace
        enlaceLogin.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir acción por defecto del enlace
            loadView('login');
        });

        // Evento de envío del formulario de registro
        formularioRegistro.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombreCompleto = document.getElementById('nombre-completo').value.trim();
            const correoElectronico = document.getElementById('correo-electronico').value.trim();
            const nombreUsuario = document.getElementById('nombre-usuario').value.trim();
            const contrasenaUsuario = document.getElementById('contrasena-usuario').value.trim();

            if (nombreCompleto === '' || correoElectronico === '' || nombreUsuario === '' || contrasenaUsuario === '') {
                alert('Por favor, completa todos los campos.');
            } else {
                const usuarioData = {
                    nombreCompleto,
                    correoElectronico,
                    contrasenaUsuario
                };

                localStorage.setItem(nombreUsuario, JSON.stringify(usuarioData));
                alert('Registro exitoso');
            }
        });
    };

    // Cargar la vista inicial (login)
    loadView('login');
});
