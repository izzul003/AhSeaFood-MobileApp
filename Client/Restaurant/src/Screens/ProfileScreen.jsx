import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet ,View, Text, Image, TextInput, AsyncStorage, Dimensions, TouchableOpacity} from 'react-native'
import {AuthContext} from '../components/context'
const windowWidth = Dimensions.get("window").width 

export default function ProfileScreen() {
    const [emailUser, setEmailUser] = useState('')
    const {signOut} = useContext(AuthContext)

    useEffect(()=> {
        AsyncStorage.getItem('dataLogin', (error, result)=> {
          if(result){
            const parsedResult = JSON.parse(result)
            setEmailUser(parsedResult.email)
          } else {
            console.log(error)
          }
        })
      }, [])

    const handleSignOut = () => {
        async function clearToken() {
            const response = await AsyncStorage.clear((error)=> {
                if(error){
                    console.log(error, '<===== error')
                  }
            })           
            return response 
        }
        clearToken()
        signOut()
    }
    return (
        <>
        <View style={styles.container}>
            <Image
                source={require('../assets/profile.png')} 
                style={{height: 120, width: 120}}
            ></Image>
            <TextInput value={emailUser} editable={false} style={styles.emailInput}></TextInput>
            <TouchableOpacity style={styles.signOutBtn} onPress={()=> handleSignOut()}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Log Out</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailInput: {
        backgroundColor: '#fbf7f0', 
        color: '#999999', 
        padding: 10, 
        width: windowWidth/2, 
        textAlign: 'center', 
        borderRadius: 20,
        margin: 20
    },
    signOutBtn: {
        backgroundColor: '#feb72b', 
        padding: 15, 
        width: windowWidth/2, 
        textAlign: 'center', 
        borderRadius: 20,
        alignItems: 'center'
    }
})