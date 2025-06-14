"use client"

import { createContext, useContext, useState } from "react"
import Tarjeta from "../models/tarjeta"

// Datos iniciales de tarjetas
const tarjetasIniciales = [
  new Tarjeta("Tarjeta Principal", "4532123456789012", "Carlos R. Lucar", "12/27", "123"),
  new Tarjeta("Tarjeta Principal 2", "5555444433332222", "Carlos R. Lucar", "08/26", "456"),
]

const TarjetasContext = createContext()

export const useTarjetas = () => {
  const context = useContext(TarjetasContext)
  if (!context) {
    throw new Error("useTarjetas debe ser usado dentro de TarjetasProvider")
  }
  return context
}

export const TarjetasProvider = ({ children }) => {
  const [tarjetas, setTarjetas] = useState(tarjetasIniciales)

  const agregarTarjeta = (nuevaTarjeta) => {
    setTarjetas((prevTarjetas) => [...prevTarjetas, nuevaTarjeta])
  }

  const eliminarTarjeta = (index) => {
    setTarjetas((prevTarjetas) => prevTarjetas.filter((_, i) => i !== index))
  }

  return (
    <TarjetasContext.Provider
      value={{
        tarjetas,
        agregarTarjeta,
        eliminarTarjeta,
      }}
    >
      {children}
    </TarjetasContext.Provider>
  )
}
