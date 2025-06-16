import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Alert } from "react-native"
import { usePerfil } from "../context/PerfilContext"
import Navbar from "../components/navbar"

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

// Componente de opción de menú
const MenuOption = ({ title, onPress, iconColor = "#000" }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <Text style={styles.menuOptionText}>{title}</Text>
    <Icon name="→" size={20} color={iconColor} />
  </TouchableOpacity>
)

export default function MiPerfil({ navigation }) {
  const { perfil } = usePerfil()

  // Función para obtener las iniciales del nombre completo
  const getInitials = (nombre, apellidos) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ""
    const lastInitial = apellidos ? apellidos.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleEditarInformacion = () => {
    if (navigation) {
      navigation.navigate("EditarInformacion")
    }
  }

  const handleMetodosPago = () => {
    if (navigation) {
      navigation.navigate("Tarjetas")
    }
  }

  const handleNotificaciones = () => {
    if (navigation) {
      navigation.navigate("Notificaciones")
    }
  }

  const handleSoporte = () => {
    if (navigation) {
      navigation.navigate("Soporte")
    }
  }

  const handleCerrarSesion = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: () => {
          Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente")
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="←" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(perfil.nombre, perfil.apellidos)}</Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {perfil.nombre} {perfil.apellidos}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <MenuOption title="Editar Información" onPress={handleEditarInformacion} />
          <MenuOption title="Métodos de Pago" onPress={handleMetodosPago} />
          <MenuOption title="Notificaciones" onPress={handleNotificaciones} />
          <MenuOption title="Soporte" onPress={handleSoporte} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleCerrarSesion}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
          <Icon name="⏻" size={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>

      {/* New Navbar Component */}
      <Navbar navigation={navigation} activeScreen="MiPerfil" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93d2fd",
  },
  header: {
    backgroundColor: "#257beb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSpacer: {
    width: 40,
  },
  profileSection: {
    backgroundColor: "#257beb",
    alignItems: "center",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#257beb",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for the elevated QR button
  },
  menuContainer: {
    marginBottom: 40,
  },
  menuOption: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#000000",
  },
  menuOptionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  logoutButton: {
    backgroundColor: "#ff4757",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
