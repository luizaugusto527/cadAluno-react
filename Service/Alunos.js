const getAlunos = async () => {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome'
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.dados
    }
    catch (error) {
        console.log(error);


    }
}
export default getAlunos