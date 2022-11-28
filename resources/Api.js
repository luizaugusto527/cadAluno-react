
const BASE_API = 'http://localhost:9002/api'

export default {
    getAlunos: async () => {
        const req = await fetch(`${BASE_API}/alunos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    },
    getAluno: async (id) => {
        const req = await fetch(`${BASE_API}/prestadores/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    },
    incluiAluno: async (dadosAluno) => {
        console.log(dadosAluno)
        const req = await fetch(`${BASE_API}/alunos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAluno)
        })
        const json = await req.json()
        return json
    },
    alteraAluno: async (dadosAluno) => {
        const req = await fetch(`${BASE_API}/alunos`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAluno)
        })
        const json = await req.json()
        return json
    },
    removeAluno: async (idAluno) => {
        const req = await fetch(`${BASE_API}/alunos/${idAluno}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        return json
    }

}