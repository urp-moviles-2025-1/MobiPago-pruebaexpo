import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

export default function Navbar({ navigation, activeScreen = "Home" }) {
  const handleNavigateToHome = () => {
    if (navigation && activeScreen !== "Home") {
      navigation.navigate("Home")
    }
  }

  const handleNavigateToTarjetas = () => {
    if (navigation && activeScreen !== "Tarjetas") {
      navigation.navigate("Tarjetas")
    }
  }

  const handleNavigateToStatistics = () => {
    if (navigation && activeScreen !== "Statistics") {
      navigation.navigate("Statistics")
    }
  }

  const handleNavigateToMiPerfil = () => {
    if (navigation && activeScreen !== "MiPerfil") {
      navigation.navigate("MiPerfil")
    }
  }

  const handleQRAction = () => {
    // Aquí puedes agregar la funcionalidad del QR
    console.log("QR button pressed")
    // Por ejemplo: navigation.navigate("QRScanner")
  }

  return (
    <View style={styles.navbarContainer}>
      {/* QR Button - Positioned above the navbar */}
      <TouchableOpacity style={styles.qrButton} onPress={handleQRAction}>
        <Icon name="⚏" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeScreen === "Home" && styles.activeNavItem]}
          onPress={handleNavigateToHome}
        >
          <Icon name="🏠" size={24} color={activeScreen === "Home" ? "#257beb" : "#000"} />
          <Text style={[styles.navText, activeScreen === "Home" && styles.activeNavText]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeScreen === "Tarjetas" && styles.activeNavItem]}
          onPress={handleNavigateToTarjetas}
        >
          <Icon name="💳" size={24} color={activeScreen === "Tarjetas" ? "#257beb" : "#000"} />
          <Text style={[styles.navText, activeScreen === "Tarjetas" && styles.activeNavText]}>Mis tarjetas</Text>
        </TouchableOpacity>

        {/* Spacer for QR button */}
        <View style={styles.qrSpacer} />

        <TouchableOpacity
          style={[styles.navItem, activeScreen === "Statistics" && styles.activeNavItem]}
          onPress={handleNavigateToStatistics}
        >
          <Icon name="📊" size={24} color={activeScreen === "Statistics" ? "#257beb" : "#000"} />
          <Text style={[styles.navText, activeScreen === "Statistics" && styles.activeNavText]}>Estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeScreen === "MiPerfil" && styles.activeNavItem]}
          onPress={handleNavigateToMiPerfil}
        >
          <Icon name="👤" size={24} color={activeScreen === "MiPerfil" ? "#257beb" : "#000"} />
          <Text style={[styles.navText, activeScreen === "MiPerfil" && styles.activeNavText]}>Mi Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "relative",
  },
  qrButton: {
    position: "absolute",
    top: -30,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#257beb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1000,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#93d2fd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  activeNavItem: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: "#000000",
    fontWeight: "600",
  },
  activeNavText: {
    color: "#257beb",
    fontWeight: "bold",
  },
  qrSpacer: {
    width: 60,
    height: 1,
  },
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
