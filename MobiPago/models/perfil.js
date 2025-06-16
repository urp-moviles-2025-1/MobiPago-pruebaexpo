class Perfil {
  constructor(id, nombre, apellidos, usuario, contrasena, balance, transacciones, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.balance = balance;
    this.transacciones = transacciones;
    this.telefono = telefono;// Array de transacciones
  }
}

export default Perfil