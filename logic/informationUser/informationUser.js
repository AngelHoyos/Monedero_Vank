// Archivo: Usuario.js
export class Usuario {
    constructor(nombre, apellido, telefono, correo, contrasena) {
      this._nombre = nombre;
      this._apellido = apellido;
      this._telefono = telefono;
      this._correo = correo;
      this._contrasena = contrasena;
      this._codigoAcceso = this.generarCodigoAcceso();
    }
  
    // Getters
    get nombre() {
      return this._nombre;
    }
  
    get apellido() {
      return this._apellido;
    }
  
    get telefono() {
      return this._telefono;
    }
  
    get correo() {
      return this._correo;
    }
  
    get contrasena() {
      return this._contrasena;
    }
  
    get codigoAcceso() {
      return this._codigoAcceso;
    }
  
    // Setters
    set nombre(valor) {
      this._nombre = valor;
    }
  
    set apellido(valor) {
      this._apellido = valor;
    }
  
    set telefono(valor) {
      this._telefono = valor;
    }
  
    set correo(valor) {
      this._correo = valor;
    }
  
    set contrasena(valor) {
      this._contrasena = valor;
    }
  
    // Métodos auxiliares
    generarCodigoAcceso() {
      return Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
    }
  
    guardarEnLocalStorage() {
      const data = {
        nombre: this._nombre,
        apellido: this._apellido,
        telefono: this._telefono,
        correo: this._correo,
        contrasena: this._contrasena,
        codigoAcceso: this._codigoAcceso,
      };
      localStorage.setItem('usuario', JSON.stringify(data));
    }
  
    static obtenerDeLocalStorage() {
      const data = localStorage.getItem('usuario');
      return data ? JSON.parse(data) : null;
    }
  
    static cargarDesdeLocalStorage() {
      const data = this.obtenerDeLocalStorage();
      if (data) {
        return new Usuario(
          data.nombre,
          data.apellido,
          data.telefono,
          data.correo,
          data.contrasena
        );
      }
      return null;
    }
  }
  