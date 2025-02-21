import { useLocalSearchParams, useRouter } from "expo-router";
import { useCityFetch } from "@/hooks/useCityFetch";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResultScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const router = useRouter();
  const { cityData, loading, error } = useCityFetch(city);

  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {cityData?.main ? (
        <View style={styles.card}>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.temperature}>
            {(cityData.main.temp - 273.15).toFixed(0)}°C
          </Text>
          <Text style={styles.description}>
            {cityData.weather?.[0]?.description || "No description"}
          </Text>

          {cityData.weather?.[0]?.icon && (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        !loading && (
          <Text style={styles.noData}>No data available for {city}</Text>
        )
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  button: {
    marginTop: 15,
    backgroundColor: "rgba(8, 52, 104, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  noData: {
    color: "#fff",
    fontSize: 16,
  },
});
