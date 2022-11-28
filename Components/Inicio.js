import { View, FlatList } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import Header from './Hearder'

function Inicio({navigation}) {

  //Lista de ícones: https://materialdesignicons.com/
  const opcoesMenu = [
    { id: 1, nome: 'Cadastro', descricao: 'Clique aqui para cadastrar um aluno', icone: 'account-plus', menu: 'Cadastro' },
    { id: 2, nome: 'Listar Alunos', descricao: 'Editar ou remover um aluno', icone: 'account-search', menu: 'ListaAlunos' },
    { id: 3, nome: 'Configurações', descricao: 'Configurações do App', icone: 'cog', menu: 'Configuracoes' }
  ]

  return (
      <>
          <Header titulo="CadAluno"/>
          <View style={
              { backgroundColor:"#27282D", paddingHorizontal: 8, paddingVertical: 16, flex: 1 }} >
              <FlatList data={opcoesMenu}
                  renderItem={
                      ({ item }) => (<
                          List.Item title={item.nome}
                          style={
                              { }}
                          titleStyle={
                              { fontSize: 20, color:'white' }}
                          description={item.descricao}
                          descriptionStyle={
                              { marginBottom: 4, color:'white' }}
                          onPress={
                              () => navigation.navigate(item.menu)}
                          left={
                              props => < List.Icon {...props}
                                  icon={item.icone} color={'white'}
                              />} /
                      >
                      )
                  }
                  keyExtractor={item => item.id.toString()}
              />
          </View>
      </>
  )
}

export default withTheme(Inicio)