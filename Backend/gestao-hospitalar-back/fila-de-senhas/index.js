const express = require ('express')
const bodyParser = require ('body-parser');
const axios = require ('axios')
const app = express();
app.use(bodyParser.json());

const port = 6000;
baseConsulta = {};

const funcoes = {
    SenhaGerada: (senha) => { 
        baseConsulta[senha.contadorId] = senha;
    },
    SenhaChamada: (chamada) => {
        const chamadaDeSenha = 
            baseConsulta[chamada.senhaId]['chamadaDeSenha']||[];
        chamadaDeSenha.push(chamada);
        baseConsulta[chamada.senhaId]['chamadaDeSenha'] = 
            chamadaDeSenha;
    }    
}

app.get('/senhas', (req, res) =>{
    res.status(200).send(baseConsulta);
});

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }catch(e){
        console.log(req.body);
        console.log(e);
    }
    res.status(200).send(baseConsulta);
});

app.listen(port, async () => {
    console.log('Consultas. Porta 6000.')
    try{
      const resp = await axios.get('http://localhost:10000/eventos')
      resp.data.forEach((valor, indice, colecao) => {
        try{
          funcoes[valor.tipo](valor.dados)
        }catch(ex){} 
      });
    }
    catch(e){
    }
});