import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Toast from "react-native-toast-message";
import ToDoList from "../components/ToDoList";
import { NativeRouter } from "expo-router";

export default function App() {
  return (
    <>
      <NativeRouter>
        <ToDoList />
      </NativeRouter>
      <Toast />
    </>
  );
}
