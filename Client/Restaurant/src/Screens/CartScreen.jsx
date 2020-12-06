import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StyleSheet ,View, Text, ActivityIndicator, Dimensions, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import {getCarts, updateCart, setSaldo} from '../store/actions'
const windowHeight = Dimensions.get("window").height 
const windowWidth = Dimensions.get("window").width 

export default function CartScreen() {
    const dispatch = useDispatch()
    const carts = useSelector((state)=> state.carts)
    const saldo = useSelector((state)=> state.saldo)
    const [cartsLocal, setCartsLocal] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState(false)
    const [showProcess, setShowProcess] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(()=> {
        async function fetch() {
            const response = await dispatch(getCarts())
            return response
        }
        fetch()
        setLoading(false)
    }, [dispatch])

    useEffect(()=> {
        const filtered = carts.filter(cart => {
            return cart.status == false
        })
        let currentTotal = 0
        filtered.map(cart => {
            console.log(+cart.price*+cart.quantity, 'cek')
            currentTotal += +cart.price*+cart.quantity
        })
        // console.log(currentTotal)
        setTotal(currentTotal)
        setCartsLocal(filtered)
        setShowProcess(true)
    }, [carts])

    const updatePlus = (cart) => {
        const id = cart._id
        const plusOne = +cart.quantity + 1
        let currentTotal = total
        currentTotal += +cart.price
        const data = {
            FoodId: cart.FoodId,
            name: cart.name,
            description: cart.description,
            image: cart.image,
            price: cart.price,
            rate: cart.rate,
            quantity: plusOne,
            status: cart.status
        }
        let filtered
        let index
        cartsLocal.map((fav, idx) => {
        if(fav._id == id){
            filtered = {...fav, quantity: plusOne}
            index = idx
        }
        })
        console.log(filtered, '<=====filtered')
        const clone = cartsLocal
        clone[index] = filtered
        console.log(clone, '<=====clone')
        setTotal(currentTotal)
        setCartsLocal(clone)
        dispatch(updateCart(id, data))
    }

    const updateMinus = (cart) => {
        const id = cart._id
        const MinusOne = +cart.quantity - 1
        let currentTotal = total
        currentTotal -= +cart.price
        const data = {
            FoodId: cart.FoodId,
            name: cart.name,
            description: cart.description,
            image: cart.image,
            price: cart.price,
            rate: cart.rate,
            quantity: MinusOne,
            status: cart.status
        }
        let filtered
        let index
        cartsLocal.map((fav, idx) => {
        if(fav._id == id){
            filtered = {...fav, quantity: MinusOne}
            index = idx
        }
        })
        console.log(filtered, '<=====filtered')
        const clone = cartsLocal
        clone[index] = filtered
        console.log(clone, '<=====clone')
        setTotal(currentTotal)
        setCartsLocal(clone)
        dispatch(updateCart(id, data))
    }

    const handleCheckout = ()=> {
        let currentSaldo = saldo
        cartsLocal.map(cart=> {
            if (cart.status === false) {
                const id = cart._id
                const updateStatus = true
                const data = {
                    FoodId: cart.FoodId,
                    name: cart.name,
                    description: cart.description,
                    image: cart.image,
                    price: cart.price,
                    rate: cart.rate,
                    quantity: cart.quantity,
                    status: updateStatus
                }
                dispatch(updateCart(id, data))
                currentSaldo -= +cart.price*+cart.quantity
            }
        })
        setCartsLocal([])
        setTotal(0)
        dispatch(setSaldo(currentSaldo))
        setShowProcess(false)
        Alert.alert(
            "Sucess!",
            `Your order is successfully paid, Thank you was ordering in here`
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
        <>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        {cartsLocal.length > 0 ? 
        <>
        <Text style={{fontWeight: 'bold', color: '#646464', fontSize: 19, marginBottom: 20}}>Selesaikan Order Kamu Sekarang!</Text> 
        <View style={{marginBottom: 30}}>
            {cartsLocal.map((cart, idx)=> {
                return (
                    <> 
                    <View key={idx} style={{width:windowWidth - 80}}>
                        <Image
                        source={{uri: cart.image}}
                        style={styles.image}
                        key={cart._id}
                        />
                        <View style={{flexDirection:'column', margin: 5}}>
                            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>{cart.name}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>    
                                <View>
                                    <Text style={styles.textDetail}>Rate : {cart.rate}/10</Text>
                                    <Text style={styles.textDetail}>Harga : Rp.{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                </View>
                                <View>
                                <Text style={styles.textDetail}>Jumlah : {cart.quantity} pcs</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {
                                        cart.quantity > 1 ? 
                                        <TouchableOpacity onPress={()=> updateMinus(cart)} >
                                        <Image source={require('../assets/minus.png')} style={{height: 25, width: 25}}></Image> 
                                        </TouchableOpacity> :
                                        <Text></Text>
                                    }
                                    <Text style={[{marginHorizontal: 10}, styles.textDetail]}>{cart.quantity}</Text>
                                    <TouchableOpacity onPress={()=> updatePlus(cart)}>
                                        <Image source={require('../assets/plus.png')} style={{height: 25, width: 25}}></Image> 
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>
                        <TouchableOpacity onPress={()=> setShowDetail(true)}><Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>Detail</Text></TouchableOpacity>
                        {
                            showDetail? <>
                            <Text style={styles.textDetail}>{cart.description}</Text> 
                            <TouchableOpacity onPress={()=> setShowDetail(false)}><Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>Tutup</Text></TouchableOpacity>
                            </>: <Text></Text>
                        } 
                        </View>
                    </View>
                    </>
                )
            })}
            </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 2, borderTopColor: '#646464', width: windowWidth-80, marginBottom: 30}}>
                    <Text style={{fontWeight: 'bold'}}>Total</Text>
                    <Text style={{fontWeight: 'bold'}}>Rp. {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
                <TouchableOpacity onPress={()=> handleCheckout()} style={styles.payButton}>
                <Image
                source={require('../assets/money.png')}
                style={{height:25, width: 25}}
                />
                <Text style={{color: '#fff', margin: 7, fontWeight: 'bold'}}>Bayar Sekarang</Text>
                </TouchableOpacity>
            </>
            : 
            <View style={styles.container}>
                <Image source={{uri: 'https://madubatuk.com/wp-content/uploads/2020/07/Pesan-Sekarang.gif'}} style={{height: 50, width: windowWidth/2}}></Image>
                <Text style={{fontWeight: 'bold', color: '#646464', fontSize: 24}}>Belum Ada Pesanan</Text> 
                <Text style={{fontWeight: 'bold', color: '#646464', fontSize: 14}}>Pilih menu kesukaanmu sekarang !</Text> 
            </View>
        }
        </View> 
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 100
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
    },
    textDetail: {
        fontWeight: 'bold', 
        color: '#646464'
    },
    payButton: {
        backgroundColor: '#feb72b', 
        width: 200,
        height: 50, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 20
    }
})