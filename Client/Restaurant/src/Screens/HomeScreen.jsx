import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert, AsyncStorage} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getFoods, addCarts} from '../store/actions'
const windowHeight = Dimensions.get("window").height 
const windowWidth = Dimensions.get("window").width 

export default function HomeScreen() {
    const dispatch = useDispatch()
    const foods = useSelector((state)=> state.foods)
    const saldo = useSelector((state)=>state.saldo)
    const [loading, setLoading] = useState(true)
    const [emailUser, setEmailUser] = useState('')
    const [saldoLocal, setSaldoLocal] = useState(0)
    const splittedEmail = emailUser.split('@')
    useEffect( ()=> {
        async function getEmail() {
            const response = await AsyncStorage.getItem('dataLogin', (error, result)=> {
                if(result){
                  const parsedResult = JSON.parse(result)
                  setEmailUser(parsedResult.email)
                } else {
                  console.log(error)
                }
              })   
            return response          
        }

        async function fetch() {
            const response = await dispatch(getFoods())
            return response
        }

        getEmail()
        fetch()
        setLoading(false)
        if(saldo){
            setSaldoLocal(saldo)
        }
    })

    const addToCarts = (data)=> {
        async function addNewCart() {
            const response = await dispatch(addCarts(data)) 
        }
        addNewCart()
        Alert.alert(
            "Sucess!",
            `${data.name} is successfully added to cart`
        )
    }

    if(loading){
        return(
          <View style={styles.container}>
          <ActivityIndicator size="large" color="#999999" />
          <Text style={{color: '#fff'}}>Loading...</Text>
        </View>
        )
    }

    return (
    // <>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerSquare}>
                <View>
                    <Text style={styles.textHeader}>Welcome {splittedEmail[0]}</Text>
                    <Text style={{color: '#968c83', fontWeight: 'bold'}}>Mau makan apa hari ini?</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../assets/avatar.png')} style={{height: 50, width: 50}}></Image>
                    <Text style={{color: '#968c83', fontWeight: 'bold'}}>Saldo : Rp. {saldoLocal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}, -</Text>
                </View>
            </View>
        </View>
        <Text style={{fontWeight: 'bold', color: '#646464', fontSize: 19, marginBottom: 5}}>Menu SeaFood Hari Ini</Text>
        <View style={{marginBottom: 30}}>
            {foods.map((food, idx)=> {
                return (
                    <>
                    <View key={idx}>
                        <Image
                        source={{uri: food.image}}
                        style={styles.image}
                        key={food._id}
                        />
                        <View style={styles.row}>
                            <View style={{flexDirection:'column'}}>
                            <Text style={{fontWeight: 'bold', color: '#646464', fontSize: 16}}>{food.name}</Text>
                            <Text style={{fontWeight: 'bold', color: '#feb72b'}}>Rp.{food.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                            <TouchableOpacity onPress={()=> addToCarts(food)}>
                                <Image source={require('../assets/cart-plus-yellow.png')} style={{height: 36, width: 36}}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </>
                )
            })}
            </View>  
        </View>
        </ScrollView>
    // {/* </> */}
    )
}

const styles = StyleSheet.create({
    header:{
        // flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: (windowHeight-20)/5,
        width: windowWidth-30,
        borderRadius: 10
    },
    headerSquare: {
        backgroundColor: '#fddb3a',
        width: windowWidth -40,
        height: '70%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        elevation: 3
    },
    textHeader: {
        color: '#968c83',
        fontWeight: 'bold',
        fontSize: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        // backgroundColor: '#fff',
        width: windowWidth -30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    scrollView: {
        backgroundColor: '#fff',
        width: windowWidth,
        padding: 20,
        paddingBottom: 500,
        marginLeft: 0
    },
    row: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        marginHorizontal: 20,
        padding: 5,
        width: Dimensions.get("window").width - 85,
    },
    image: {
        width: '100%', 
        height: 200, 
        borderRadius: 10, 
        elevation: 3
    }
})