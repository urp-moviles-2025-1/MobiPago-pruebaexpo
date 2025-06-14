import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from "react-native"

// Componente de icono simple
const Icon = ({ name, size = 24, color = "#000" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: "bold" }}>{name}</Text>
  </View>
)

// Componente de información de contacto
const ContactInfo = ({ icon, title, subtitle, onPress, isClickable = false }) => (
  <TouchableOpacity
    style={[styles.contactItem, !isClickable && styles.contactItemDisabled]}
    onPress={isClickable ? onPress : null}
    disabled={!isClickable}
  >
    <View style={styles.contactIcon}>
      <Icon name={icon} size={20} color="#ffffff" />
    </View>
    <View style={styles.contactContent}>
      <Text style={styles.contactTitle}>{title}</Text>
      {subtitle && <Text style={styles.contactSubtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
)

export default function Soporte({ navigation }) {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleWhatsApp = () => {
    const phoneNumber = "999999999" // Número sin espacios para WhatsApp
    const message = "Hola, necesito ayuda con MobiPago"
    const whatsappUrl = `whatsapp://send?phone=+51${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl)
        } else {
          Alert.alert("Error", "WhatsApp no está instalado en este dispositivo")
        }
      })
      .catch((err) => {
        Alert.alert("Error", "No se pudo abrir WhatsApp")
        console.error("Error opening WhatsApp:", err)
      })
  }

  const handlePhoneCall = () => {
    const phoneNumber = "tel:+51015554444"

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneNumber)
        } else {
          Alert.alert("Error", "No se puede realizar la llamada")
        }
      })
      .catch((err) => {
        Alert.alert("Error", "No se pudo realizar la llamada")
        console.error("Error making phone call:", err)
      })
  }

  const handleEmail = () => {
    const email = "mailto:movipago@movipago.com?subject=Consulta MobiPago&body=Hola, necesito ayuda con:"

    Linking.canOpenURL(email)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(email)
        } else {
          Alert.alert("Error", "No se puede abrir el cliente de correo")
        }
      })
      .catch((err) => {
        Alert.alert("Error", "No se pudo abrir el correo")
        console.error("Error opening email:", err)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="←" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Soporte</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Card */}
        <View style={styles.contactCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Icon name="⚙️" size={32} color="#ffffff" />
            </View>
            <Text style={styles.cardTitle}>Contactate con nosotros</Text>
          </View>

          <View style={styles.contactList}>
            {/* WhatsApp */}
            <ContactInfo icon="📱" title="WhatsApp 999 999 999" isClickable={true} onPress={handleWhatsApp} />

            {/* Teléfono fijo */}
            <ContactInfo icon="📞" title="Teléfono fijo (01) 555 4444" isClickable={true} onPress={handlePhoneCall} />

            {/* Email */}
            <ContactInfo
              icon="📧"
              title="E-mail:"
              subtitle="movipago@movipago.com"
              isClickable={true}
              onPress={handleEmail}
            />

            {/* Horario de atención */}
            <View style={styles.scheduleContainer}>
              <Text style={styles.scheduleText}>Horario de atención 9:00am a 9:00pm</Text>
            </View>
          </View>
        </View>

        {/* Additional Support Options */}
        <View style={styles.additionalSupport}>
          <Text style={styles.additionalTitle}>Otras formas de obtener ayuda</Text>

          <TouchableOpacity style={styles.supportOption}>
            <Icon name="❓" size={24} color="#257beb" />
            <Text style={styles.supportOptionText}>Preguntas Frecuentes</Text>
            <Icon name="→" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <Icon name="📖" size={24} color="#257beb" />
            <Text style={styles.supportOptionText}>Guía de Usuario</Text>
            <Icon name="→" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <Icon name="🛡️" size={24} color="#257beb" />
            <Text style={styles.supportOptionText}>Reportar Problema</Text>
            <Icon name="→" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    paddingTop: 20,
  },
  contactCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1e1e2d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  contactList: {
    gap: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  contactItemDisabled: {
    opacity: 1,
  },
  contactIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#257beb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  scheduleContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  scheduleText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
  additionalSupport: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  additionalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  supportOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  supportOptionText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 15,
    flex: 1,
  },
  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
})