document.addEventListener("DOMContentLoaded", () => {
    const bodyElement = document.getElementById('Body');

    if (!bodyElement) {
        console.error('No se encontró el elemento Body en el DOM.');
        return;
    }

    // Función que carga una vista específica (login, registro o home)
    const loadView = (view) => {
        bodyElement.innerHTML = ''; // Limpiar el contenido previo

        // Ruta al archivo de la vista
        const filePath = `../../components/${view}/${view}.html`;

        // Cargar el archivo correspondiente (login, registro o home)
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

                // Configuración de las vistas específicas
                if (view === 'login') {
                    setupLogin();
                } else if (view === 'register') {
                    setupRegister();
                } else if (view === 'HomeUser') {
                    setupHomeUser();
                    loadHomeUserScript(); // Aseguramos que el script de HomeUser se carga
                }
            })
            .catch(error => {
                console.error(`Error al cargar el archivo de ${view}`, error);
            });
    };

    // Función para verificar si el usuario ya está logueado
    const checkIfLoggedIn = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            // Si el usuario está logueado, cargar la vista de HomeUser
            loadView('HomeUser');
        } else {
            // Si no está logueado, cargar la vista de login
            loadView('login');
        }
    };

    const setupHomeUser = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        if (!loggedInUser) {
            showErrorAlert('No estás logueado. Por favor, inicia sesión.', () => {
                loadView('login'); // Redirigir a login
            });
            return;
        }
        
        const usuarioData = JSON.parse(localStorage.getItem('userInfo')); // Obtener la información completa del usuario
        
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');

        if (userNameElement && usuarioData) {
            userNameElement.textContent = `${usuarioData.nombreCompleto}`; // Usar nombre completo
            userEmailElement.textContent = `${usuarioData.correoElectronico}`; // Usar nombre completo

        }
    
        // Agregar funcionalidad para el botón de logout
        const logoutButton = document.getElementById('logoutBtn');
        if (logoutButton) {
            logoutButton.addEventListener('click', logout);
        }
    };
    

    // Función para cerrar sesión sin eliminar los datos del usuario
    function logout() {
        showConfirmationAlert(
            '¿Estás seguro de que quieres cerrar sesión?',
            () => {
                // Eliminar solo la clave que indica que el usuario está logueado
                localStorage.removeItem('loggedInUser');
                // Recargar la vista de login
                loadView('login');
            },
            () => {
                console.log('El usuario decidió no cerrar sesión.');
            }
        );
    }

    function deactivateAccount() {
        showAcceptOrCancelAlert(
            '¿Estás seguro de que deseas desactivar tu cuenta?',
            () => {
                alert("Cuenta desactivada");
                // Aquí iría la lógica para desactivar la cuenta
            },
            () => {
                console.log("El usuario decidió no desactivar la cuenta.");
            }
        );
    }

    function updateInfo() {
        showInfoAlert('La información del usuario ha sido actualizada exitosamente.');
    }

    // Función para cargar el script y configurar la vista de HomeUser
    const loadHomeUserScript = () => {
        const script = document.createElement('script');
        script.innerHTML = `
            // Función para abrir la modal
            function openModal() {
                document.getElementById('userModal').style.display = 'flex';
            }
    
            // Función para cerrar la modal
            function closeModal() {
                document.getElementById('userModal').style.display = 'none';
            }
    
            // Función para actualizar la información del usuario
            function updateInfo() {
                alert("Actualizar la información del usuario");
            }
    
            // Función para desactivar la cuenta
            function deactivateAccount() {
                alert("Cuenta desactivada");
            }
    
            // Función para mostrar las secciones del sidebar
            function showSection(sectionId) {
                // Ocultar todas las secciones
                const sections = document.querySelectorAll('.content-section');
                sections.forEach((section) => {
                    section.style.display = 'none';
                });
    
                // Mostrar la sección seleccionada
                const selectedSection = document.getElementById(sectionId);
                selectedSection.style.display = 'block';
            }
    
            // Función para cerrar sesión
            function logout() {
                // Eliminar solo la clave que indica que el usuario está logueado
                localStorage.removeItem('loggedInUser');
                // Recargar la vista de login
                loadView('login'); // Cargar la vista de login después de cerrar sesión
            }
    
            // Función para manejar el formulario de transferencia
            function handleTransfer(event) {
                event.preventDefault(); // Evitar que el formulario recargue la página
    
                const accountNumber = document.getElementById('accountNumber').value;
                const amount = document.getElementById('amount').value;
                const addToFavorites = document.getElementById('addToFavorites').checked;
    
                // Realizar la transferencia
                alert("¡Transferencia realizada con éxito!");
    
                // Si el checkbox está marcado, agregar la transferencia a favoritos
                if (addToFavorites) {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    favorites.push({ accountNumber, amount });
                    localStorage.setItem('favorites', JSON.stringify(favorites));
    
                    // Actualizar la lista de favoritos
                    updateFavoritesList();
                }
            }
    
            // Función para actualizar la lista de favoritos
            function updateFavoritesList() {
                const favoritesList = document.getElementById('favoritesListUL');
                favoritesList.innerHTML = ''; // Limpiar la lista antes de agregar elementos
    
                // Obtener los favoritos del localStorage
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
                // Crear una lista con los favoritos
                favorites.forEach(favorite => {
                    const li = document.createElement('li');
                    li.textContent = 'Cuenta: ' + favorite.accountNumber + ' - Monto: ' + favorite.amount;
                    favoritesList.appendChild(li);
                });
            }
    
            // Esperar a que el DOM cargue y luego agregar el evento de logout
            document.addEventListener('DOMContentLoaded', () => {
                // Cargar la lista de favoritos cuando se carga la página
                updateFavoritesList();
    
                // Agregar el evento al formulario de transferencia
                const transferForm = document.getElementById('transferForm');
                if (transferForm) {
                    transferForm.addEventListener('submit', handleTransfer);
                }
    
                const logoutButton = document.getElementById('logoutBtn');
                if (logoutButton) {
                    logoutButton.addEventListener('click', logout); // Agregar el evento click al botón de logout
                }
            });
        `;
        document.body.appendChild(script);
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
    
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (username === '' || password === '') {
                showWarningAlert('Por favor, ingresa usuario y contraseña.');
            } else {
                const usuarioData = localStorage.getItem(username);
                
                if (usuarioData) {
                    const parsedData = JSON.parse(usuarioData);
                    
                    if (parsedData.contrasenaUsuario === password) {
                        // Mostrar alerta de confirmación para login exitoso
                        showConfirmationAlert(
                            'Ingreso exitoso.',
                            () => {
                                // Guardar información del usuario completo
                                localStorage.setItem('loggedInUser', username);
                                localStorage.setItem('userInfo', JSON.stringify(parsedData)); // Guardar la información completa del usuario
                                
                                // Cargar la vista de HomeUser
                                loadView('HomeUser');
                            },
                            () => {
                                console.log('El usuario decidió quedarse en la vista de login.');
                            }
                        );
                    } else {
                        showErrorAlert('Contraseña incorrecta.');
                    }
                } else {
                    showErrorAlert('Usuario no existe.');
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
        formularioRegistro.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const nombreCompleto = document.getElementById('nombre-completo').value.trim();
            const correoElectronico = document.getElementById('correo-electronico').value.trim();
            const nombreUsuario = document.getElementById('nombre-usuario').value.trim();
            const contrasenaUsuario = document.getElementById('contrasena-usuario').value.trim();
        
            if (nombreCompleto === '' || correoElectronico === '' || nombreUsuario === '' || contrasenaUsuario === '') {
                showWarningAlert('Por favor, completa todos los campos.');
            } else {
                const usuarioData = {
                    nombreCompleto,
                    correoElectronico,
                    contrasenaUsuario
                };
        
                localStorage.setItem(nombreUsuario, JSON.stringify(usuarioData));
        
                // Mostrar alerta de confirmación para registro exitoso
                showConfirmationAlert(
                    'Registro exitoso.',
                    () => {
                        // Guardar usuario logueado en localStorage
                        localStorage.setItem('loggedInUser', nombreUsuario);
                        // Cargar la vista de HomeUser
                        loadView('HomeUser');
                    },
                    () => {
                        console.log('El usuario decidió quedarse en la vista de registro.');
                    }
                );
            }
        });
        
    };

    // Verificar si el usuario ya está logueado al cargar la página
    checkIfLoggedIn();
});

