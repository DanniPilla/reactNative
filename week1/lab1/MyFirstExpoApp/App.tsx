import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  return (
    // Overall page view container
    <View style={styles.container}>
      <Text>Calculator</Text>

      {/* calculator specific container */}
      <View style={styles.calcContainer}>
        <TextInput style={styles.input} placeholder="0"></TextInput>

        <View style={styles.textButton}>
          <Button title="1"></Button>
          <Button title="2"></Button>
          <Button title="3"></Button>
          <Button title="+"></Button>
        </View>
        <View style={styles.textButton}>
          <Button title="4"></Button>
          <Button title="5"></Button>
          <Button title="6"></Button>
          <Button title="-"></Button>
        </View>
        <View style={styles.textButton}>
          <Button title="7"></Button>
          <Button title="8"></Button>
          <Button title="9"></Button>
          <Button title="X"></Button>
        </View>
        <View style={styles.textButton}>
          <Button title="C"></Button>
          <Button title="0"></Button>
          <Button title="="></Button>
          <Button title="/"></Button>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  calcContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "pink",
  },
  input: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "grey",
    textAlign: "right",
    fontSize: 20,
    color: "white",
  },
  textButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderColor: "black",
  },
});
