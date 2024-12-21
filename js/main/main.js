document.addEventListener("DOMContentLoaded", () => {
    const bodyElement = document.getElementById('Body');
    
    if (!bodyElement) {
        console.error('No se encontró el elemento Body en el DOM.');
        return;
    }

    // Cargamos el archivo de login
    fetch('../../components/login/login.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de login");
            }
            return response.text();
        })
        .then(data => {
            bodyElement.innerHTML = data;

            // Ejecutamos los scripts del archivo de login
            const scripts = bodyElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src || '';
                newScript.innerHTML = script.innerHTML || '';
                document.body.appendChild(newScript);
            });

            const loginForm = document.getElementById('login-form');
            const traditionalLoginForm = document.getElementById('traditional-login-form');
            const createAccountLink = document.getElementById('create-account-link');

            if (!loginForm || !traditionalLoginForm || !createAccountLink) {
                console.error('Algunos elementos no están disponibles');
                return;
            }

            // Función para mostrar el formulario de login tradicional
            const showLoginForm = () => {
                loginForm.style.display = 'block';
            };

            const showTraditionalLoginForm = () => {
                showLoginForm();
                traditionalLoginForm.style.display = 'block';
            };

            // Mostrar el formulario de inicio de sesión tradicional al cargar
            showTraditionalLoginForm();

            const handleBackClick = () => {
                loginForm.style.display = 'none';
            };

            createAccountLink.addEventListener('click', () => {
                loadRegisterForm();
            });

            // Función para manejar el envío del formulario de login
            const form = document.getElementById('login-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();

                // Validación del login
                if (username === '' || password === '') {
                    alert('Por favor, ingresa usuario y contraseña.');
                } else {
                    // Intentamos obtener los datos del usuario desde el localStorage
                    const usuarioData = localStorage.getItem(username);

                    if (usuarioData) {
                        // Si el usuario existe, verificamos la contraseña
                        const parsedData = JSON.parse(usuarioData);

                        if (parsedData.contrasenaUsuario === password) {
                            alert('Ingreso exitoso. Usuario encontrado.');
                            console.log('Usuario:', username);
                            console.log('Contraseña:', password);
                        } else {
                            alert('Contraseña incorrecta.');
                        }
                    } else {
                        // Si el usuario no existe
                        alert('Usuario no existe.');
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo', error);
        });
});

const loadRegisterForm = () => {
    const bodyElement = document.getElementById('Body');
    bodyElement.innerHTML = ''; // Limpiar el contenido previo

    // Cargamos el archivo de registro
    fetch('../../components/register/register.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de registro");
            }
            return response.text();
        })
        .then(registerData => {
            // Insertamos el contenido HTML del formulario de registro
            bodyElement.innerHTML = registerData;

            // Añadimos los scripts del formulario de registro
            const registerScripts = bodyElement.querySelectorAll('script');
            registerScripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src || '';
                newScript.innerHTML = script.innerHTML || '';
                document.body.appendChild(newScript);
            });

            // Ahora agregamos el manejador del formulario de registro
            const formularioRegistro = document.getElementById('formulario-registro');
            const botonRegresar = document.getElementById('boton-regresar');
            
            // Mostrar formulario de registro
            formularioRegistro.style.display = 'block';
            botonRegresar.style.display = 'none'; // No mostrar la flecha de regresar

            // Manejar el evento de envío del formulario
            const form = document.getElementById('formulario-registro');
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar el envío del formulario

                const nombreCompleto = document.getElementById('nombre-completo').value.trim();
                const correoElectronico = document.getElementById('correo-electronico').value.trim();
                const nombreUsuario = document.getElementById('nombre-usuario').value.trim();
                const contrasenaUsuario = document.getElementById('contrasena-usuario').value.trim();

                // Validación del formulario
                if (nombreCompleto === '' || correoElectronico === '' || nombreUsuario === '' || contrasenaUsuario === '') {
                    alert('Por favor, completa todos los campos.');
                } else {
                    // Almacenamos los datos en localStorage utilizando el nombre de usuario como clave
                    const usuarioData = {
                        nombreCompleto: nombreCompleto,
                        correoElectronico: correoElectronico,
                        contrasenaUsuario: contrasenaUsuario
                    };

                    // Guardamos los datos en el localStorage
                    localStorage.setItem(nombreUsuario, JSON.stringify(usuarioData));

                    alert('Registro exitoso con datos normales.');
                    console.log('Datos guardados:', usuarioData);

                    // Aquí puedes agregar alguna lógica adicional, como redirigir al usuario al login
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo de registro', error);
        });
};
