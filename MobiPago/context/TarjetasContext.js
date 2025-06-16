"use client"

import { createContext, useContext, useState } from "react"
import { getTarjetasByPerfilId } from "../data/dummy-data"

const TarjetasContext = createContext()

export const useTarjetas = () => {
  const context = useContext(TarjetasContext)
  if (!context) {
    throw new Error("useTarjetas debe ser usado dentro de TarjetasProvider")
  }
  return context
}

export const TarjetasProvider = ({ children }) => {
  // Obtener tarjetas del perfil principal (Carlos - ID: 1)
  const [tarjetas, setTarjetas] = useState(getTarjetasByPerfilId(1))

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
