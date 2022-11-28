import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'



import { List, withTheme, Avatar } from 'react-native-paper'
import Api from '../resources/Api'

function ListaAluno({ data, navigation, theme }) {
  const { colors } = theme

  async function confirmaExclusaoRegistro() {
    if (Platform.OS === 'web') {
      if (confirm('Deseja mesmo excluir este aluno?') === true) { await excluirAluno(data) }
    } else {
      Alert.alert('Atenção!', 'Deseja mesmo excluir este aluno?', [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await excluirAluno(data)
          },
        },
      ])
    }
  }

  const excluirAluno = async (dadosAluno) => {

    let excluir = await Api.removeAluno(dadosAluno._id)
    if (excluir.hasOwnProperty('errors')) {
      Platform.OS === 'web' ? alert(`‼️Erro: ${excluir.errors[0].msg}`) : Alert.alert("‼️Erro", excluir.errors[0].msg)
    } else if (excluir.hasOwnProperty('acknowledged')) {
      Platform.OS === 'web' ? alert(`✅Tudo OK: Registro excluído com sucesso `) : Alert.alert("✅Tudo OK", 'Registro excluído com sucesso')
      navigation.navigate('Inicio')
    }
  }

  const alteraAluno = async (dadosAluno) => {
    navigation.navigate('Cadastro', { aluno: dadosAluno })
  }

  function botaoLadoDireito() {
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonExcluir}
          onPress={confirmaExclusaoRegistro}
        >
          <Avatar.Icon size={24} icon="delete" style={{ backgroundColor: colors.background }} />
          <Text style={{ color: colors.background }} >Excluir</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={botaoLadoDireito}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => alteraAluno(data)}
      >

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background, borderRadius: 20}}>
          <List.Item
            title={data.nome}
            description={`Curso: ${data.curso}`}
            descriptionStyle={[styles.descricao]}
            right={Platform.OS === 'web' ? botaoLadoDireito : ''}
            left={props => <Avatar.Text label={data.nome.substring(0, 2)} style={{backgroundColor:'#6200ee',display:'flex',marginTop:15, marginLeft:8}} />}
          />

        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    height: 80,
    borderRadius: 8,
    marginBottom: 2,
    marginHorizontal: 8,
    marginVertical:25
  },
  buttonExcluir: {
    backgroundColor: '#d9534f',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  descricao: {
    marginTop:8
  }
})

export default withTheme(ListaAluno)