import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { usePerfil } from "../context/PerfilContext"
import Navbar from "../components/navbar"

const { width } = Dimensions.get("window")

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

// Componente de gráfico simple
const SimpleChart = () => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  const chartWidth = width - 80
  const chartHeight = 200

  // Datos simulados para el gráfico (valores entre 0 y 1 para normalizar)
  const dataPoints = [0.3, 0.6, 0.2, 0.8, 0.4, 0.9]

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {/* Líneas verticales del grid */}
        {months.map((_, index) => (
          <View key={index} style={[styles.gridLine, { left: (index * chartWidth) / (months.length - 1) }]} />
        ))}

        {/* Línea del gráfico */}
        <View style={styles.chartLine}>
          {dataPoints.map((point, index) => {
            const x = (index * chartWidth) / (dataPoints.length - 1)
            const y = chartHeight - point * chartHeight * 0.8 - 20

            return (
              <View
                key={index}
                style={[
                  styles.dataPoint,
                  {
                    left: x - 6,
                    top: y - 6,
                    backgroundColor: index === 3 ? "#ffffff" : "transparent",
                    borderColor: index === 3 ? "#ffffff" : "transparent",
                    borderWidth: index === 3 ? 3 : 0,
                  },
                ]}
              />
            )
          })}
        </View>
      </View>

      {/* Etiquetas de meses */}
      <View style={styles.monthLabels}>
        {months.map((month, index) => (
          <Text key={month} style={[styles.monthLabel, index === 3 && styles.selectedMonthLabel]}>
            {month}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default function Statistics({ navigation }) {
  const { perfil } = usePerfil()

  // Función para formatear el monto
  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount)
    return amount < 0 ? `-S/ ${absAmount.toFixed(2)}` : `S/ ${absAmount.toFixed(2)}`
  }

  // Función para formatear el balance
  const formatBalance = (balance) => {
    return `S/. ${balance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`
  }

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="←" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estadísticas</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceAmount}>{formatBalance(perfil.balance)}</Text>
        </View>

        {/* Chart Section */}
        <SimpleChart />

        {/* Movements Section */}
        <View style={styles.movementsCard}>
          <View style={styles.movementsHeader}>
            <Text style={styles.movementsTitle}>Movimientos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {perfil.transacciones && perfil.transacciones.length > 0 ? (
            perfil.transacciones.map((transaccion, index) => (
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
                {index < perfil.transacciones.length - 1 && <View style={styles.separator} />}
              </View>
            ))
          ) : (
            <View style={styles.noTransactions}>
              <Text style={styles.noTransactionsText}>No hay transacciones recientes</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* New Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Statistics" />
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
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for the elevated QR button
  },
  balanceSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  balanceLabel: {
    fontSize: 18,
    color: "#93d2fd",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  chartContainer: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  chart: {
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  gridLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    top: 0,
  },
  chartLine: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  monthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  monthLabel: {
    fontSize: 16,
    color: "#93d2fd",
    fontWeight: "500",
  },
  selectedMonthLabel: {
    backgroundColor: "#93d2fd",
    color: "#257beb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontWeight: "bold",
  },
  movementsCard: {
    backgroundColor: "#93d2fd",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 20,
    minHeight: 400,
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
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})
