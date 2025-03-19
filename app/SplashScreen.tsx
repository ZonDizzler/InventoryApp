import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";

const SplashScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  const translateY = useRef(new Animated.Value(300)).current; // Start below the screen
  const scale = useRef(new Animated.Value(0.5)).current; // Start small
  const opacity = useRef(new Animated.Value(0)).current; // Initially hidden
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initial bounce-in animation
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0, 
        bounciness: 20,
        speed: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        bounciness: 15,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, 
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -500, 
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0, 
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsVisible(false);
          onAnimationFinish(); // Transition to main app
        });
      }, 1500);
    });
  }, []);

  if (!isVisible) return null; // Hide after animation

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Logo3.png")}
        style={[
          styles.logo,
          {
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default SplashScreen;
