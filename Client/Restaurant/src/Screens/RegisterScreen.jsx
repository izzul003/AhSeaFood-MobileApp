import React, {useState} from 'react'
import {Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import {useDispatch} from 'react-redux'
import {register} from '../store/actions' 
import { StackActions } from '@react-navigation/native';

export default function RegisterScreen({navigation}) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const pushAction = StackActions.push('Login');
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(register({email,password}))
        await Alert.alert(
            "Sucess!",
            `${email} is successfully registered`
        )
        navigation.dispatch(pushAction)
    }

    return (
    <>
        <View style={styles.container}>
            <Text style={styles.heading1}>AhSeaFood</Text>
            <Text style={{color: '#FFF', fontWeight: 'bold', marginBottom: 40}}>Register Now!</Text>
            <Text style={{color: '#FFF'}}>Email</Text>
            <TextInput style={styles.input} placeholder="Input your email" onChangeText={(text) => setEmail(text)}></TextInput>
            <Text style={{color: '#FFF'}}>Password</Text>
            <TextInput style={styles.input} placeholder="Input your password" onChangeText={(text) => setPassword(text)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} ><Text style={styles.textButton}>Register</Text></TouchableOpacity>
            <Text style={styles.textWhite}>Have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.pop()}><Text style={styles.textSignIn}>Back To Login</Text></TouchableOpacity>
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
        marginBottom: 10
    },
    button: {
        marginTop: 10,
        width:200,
        padding: 12,
        backgroundColor: "#feb72b",
        borderRadius: 30,
        alignItems: 'center'
    },
    textButton: {
        color: "#fff",
        fontSize: 16
    },
    textSignIn: {
        marginTop: 7,
        fontWeight: 'bold',
        fontSize:16,
        color: '#fff'
    },
    textWhite: {
        color: "#fff",
        marginTop: 10
    },
});