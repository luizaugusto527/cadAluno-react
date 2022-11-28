import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { withTheme } from 'react-native-paper';
import {useState} from 'react'
import Header from './Hearder';

 function Cadastro ({navigation}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  function cadastrar() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError(true)
    }, 1000);
  }
  return (
    <>
      <Header titulo="Editar" voltar={true} navigation={navigation} />
      <View style={styles.container}>
        <Image source={require('../assets/img/graduation.png')} style={styles.img}/>
        <Text style={styles.texto}>Editar</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder={"Digite o nome"} />
          {error ? <Text style={styles.erro}>Erro</Text> : <Text></Text> }
          <TextInput style={styles.input} placeholder={"Digite o cpf"} />
          <TextInput keyboardType='numeric' style={styles.input} placeholder={"Digite a idade"} />
          <TextInput style={styles.input} placeholder={"Curso"} />
          <TextInput style={styles.input} placeholder={"Data Matricula"} />
          
          <TouchableOpacity style={styles.botao} onPress={cadastrar}>
            {loading ? <ActivityIndicator size={30} color="white" /> :
            <Text style={styles.textBtn}>Salvar alteração</Text>}
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
    backgroundColor:"#7b42f5",
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