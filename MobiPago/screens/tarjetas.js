import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { tarjetas } from "../data/dummy-data"

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

// Componente de tarjeta individual
const CardComponent = ({ tarjeta, index }) => {
  // Diferentes gradientes para cada tarjeta
  const cardStyles = [
    {
      backgroundColor: "#ff9a9e", // Gradiente rosa-naranja
      backgroundImage: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    },
    {
      backgroundColor: "#667eea", // Gradiente azul-púrpura
      backgroundImage: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    },
  ]

  const cardStyle = cardStyles[index % cardStyles.length]

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardStyle.backgroundColor }]}>
      {/* Logo de la tarjeta (solo para la segunda tarjeta) */}
      {index === 1 && (
        <View style={styles.cardLogo}>
          <View style={[styles.logoCircle, { backgroundColor: "#ff5f00" }]} />
          <View style={[styles.logoCircle, { backgroundColor: "#eb001b", marginLeft: -8 }]} />
        </View>
      )}

      {/* Nombre de la tarjeta */}
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{tarjeta.nombre}</Text>
      </View>

      {/* Número de tarjeta (últimos 4 dígitos) */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardNumber}>•••• •••• •••• {tarjeta.numero.slice(-4)}</Text>
        <Text style={styles.cardHolder}>{tarjeta.titular}</Text>
        <Text style={styles.cardExpiry}>{tarjeta.fechaCaducidad}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Tarjetas({ navigation }) {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleAddNewCard = () => {
    // Aquí puedes agregar la lógica para agregar una nueva tarjeta
    console.log("Agregar nueva tarjeta")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="←" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Tarjetas</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tarjetas */}
        <View style={styles.cardsContainer}>
          {tarjetas.map((tarjeta, index) => (
            <CardComponent key={index} tarjeta={tarjeta} index={index} />
          ))}
        </View>

        {/* Botón Agregar Nueva Tarjeta */}
        <TouchableOpacity style={styles.addCardButton} onPress={handleAddNewCard}>
          <Text style={styles.addCardText}>Agregar Nueva Tarjeta</Text>
          <Icon name="+" size={24} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate("Home")}>
          <Icon name="🏠" size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="💳" size={24} color="#257beb" />
          <Text style={[styles.navText, styles.activeNavText]}>Mis tarjetas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="👤" size={24} color="#000" />
          <Text style={styles.navText}>Mi Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257beb",
  },
  header: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  card: {
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardLogo: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  cardBottom: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardNumber: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
    opacity: 0.8,
  },
  cardHolder: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 2,
    opacity: 0.7,
  },
  cardExpiry: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.6,
  },
  addCardButton: {
    backgroundColor: "#93d2fd",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addCardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#93d2fd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
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
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
