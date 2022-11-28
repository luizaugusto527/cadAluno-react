import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Cadastro from '../Components/Cadastro'
import Inicio from '../Components/Inicio'
import ListaAlunos from '../Components/ListaAlunos'

export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CadAluno" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Cadastro" component={Cadastro} />   
                <Stack.Screen name="ListaAlunos" component={ListaAlunos} />   
            </Stack.Navigator>
        </NavigationContainer>
    )
}