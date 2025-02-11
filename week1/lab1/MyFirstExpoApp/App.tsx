import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const myButtons = [
    [7, 8, 9, "+"],
    [4, 5, 6, "-"],
    [1, 2, 3, "x"],
  ];

  const [calculatorValue, setCalculatorValue] = useState(0);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="100"
        style={styles.input}
        placeholderTextColor="white"
        value={calculatorValue.toString()}
      />
      {myButtons.map((row: (number | string)[]) => (
        <View style={styles.row}>
          {row.map((buttonNumber: number | string) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCalculatorValue(calculatorValue + buttonNumber);
              }}
            >
              <Text style={styles.buttonText}>{buttonNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity style={{ ...styles.button, ...styles.bigButton }}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCalculatorValue(0);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    textAlign: "right",
    fontSize: 28,
    backgroundColor: "#4C4C4C",
    color: "white",
    height: "20%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "20%",
  },
  button: {
    backgroundColor: "#D6D6D6",
    flexGrow: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#75737345",
  },
  bigButton: {
    flexGrow: 100,
    maxWidth: "66.6666666%",
  },
  buttonText: {
    fontSize: 28,
    textAlign: "center",
  },
});
