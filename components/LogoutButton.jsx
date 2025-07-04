import { View, Text,TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore'
import styles from '../assets/styles/profile.styles'

export default function LogoutButton() {
    const {logout}=useAuthStore()

    const confirmLogout=() =>{
        Alert.alert("Logout","Are you sure you want to logout?",[
            {text:"Cancel",style:"cancel"},
            {text:"Logout",onPress:() => logout(),style:"destructive"}
        ])
    }
  return (
    <View>
      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}