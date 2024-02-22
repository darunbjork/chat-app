
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
const imgBackground = require("../assets/Background Image.png");
const Start = ({ navigation }) => {
  const [background, setBackground] = useState();
  const [username, setUsername] = useState();
  return (
    <ImageBackground source={imgBackground} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Chatroom App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Name"
            value={username}
            onChangeText={setUsername}
            style={styles.textInput}
          />
          <Text style={styles.chooseBgText}>Choose Background Color</Text>
          <View style={styles.colorButtonContainer}>
            <TouchableOpacity
              style={[styles.colorButton, styles.colorInput1]}
              onPress={() => {
                setBackground("#090C08");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, styles.colorInput2]}
              onPress={() => {
                setBackground("#474056");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, styles.colorInput3]}
              onPress={() => {
                setBackground("#8A95A5");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, styles.colorInput4]}
              onPress={() => {
                setBackground("#B9C6AE");
              }}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              navigation.navigate("Chat", {
                name: username,
                color: background,
              });
            }}
          >
            <Text style={styles.startButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 15,
    width: "88%",
    height: '44%',  // Add height property
    alignItems: "center",
    marginBottom: 20,
  },

  textInput: {
    width: "100%",
    paddingVertical: 15,  // Adjust vertical padding
    paddingHorizontal: 20,  // Adjust horizontal padding
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.8,
    minHeight: 40,
  },


  chooseBgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginVertical: 10,
    textAlign: "left",
  },
  colorButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorInput1: {
    backgroundColor: "#090C08",
  },
  colorInput2: {
    backgroundColor: "#474056",
  },
  colorInput3: {
    backgroundColor: "#8A95A5",
  },
  colorInput4: {
    backgroundColor: "#B9C6AE",
  },
  startButton: {
    backgroundColor: "#757083",
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default Start;