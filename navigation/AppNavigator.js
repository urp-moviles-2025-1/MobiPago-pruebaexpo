import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { TarjetasProvider } from "../context/TarjetasContext"
import { PerfilProvider } from "../context/PerfilContext"
import App from "../App"
import Statistics from "../screens/statistics"
import Tarjetas from "../screens/tarjetas"
import CrearTarjeta from "../screens/creatarjeta"
import MiPerfil from "../screens/miperfil"
import EditarInformacion from "../screens/editarinformacion"
import Notificaciones from "../screens/notificaciones"
import Soporte from "../screens/soporte"

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <PerfilProvider>
      <TarjetasProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={App} />
            <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="Tarjetas" component={Tarjetas} />
            <Stack.Screen name="CrearTarjeta" component={CrearTarjeta} />
            <Stack.Screen name="MiPerfil" component={MiPerfil} />
            <Stack.Screen name="EditarInformacion" component={EditarInformacion} />
            <Stack.Screen name="Notificaciones" component={Notificaciones} />
            <Stack.Screen name="Soporte" component={Soporte} />
          </Stack.Navigator>
        </NavigationContainer>
      </TarjetasProvider>
    </PerfilProvider>
  )
}
