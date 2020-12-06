import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import {useDispatch} from 'react-redux'
import setIsLoggedIn from '../store/actions'
import {AuthContext} from '../components/context'

export default function LoginScreen({navigation}) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signIn} = useContext(AuthContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(setIsLoggedIn({
            email,
            password
        }))
        await Alert.alert(
            "Sucess!",
            `${email} is successfully logged in`
        )
        signIn()
    }
    return (
        <>
            <View style={styles.container}>
                <Image
                    source={require('../assets/food.png')} 
                    style={{height: 120, width: 120}}
                ></Image>
                <Text style={styles.heading1}>AhSeaFood</Text>
                <TextInput style={styles.input} placeholder="Input your email" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.input} placeholder="Input your password" onChangeText={(text) => setPassword(text)}></TextInput>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} ><Text style={styles.textButton}>Login</Text></TouchableOpacity>
                <Text style={styles.textWhite}>Don't have an account yet?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.textSignUp}>Sign Up</Text></TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fddb3a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading1: {
        fontSize: 36,
        color: '#fff',
        marginBottom: 50,
        fontWeight: 'bold'
    },
    input: {
        textAlign: "center",
        width: 200,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D9D2D2",
        borderRadius: 20,
        padding: 8,
        marginBottom: 20
    },
    button: {
        width:200,
        padding: 12,
        backgroundColor: "#feb72b",
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10
    },
    textButton: {
        color: "#fff",
        fontSize: 16
    },
    textWhite: {
        color: "#fff"
    },
    textSignUp: {
        marginTop: 7,
        fontWeight: 'bold',
        fontSize:16,
        color: '#fff'
    }
  });