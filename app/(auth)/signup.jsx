import { View, Text ,KeyboardAvoidingView,Platform, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import React from 'react'
import styles from "../../assets/styles/signup.styles"
import COLORS from '../../constants/colors'
import {Ionicons} from "@expo/vector-icons"
import {useState} from "react"
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'
import { useAuthStore } from '../../store/authStore'

export default function Signup() {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
  
    const {user,isLoading, register,token}=useAuthStore()
    
    
    const router=useRouter()

    const handleSignUp=async () =>{
      const result=await register(username,email,password);

      if(!result.success) Alert.alert("Error",result.error);
      
      
      
    };
  return (
    <KeyboardAvoidingView
          style={{flex:1}}
          behavior={Platform.OS=="ios" ? "padding" : "height"}
    >  
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bookworm🐛</Text>
          <Text style={styles.subtitle}>Share your favourite reads</Text>
        </View>

       <View style={styles.formContainer}>
        {/* username */}
        <View style={styles.inputGroup} >
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
             <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
             />
             <TextInput
              style={styles.input}
              placeholder="johndoe"
              placeholderTextColor={COLORS.placeholderText}
              value={username}
              onChangeText={setUsername}
              autoCapitalize='none'
             />
          </View>
        </View>
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
          {/* SignUP Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>  
              {isLoading? (
                <ActivityIndicator color="#fff"/>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
          </TouchableOpacity>

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() =>router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
          </View>
       </View>
      </View> 
    </View>
    </KeyboardAvoidingView>
  )
}