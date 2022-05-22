

const preencherForm = (endereco) => {
    limparCampos()
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
    document.getElementById('numero').focus()
}

const limparCampos = () => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = '' 
    document.getElementById('numero').value = '' 

}

const cepValido = (cep) => ((cep.length === 8) && (/^[0-9]+$/.test(cep)))

const pesquisarCep = async() => {

    const cep = document.getElementById('cep').value

    if (cepValido(cep)) {
        
        const url = `http://viacep.com.br/ws/${cep}/json/`

        const dados = await fetch(url)
        const endereco = await dados.json()

        
        if (endereco.hasOwnProperty('erro')) {
            alert(`O ${cep} não é um CEP válido!`)
            limparCampos()
            console.log(endereco)
        } else {
            preencherForm(endereco)
        }
    } else {
        alert(`O ${cep} não é um CEP válido!`)
        limparCampos()
    }

    //fetch(url).then(responde => responde.json()).then(console.log)
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep)