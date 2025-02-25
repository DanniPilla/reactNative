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
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function SearchResultScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  const router = useRouter();
  const { cityData, loading, error } = useCityFetch(city);

  const getGradientColors = (description: string | undefined): string[] => {
    if (!description) {
      return ["#4facfe", "#00f2fe"]; // default gradient
    }
    const desc = description.toLowerCase();
    if (desc.includes("clear")) {
      return ["#2980b9", "#6dd5fa"]; // clear sky
    } else if (desc.includes("clouds")) {
      return ["#bdc3c7", "#2c3e50"]; // cloudy
    } else if (desc.includes("rain")) {
      return ["#00c6fb", "#005bea"]; // rainy
    } else if (desc.includes("snow")) {
      return ["#83a4d4", "#b6fbff"]; // snowy
    } else if (desc.includes("thunderstorm")) {
      return ["#0f2027", "#203a43", "#2c5364"]; // stormy
    } else if (desc.includes("mist") || desc.includes("fog")) {
      return ["#606c88", "#3f4c6b"]; // mist/fog
    } else {
      return ["#4facfe", "#00f2fe"]; // default gradient
    }
  };

  const weatherDescription = cityData?.weather?.[0]?.description;
  const gradientColors = getGradientColors(weatherDescription);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {cityData?.main ? (
        <View style={styles.card}>
          <Text style={styles.cityName}>{formattedCity}</Text>

          <View style={styles.temperatureCircle}>
            <Text style={styles.temperature}>
              {(cityData.main.temp - 273.15).toFixed(0)}°
            </Text>
          </View>
          <Text style={styles.description}>
            {weatherDescription || "No description"}
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
          <Text style={styles.noData}>
            No data available for {formattedCity}
          </Text>
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

  temperatureCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  temperature: {
    fontSize: 80,
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
