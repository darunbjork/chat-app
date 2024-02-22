import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const imgBackground = require("../assets/Background Image.png");

const Start = ({ navigation }) => {
  // State for background color and username
  const [background, setBackground] = useState("#090C08");
  const [username, setUsername] = useState("");

  // Firebase authentication
  const auth = getAuth();

  // Function to determine text color based on background color luminance
  const getTextColor = (color) => {
    const hexColor = color.replace(/^#/, '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If the background is light, return black; otherwise, return white
    return luminance > 0.5 ? "black" : "white";
  };

  // Function to sign in the user anonymously
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Navigate to the Chat screen with user details
        navigation.navigate("Chat", {
          name: username,
          color: background,
          id: result.user.uid,
        });
        Alert.alert("Signed in successfully");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, please try again later");
      });
  };

  return (
    <ImageBackground source={imgBackground} style={styles.image}>
      <View style={styles.container}>
        {/* App Title */}
        <Text style={styles.title}>Chatroom App</Text>

        <View style={styles.inputContainer}>
          {/* Username Input */}
          <TextInput
            placeholder="Your Name"
            value={username}
            onChangeText={setUsername}
            style={styles.textInput}
          />

          {/* Choose Background Color Text */}
          <Text style={styles.chooseBgText}>Choose Background Color</Text>

          {/* Color Buttons */}
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

          {/* Start Chatting Button */}
          <TouchableOpacity style={styles.startButton} onPress={signInUser}>
            <Text style={[styles.startButtonText, { color: getTextColor(background) }]}>
              Start Chatting
            </Text>
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
    width: "95%", // Adjust the width percentage as needed
    height: "44%",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 22,
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
