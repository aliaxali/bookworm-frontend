
import styles from "../../assets/styles/login.styles"
import { View, Image,Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import {useState} from "react"
import {Ionicons} from "@expo/vector-icons"
import COLORS from "../../constants/colors"
import { Link } from "expo-router"
import {useAuthStore} from "../../store/authStore"
import { Alert } from "react-native"

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const {isLoading,login,isCheckingAuth}=useAuthStore()

  const handleLogin =async ()=>{
    const result=await login(email,password);
    if(!result.success) Alert.alert("Error",result.error)
  };

    if(isCheckingAuth) return null


  return (
  <KeyboardAvoidingView
      style={{flex:1}}
      behavior={Platform.OS=="ios" ? "padding" : "height"}
  > 
  <View style={styles.container}>
      {/*illustartion */}
      <View style={styles.topIllustration}>
        <Image
            source={require("../../assets/images/i.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
               />
               <TextInput
                  style={styles.input}
                  placeholder="Enter your Email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"    
               />

            </View>
          </View>
          {/* password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              {/* left icon */}
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              {/* Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              {/* view password button */}
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
              <Ionicons
                name={showPassword ? "eye-outline" :"eye-off-outline"}
                size={20}
                color={COLORS.primary}
              />
              </TouchableOpacity>
            </View>
          </View>
          {/* login Button */}
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}
          disabled={isLoading}>{isLoading?(
                <ActivityIndicator color="#fff"/>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}</TouchableOpacity>

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild> 
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>    
  </View>
  </KeyboardAvoidingView>
  )
}