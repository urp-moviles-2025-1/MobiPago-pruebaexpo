import Perfil from "../models/perfil.js";
import Tarjeta from "../models/tarjeta.js";
import Transaccion from "../models/transacciones.js";

// Instancias de perfiles
export const perfiles = [
  new Perfil(1, "Carlos R.", "Lucar", "carlos.lucar", "password123", 12000, []),
  new Perfil(2, "Maria A.", "Lopez", "maria.lopez", "password456", 15000, []),
  new Perfil(3, "Juan P.", "Gonzalez", "juan.gonzalez", "password789", 5000, []),
  new Perfil(4, "Ana M.", "Martínez", "ana.martinez", "password101", 8000, []),
  new Perfil(5, "Luis G.", "Fernández", "luis.fernandez", "password202", 10000, []),
];

// Datos de transacciones de ejemplo con valores positivos (sin valores negativos)
const transaccionesEjemplo = [
  new Transaccion(1, 2, 1, 200.0, "12/05/2025", "11:15"), // De Carlos a Maria
  new Transaccion(2, 1, 2, 150.0, "12/05/2025", "12:00"), // De Maria a Carlos
  new Transaccion(3, 3, 1, 300.0, "12/05/2025", "13:30"), // De Carlos a Juan
  new Transaccion(4, 1, 3, 500.0, "12/06/2025", "09:45"), // De Juan a Carlos
  new Transaccion(5, 4, 1, 450.0, "12/06/2025", "10:30"), // De Carlos a Ana
  new Transaccion(6, 5, 2, 600.0, "12/06/2025", "11:00"), // De Maria a Luis
  new Transaccion(7, 2, 4, 100.0, "12/07/2025", "08:20"), // De Ana a Maria
  new Transaccion(8, 3, 4, 350.0, "12/07/2025", "14:10"), // De Ana a Juan
  new Transaccion(9, 4, 5, 800.0, "12/07/2025", "16:00"), // De Luis a Ana
  new Transaccion(10, 1, 5, 1000.0, "12/07/2025", "17:00"), // De Luis a Carlos
  new Transaccion(11, 2, 3, 900.0, "12/08/2025", "10:10"), // De Juan a Maria
  new Transaccion(12, 5, 3, 700.0, "12/08/2025", "12:00"), // De Juan a Luis
  new Transaccion(13, 1, 2, 350.0, "12/09/2025", "15:30"), // De Maria a Carlos
  new Transaccion(14, 3, 5, 550.0, "12/09/2025", "18:00"), // De Luis a Juan
  new Transaccion(15, 4, 5, 600.0, "12/09/2025", "19:10"), // De Luis a Ana
];

// Asignar las transacciones a los perfiles correspondientes
perfiles[0].transacciones = [
  transaccionesEjemplo[0],
  transaccionesEjemplo[3],
  transaccionesEjemplo[5],
  transaccionesEjemplo[10],
  transaccionesEjemplo[13],
];
perfiles[1].transacciones = [
  transaccionesEjemplo[1],
  transaccionesEjemplo[4],
  transaccionesEjemplo[7],
  transaccionesEjemplo[11],
  transaccionesEjemplo[14],
];
perfiles[2].transacciones = [
  transaccionesEjemplo[2],
  transaccionesEjemplo[8],
  transaccionesEjemplo[12],
  transaccionesEjemplo[6],
  transaccionesEjemplo[9],
];
perfiles[3].transacciones = [
  transaccionesEjemplo[9],
  transaccionesEjemplo[15],
  transaccionesEjemplo[13],
  transaccionesEjemplo[7],
  transaccionesEjemplo[4],
];
perfiles[4].transacciones = [
  transaccionesEjemplo[6],
  transaccionesEjemplo[14],
  transaccionesEjemplo[12],
  transaccionesEjemplo[8],
  transaccionesEjemplo[10],
];

// Instancias de tarjetas de ejemplo asociadas a los perfiles (con foreign key `perfilId`)
export const tarjetas = [
  new Tarjeta("Tarjeta Principal Carlos", "4532 1234 5678 9012", "Carlos R. Lucar", "12/27", "123", perfiles[0].id),
  new Tarjeta("Tarjeta Secundaria Carlos", "4532 2345 6789 0123", "Carlos R. Lucar", "12/26", "321", perfiles[0].id),
  new Tarjeta("Tarjeta Principal Maria", "5555 4444 3333 2222", "Maria A. Lopez", "08/26", "456", perfiles[1].id),
  new Tarjeta("Tarjeta Secundaria Maria", "5555 5555 4444 3333", "Maria A. Lopez", "09/27", "654", perfiles[1].id),
  new Tarjeta("Tarjeta Principal Juan", "6666 7777 8888 9999", "Juan P. Gonzalez", "05/24", "789", perfiles[2].id),
  new Tarjeta("Tarjeta Secundaria Juan", "6666 8888 7777 6666", "Juan P. Gonzalez", "06/25", "987", perfiles[2].id),
  new Tarjeta("Tarjeta Principal Ana", "7777 8888 9999 0000", "Ana M. Martínez", "11/26", "112", perfiles[3].id),
  new Tarjeta("Tarjeta Secundaria Ana", "7777 9999 8888 0000", "Ana M. Martínez", "07/27", "211", perfiles[3].id),
  new Tarjeta("Tarjeta Principal Luis", "8888 9999 0000 1111", "Luis G. Fernández", "01/25", "334", perfiles[4].id),
  new Tarjeta("Tarjeta Secundaria Luis", "8888 1111 9999 0000", "Luis G. Fernández", "03/25", "433", perfiles[4].id),
];

// Mantener compatibilidad con código existente
export const tarjeta = tarjetas[0];

