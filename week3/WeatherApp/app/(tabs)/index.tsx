import { Image, StyleSheet, TextInput, Text, Button, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [citySearch, setCitySearch] = useState("");
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (!citySearch.trim()) return;
    router.push(`/searchResult?city=${citySearch}`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.headerContainer}>
          {/* Background Image */}
          <Image
            source={{
              uri: "https://media.wired.com/photos/65e83b818d5140963a083095/master/w_1600%2Cc_limit/weather.jpg",
            }}
            style={styles.backgroundImage}
          />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        <Text>Let's check the weather!</Text>

        <TextInput
          placeholder="Search a City"
          style={styles.input}
          placeholderTextColor="white"
          value={citySearch}
          onChangeText={setCitySearch}
        />

        <Button
          title="Search"
          onPress={handleSearchSubmit}
          disabled={!citySearch.trim()}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    width: "100%",
    height: 250, // Adjust based on your UI needs
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  reactLogo: {
    height: 120,
    width: 200,
    resizeMode: "contain",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 20,
  },
  input: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#4C4C4C",
    color: "white",
    padding: 10,
    marginVertical: 10,
  },
});