function showModal(type, message, onConfirm, onCancel, redirectUrl) {
    // Crear el overlay y la modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    const alertContainer = document.createElement('div');
    alertContainer.className = `${type}-alert alert-content`;

    // Definir el ícono de Font Awesome según el tipo
    let icon = '';
    switch (type) {
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle" style="color: gray; font-size:2.5rem;"></i>';
            break;
        case 'confirmation':
            icon = '<i class="fas fa-check-circle" style="color: gray; font-size:2.5rem;"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle" style="color: gray; font-size:2.5rem;"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle" style="color: gray; font-size:2.5rem;"></i>';
            break;
        case 'accept-cancel':
            icon = '<i class="fas fa-question-circle" style="color: gray; font-size:2.5rem;"></i>';
            break;
    }

    alertContainer.innerHTML = `
        <div class="alert-icon">${icon}</div>
        <p>${message}</p>
        <button id="confirm-btn">Confirmar</button>
        <button id="cancel-btn">Cancelar</button>
    `;

    document.body.appendChild(alertContainer);

    // Configurar los botones
    const confirmBtn = alertContainer.querySelector('#confirm-btn');
    const cancelBtn = alertContainer.querySelector('#cancel-btn');

    confirmBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(alertContainer);
        if (onConfirm) onConfirm();
        if (redirectUrl) {
            window.location.href = redirectUrl; // Redirigir después de la confirmación
        }
    });

    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(alertContainer);
        if (onCancel) onCancel();
    });

    // Hacer visible el overlay y la modal
    overlay.style.display = 'block';
    alertContainer.style.display = 'block';
}

// Funciones específicas para mostrar las modales
function showWarningAlert(message, onConfirm, onCancel) {
    showModal('warning', message, onConfirm, onCancel);
}

function showConfirmationAlert(message, onConfirm, onCancel, redirectUrl) {
    showModal('confirmation', message, onConfirm, onCancel, redirectUrl);
}

function showInfoAlert(message, onConfirm, onCancel) {
    showModal('info', message, onConfirm, onCancel);
}

function showErrorAlert(message, onConfirm, onCancel) {
    showModal('error', message, onConfirm, onCancel);
}

function showAcceptOrCancelAlert(message, onAccept, onCancel) {
    showModal('accept-cancel', message, onAccept, onCancel);
}
