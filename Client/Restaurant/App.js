import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  CartScreen,
  ProfileScreen
} from "./src/Screens";
import { AsyncStorage, ActivityIndicator, View, Text, Image } from "react-native";
import store from "./src/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "./src/components/context";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeApp({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: 
          ({ tintColor }) => (
            <Image style={{height:30, width:30, tintColor: tintColor}} source={require('./src/assets/home.png')} />
          )
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Cart",
          tabBarIcon: 
          ({ tintColor }) => (
            <Image style={{height:30, width:30, tintColor: tintColor}} source={require('./src/assets/cart.png')} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: 
          ({ tintColor }) => (
            <Image style={{height:30, width:30, tintColor: tintColor}} source={require('./src/assets/profile.png')} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#999999" />
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(
          "dataLogin",
          async (error, result) => {
            if (result) {
              const parsedResult = JSON.parse(result);
              userToken = parsedResult.access_token;
            }
          }
        );
      } catch (error) {
        console.log(error);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  });

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: data });
      },
    }),
    []
  );
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator headerMode="none">
            {state.isLoading ? (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
              ></Stack.Screen>
            ) : state.userToken != null ? (
              <Stack.Screen name="HomeApp" component={HomeApp} />
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}
