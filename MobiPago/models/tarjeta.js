class Tarjeta {
  constructor(nombre, numero, titular, fechaCaducidad, cvv, perfilId) {
    this.nombre = nombre;
    this.numero = numero; // Este es el "main key"
    this.titular = titular;
    this.fechaCaducidad = fechaCaducidad;
    this.cvv = cvv;
    this.perfilId = perfilId; // foreign key que hace referencia al id del perfil
  }
}

export default Tarjeta;
