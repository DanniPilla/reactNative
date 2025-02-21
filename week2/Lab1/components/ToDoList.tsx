import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Task = {
  name: string;
  id: number;
  checked: boolean;
};

export default function ToDoList() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
      <View style={styles.container}>
        <Text>To-Do List</Text>
        <TextInput
          placeholder="Enter a task"
          value={taskName}
          onChangeText={(newText) => {
            setTaskName(newText);
          }}
        />
        <Button
          title="Add Task"
          onPress={() => {
            if (taskName !== "") {
              setTasks([
                ...tasks,
                { name: taskName, id: Date.now(), checked: false },
              ]);
              setTaskName("");
              Toast.show({
                type: "success",
                text1: "Amazing!",
                text2: "You have added a task!",
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter a valid task name!",
              });
            }
          }}
        />
        {tasks.map((task) => (
          <View style={{ flexDirection: "row" }} key={task.id}>
            <Text>{task.name}</Text>
            <TouchableOpacity
              onPress={() => {
                removeTask(task.id);
              }}
            >
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
        <StatusBar style="auto" />
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
