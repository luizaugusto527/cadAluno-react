import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import { withTheme } from 'react-native-paper';
import {useState} from 'react'
import Header from './Hearder';
import Api from '../resources/Api';

 function Cadastro ({navigation,route}) {
  const registroInicial = route.params ? route.params.aluno
  : {nome: '',cpf: '',idade: '',curso: '',data_matricula: ''}
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [aluno, setAluno] = useState(registroInicial)
  const [salvando, setSalvando] = useState(false)

  const salvarAluno = async(dadosAluno) => {
    setSalvando(true)  
    let salvar = dadosAluno.hasOwnProperty('_id')
                 ? await Api.alteraAluno(dadosAluno)   
                 : await Api.incluiAluno(dadosAluno)
    if(salvar.hasOwnProperty('errors')){
        Platform.OS === 'web' ? alert(`❗Erro: ${salvar.errors[0].msg}`)
                              : Alert.alert("❗Erro",salvar.errors[0].msg)
                              setSalvando(false)
    } else if (salvar.hasOwnProperty('acknowledged')){
       Platform.OS === 'web' ? alert(`✅Tudo Ok: Registro salvo com sucesso`)
                             : Alert.alert("✅Tudo Ok","Registro salvo com sucesso")
                             setSalvando(false)
                             navigation.navigate('Inicio')                       
    }             
    
  }
  return (
    <>
      <Header titulo="Cadastro" voltar={true} navigation={navigation} />
      <View style={styles.container}>
        <Image source={require('../assets/img/graduation.png')} style={styles.img}/>
        <Text style={styles.texto}>CadAluno</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} 
          placeholder={"Digite o nome"}
          value={aluno.nome}
          onChangeText={(text)=> setAluno({...aluno, nome:text})} />
          {error ? <Text style={styles.erro}>Erro</Text> : <Text></Text> }
          <TextInput
           style={styles.input}
            placeholder={"Digite o cpf"}
            value={aluno.cpf}
            onChangeText={(text)=> setAluno({...aluno, cpf:text})} />

          <TextInput 
          keyboardType='numeric'
           style={styles.input}
            placeholder={"Digite a idade"} 
            value={aluno.idade}
            onChangeText={(text)=> setAluno({...aluno, idade:text})}/>
          <TextInput
           style={styles.input}
            placeholder={"Curso"}
            value={aluno.curso}
            onChangeText={(text)=> setAluno({...aluno, curso:text})} />

          <TextInput 
          style={styles.input} 
          placeholder={"Data Matricula"}
          value={aluno.data_matricula}
          onChangeText={(text)=> setAluno({...aluno, data_matricula:text})} />
          
          <TouchableOpacity style={styles.botao} onPress={() => salvarAluno(aluno)}>
            {loading ? <ActivityIndicator size={30} color="white" /> :
            <Text style={styles.textBtn}>Cadastrar</Text>}
          </TouchableOpacity>
        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27282D',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:20
  },
  img:{
    marginTop:30,
    width:80,
    height:80
  },
  texto:{
    color:'white',
    fontSize:21
  },
  form:{
    width:"100%",
    marginTop:48
  },
  input:{
    width:"100%",
    borderWidth:1,
    borderColor:"white",
    borderRadius:20,
    height:40,
    backgroundColor:"white",
    padding:10,
    outlineStyle: 'none',
    marginBottom:16
    
  },
  botao:{
    width:"100%",
    height:40,
    backgroundColor:"#6200ee",
    borderRadius:20,
    display:"flex",
    justifyContent:'center',
    alignItems:"center",
    marginTop:4
  },
  textBtn:{
    color:"white",
    fontSize:17
  },
  erro:{
    color:'red',
    position:'relative',
    bottom:12,
    marginHorizontal:10
  }
  
});

export default withTheme(Cadastro)