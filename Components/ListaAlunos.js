import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native'
import { Text, withTheme, List, FAB, ActivityIndicator, IconButton, Avatar } from 'react-native-paper'
import Header from './Hearder'
import ListaAluno from './ListaAluno'
import Api from '../resources/Api'

function listaAlunos({ navigation, theme }) {
    const [alunos, setAlunos] = useState([])
    const [carregando, setCarregando] = useState(false)
    const { colors } = theme
    
    useEffect(()=> {
            getAlunos()
    }, [])

    const getAlunos = async() => {
        setCarregando(true)
        let retorno = await Api.getAlunos()
        retorno.ok === 0 ? Alert.alert('Erro!', 'Não foi possível obter a lista!') :
            setAlunos(retorno)
            
        setCarregando(false)
    }
 
    return ( 
        <>
    <View style={{backgroundColor: "#27282D", flex: 1}}>
        <Header titulo="Alunos" 
                voltar={true} navigation={navigation}
        />
        {carregando && 
    <ActivityIndicator animating={true} size="large" color="white" style={{flex:1, justifyContent:"center", alignItems:"center"}} />}
        {alunos.length === 0 && !carregando
        ? (
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 20, color:'white'}}>
                Ainda não há nenhum aluno cadastrado.
                </Text>
            </View>    
        )
        : (
            <FlatList
            data={alunos}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
                <ListaAluno data={item} navigation={navigation} />
            )}
          /> 
        )
        }
        <FAB
            style={styles.fab}
            icon='plus'
            label=''
            onPress={()=> navigation.navigate('Cadastro')}
        />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    /*fab - float action button  */
    fab: {
         position: 'absolute',
         margin: 16,
         right: 4, 
         bottom: 8,
         backgroundColor:'#6200ee'
    }
})

export default withTheme(listaAlunos)