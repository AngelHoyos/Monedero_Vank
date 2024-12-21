document.addEventListener("DOMContentLoaded", () => {
    // Primero, obtenemos el elemento Body donde vamos a cargar el contenido
    const bodyElement = document.getElementById('Body');

    // Si no se encuentra el elemento Body, mostramos un error en la consola
    if (!bodyElement) {
        console.error('No se encontró el elemento Body en el DOM.');
        return;
    }

    // Hacemos una solicitud fetch para cargar el archivo de login
    fetch('../../components/login/login.html')
        .then(response => {
            // Si la solicitud no es exitosa, mostramos un error
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de login");
            }
            return response.text();
        })
        .then(data => {
            // Cargamos el contenido del archivo login.html en el Body
            bodyElement.innerHTML = data;

            // Ejecutamos los scripts que vienen dentro del archivo de login
            const scripts = bodyElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src || '';
                newScript.innerHTML = script.innerHTML || '';
                document.body.appendChild(newScript);
            });

            // Seleccionamos los botones y formularios para manejar los eventos
            const traditionalLoginBtn = document.getElementById('traditional-login-btn');
            const codeLoginBtn = document.getElementById('code-login-btn');
            const loginForm = document.getElementById('login-form');
            const traditionalLoginForm = document.getElementById('traditional-login-form');
            const codeLoginForm = document.getElementById('code-login-form');
            const authSelection = document.getElementById('auth-selection');
            const backBtn = document.getElementById('back-btn');
            const createAccountLink = document.getElementById('create-account-link'); // Enlace para crear cuenta

            // Verificamos si los elementos importantes existen
            if (!traditionalLoginBtn || !codeLoginBtn || !createAccountLink) {
                console.error('Algunos elementos no están disponibles');
                return;
            }

            // Función para mostrar el formulario de inicio de sesión
            const showLoginForm = () => {
                loginForm.style.display = 'block'; // Mostramos el formulario de login
                authSelection.style.display = 'none'; // Ocultamos los botones de selección de método de login
                backBtn.style.display = 'block'; // Mostramos la flecha de regresar
            };

            // Función para mostrar el formulario tradicional de login (usuario y contraseña)
            const showTraditionalLoginForm = () => {
                showLoginForm(); // Llamamos la función para mostrar el formulario de login
                traditionalLoginForm.style.display = 'block'; // Mostramos el formulario tradicional
                codeLoginForm.style.display = 'none'; // Ocultamos el formulario con código
            };

            // Función para mostrar el formulario de login con código
            const showCodeLoginForm = () => {
                showLoginForm(); // Llamamos la función para mostrar el formulario de login
                traditionalLoginForm.style.display = 'none'; // Ocultamos el formulario tradicional
                codeLoginForm.style.display = 'block'; // Mostramos el formulario con código
            };

            // Funciones para manejar los clics en los botones
            const handleTraditionalLoginClick = () => {
                showTraditionalLoginForm(); // Muestra el formulario tradicional de login
            };

            const handleCodeLoginClick = () => {
                showCodeLoginForm(); // Muestra el formulario con código de 4 dígitos
            };

            // Función para manejar el clic en la flecha de regresar
            const handleBackClick = () => {
                loginForm.style.display = 'none'; // Ocultamos el formulario de login
                authSelection.style.display = 'block'; // Mostramos los botones de selección
                backBtn.style.display = 'none'; // Ocultamos la flecha de regresar
            };

            // Agregamos los event listeners para los botones
            traditionalLoginBtn.addEventListener('click', handleTraditionalLoginClick);
            codeLoginBtn.addEventListener('click', handleCodeLoginClick);
            backBtn.addEventListener('click', handleBackClick);

            // Agregamos el evento para el enlace "Crear cuenta"
            createAccountLink.addEventListener('click', () => {
                loadRegisterForm(); // Cargamos el formulario de registro cuando se hace clic
            });

            // Función para manejar el envío del formulario de login
            const form = document.getElementById('login-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitamos que el formulario se envíe

                // Obtenemos los valores del formulario
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();
                const code = document.getElementById('code').value.trim();

                // Validamos según el formulario visible
                if (traditionalLoginForm.style.display === 'block') {
                    // Validamos el formulario de usuario y contraseña
                    if (username === '' || password === '') {
                        alert('Por favor, ingresa usuario y contraseña.');
                    } else {
                        alert('Ingreso exitoso con usuario y contraseña.');
                        console.log('Usuario:', username);
                        console.log('Contraseña:', password);
                    }
                } else if (codeLoginForm.style.display === 'block') {
                    // Validamos el código de 4 dígitos
                    if (code.length === 4) {
                        alert('Ingreso exitoso con código de 4 dígitos.');
                        console.log('Código ingresado:', code);
                    } else {
                        alert('Por favor, ingresa un código de 4 dígitos válido.');
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo', error); // Si ocurre un error, lo mostramos en consola
        });
});

// Función para cargar el formulario de registro
const loadRegisterForm = () => {
    const bodyElement = document.getElementById('Body');
    bodyElement.innerHTML = ''; // Limpiamos el contenido actual del body

    // Hacemos una solicitud fetch para cargar el archivo de registro
    fetch('../../components/register/register.html')
        .then(response => {
            // Si la solicitud no es exitosa, mostramos un error
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de registro");
            }
            return response.text();
        })
        .then(registerData => {
            // Cargamos el contenido del archivo de registro en el Body
            bodyElement.innerHTML = registerData;

            // Ejecutamos los scripts del archivo de registro cargado
            const registerScripts = bodyElement.querySelectorAll('script');
            registerScripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src || '';
                newScript.innerHTML = script.innerHTML || '';
                document.body.appendChild(newScript);
            });

            // Aquí puedes agregar más lógica si es necesario, como validación del formulario de registro
        })
        .catch(error => {
            console.error('Error al cargar el archivo de registro', error); // Si ocurre un error, lo mostramos en consola
        });
};
