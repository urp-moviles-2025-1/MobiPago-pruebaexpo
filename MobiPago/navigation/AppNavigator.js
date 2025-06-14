import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import App from "../App"
import Statistics from "../screens/statistics"
import Tarjetas from "../screens/tarjetas"

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Ocultar header por defecto ya que usamos headers personalizados
        }}
      >
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="Tarjetas" component={Tarjetas} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
