import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { TarjetasProvider } from "../context/TarjetasContext"
import App from "../App"
import Statistics from "../screens/statistics"
import Tarjetas from "../screens/tarjetas"
import CrearTarjeta from "../screens/creatarjeta"

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </TarjetasProvider>
  )
}
