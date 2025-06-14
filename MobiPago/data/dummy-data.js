import Perfil from "../models/perfil.js"
import Tarjeta from "../models/tarjeta.js"

// Datos de ejemplo para transacciones
const transaccionesEjemplo = [
  {
    id: 1,
    destinatario: "Carlos R. Lucar",
    monto: 5.0,
    fecha: "12/05/2025",
    hora: "11:15",
    tipo: "recibido",
  },
  {
    id: 2,
    remitente: "Carlos R. Lucar",
    monto: -15.0,
    fecha: "12/05/2025",
    hora: "10:15",
    tipo: "enviado",
  },
  {
    id: 3,
    destinatario: "*** *** 156",
    monto: 20.0,
    fecha: "12/05/2025",
    hora: "10:15",
    tipo: "recibido",
  },
  {
    id: 4,
    destinatario: "Humberto A. Linarez",
    monto: 100.0,
    fecha: "12/05/2025",
    hora: "10:15",
    tipo: "recibido",
  },
]

// Instancia del perfil del usuario
export const perfil = new Perfil(1, "Carlos R.", "Lucar", "carlos.lucar", "password123", 12000, transaccionesEjemplo)

// Instancias de tarjetas de ejemplo
export const tarjetas = [
  new Tarjeta("Tarjeta Principal", "4532 1234 5678 9012", "Carlos R. Lucar", "12/27", "123"),
  new Tarjeta("Tarjeta Principal 2", "5555 4444 3333 2222", "Carlos R. Lucar", "08/26", "456"),
]

// Mantener compatibilidad con código existente
export const tarjeta = tarjetas[0]
