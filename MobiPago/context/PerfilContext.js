"use client"

import { createContext, useContext, useState } from "react"
import Perfil from "../models/perfil"

// Datos iniciales de transacciones (mantenemos las mismas)
const transaccionesIniciales = [
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

// Perfil inicial
const perfilInicial = new Perfil(1, "Carlos R.", "Lucar", "carlos.lucar", "password123", 12000, transaccionesIniciales)

// Agregar campos adicionales para el perfil
perfilInicial.email = "carlos.lucar@gmail.com"
perfilInicial.telefono = "999 999 999"

const PerfilContext = createContext()

export const usePerfil = () => {
  const context = useContext(PerfilContext)
  if (!context) {
    throw new Error("usePerfil debe ser usado dentro de PerfilProvider")
  }
  return context
}

export const PerfilProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(perfilInicial)

  const actualizarPerfil = (nuevosDatos) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      ...nuevosDatos,
    }))
  }

  const actualizarBalance = (nuevoBalance) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      balance: nuevoBalance,
    }))
  }

  const agregarTransaccion = (nuevaTransaccion) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      transacciones: [nuevaTransaccion, ...prevPerfil.transacciones],
    }))
  }

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        actualizarPerfil,
        actualizarBalance,
        agregarTransaccion,
      }}
    >
      {children}
    </PerfilContext.Provider>
  )
}
