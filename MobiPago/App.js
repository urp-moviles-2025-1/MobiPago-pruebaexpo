import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import { usePerfil } from "./context/PerfilContext"
import Navbar from "./components/navbar"

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

export default function App({ navigation }) {
  const { perfil } = usePerfil()

  // Función para formatear el monto con el signo correcto
  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount)
    return amount < 0 ? `-S/ ${absAmount.toFixed(2)}` : `S/ ${absAmount.toFixed(2)}`
  }

  // Función para obtener las iniciales del nombre completo
  const getInitials = (nombre, apellidos) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ""
    const lastInitial = apellidos ? apellidos.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  // Función para formatear el balance
  const formatBalance = (balance) => {
    return `S/.${balance.toLocaleString("es-PE", { minimumFractionDigits: 3 })}`
  }

  // Función para navegar a notificaciones
  const handleNavigateToNotifications = () => {
    if (navigation) {
      navigation.navigate("Notificaciones")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(perfil.nombre, perfil.apellidos)}</Text>
            </View>
            <View>
              <Text style={styles.welcomeText}>Bienvenido de vuelta,</Text>
              <Text style={styles.userName}>
                {perfil.nombre} {perfil.apellidos}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNavigateToNotifications}>
            <Icon name="🔔" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Movements Section */}
        <View style={styles.movementsCard}>
          <View style={styles.movementsHeader}>
            <Text style={styles.movementsTitle}>Movimientos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {perfil.transacciones && perfil.transacciones.length > 0 ? (
            perfil.transacciones.slice(0, 4).map((transaccion, index) => (
              <View key={transaccion.id || index}>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>
                      {transaccion.destinatario || transaccion.remitente || "Transacción"}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaccion.fecha || new Date().toLocaleDateString("es-PE")} -{" "}
                      {transaccion.hora ||
                        new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}{" "}
                      am
                    </Text>
                  </View>
                  <Text style={[styles.transactionAmount, transaccion.monto < 0 && styles.expenseAmount]}>
                    {formatAmount(transaccion.monto)}
                  </Text>
                </View>
                {index < Math.min(perfil.transacciones.length, 4) - 1 && <View style={styles.separator} />}
              </View>
            ))
          ) : (
            <View style={styles.noTransactions}>
              <Text style={styles.noTransactionsText}>No hay transacciones recientes</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="⚙️" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Ajustes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="🔧" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="🔍" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Transacciones</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <Text style={styles.balanceAmount}>{formatBalance(perfil.balance)}</Text>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.mainActionText}>Escanear</Text>
            <Icon name="📷" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.mainActionText}>Enviar</Text>
            <Icon name="➤" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* New Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Home" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    backgroundColor: "#257beb",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#93d2fd",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#257beb",
  },
  welcomeText: {
    color: "#93d2fd",
    fontSize: 16,
  },
  userName: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationButton: {
    backgroundColor: "#93d2fd",
    padding: 12,
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra padding for the elevated QR button
  },
  movementsCard: {
    backgroundColor: "#93d2fd",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  movementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  movementsTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#257beb",
    fontSize: 16,
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 4,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  expenseAmount: {
    color: "#ff0000",
  },
  noTransactions: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noTransactionsText: {
    color: "#666",
    fontSize: 16,
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#93d2fd",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonIcon: {
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  balanceCard: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    color: "#93d2fd",
    fontSize: 18,
    marginBottom: 5,
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  mainActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  mainActionText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
