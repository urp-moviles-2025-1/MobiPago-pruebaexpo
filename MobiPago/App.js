import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"

const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

export default function App() {
  const transactions = [
    {
      id: 1,
      name: "Carlos R. Lucar",
      amount: 5.0,
      date: "12/05/2025 - 11:15 am",
      type: "income",
    },
    {
      id: 2,
      name: "Carlos R. Lucar",
      amount: -15.0,
      date: "12/05/2025 - 10:15 am",
      type: "expense",
    },
    {
      id: 3,
      name: "*** *** 156",
      amount: 20.0,
      date: "12/05/2025 - 10:15 am",
      type: "income",
    },
    {
      id: 4,
      name: "Humberto A. Linarez",
      amount: 100.0,
      date: "12/05/2025 - 10:15 am",
      type: "income",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CR</Text>
            </View>
            <View>
              <Text style={styles.welcomeText}>Bienvenido de vuelta,</Text>
              <Text style={styles.userName}>Carlos R. Lucar</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="🔔" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Movements Section */}
        <View style={styles.movementsCard}>
          <View style={styles.movementsHeader}>
            <Text style={styles.movementsTitle}>Movimientos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction, index) => (
            <View key={transaction.id}>
              <View style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[styles.transactionAmount, transaction.type === "expense" && styles.expenseAmount]}>
                  {transaction.amount < 0 ? "-" : ""}S/ {Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
              {index < transactions.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
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
              <Icon name="🔍" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Transacciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Icon name="📊" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Estadísticas</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <Text style={styles.balanceAmount}>S/.12.000</Text>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.qrButton}>
            <Text style={styles.mainActionText}>Mostrar QR</Text>
            <Icon name="📱" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.mainActionText}>Enviar</Text>
            <Icon name="➤" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="🏠" size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="💳" size={24} color="#000" />
          <Text style={styles.navText}>Mis tarjetas</Text>
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
    padding: 20,
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
  qrButton: {
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
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: "#000000",
    fontWeight: "600",
  },
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
