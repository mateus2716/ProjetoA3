const express = require('express')
const app = express();
const axios = require('axios');
app.use(express.json());

const {v4 : uuidv4} = require('uuid');
const port = 5000;
const chamadaDeSenhas = {};

app.get('/senhas/:id/chamadaDeSenhas', async (req, res) => {
    res.send(chamadaDeSenhas[req.params.id] || []);
});

app.post('/senhas/:id/chamadaDeSenhas', async (req, res) => {
    const idChamada = uuidv4();
    const { texto } = req.body;

    const chamadaDeSenha = chamadaDeSenhas[req.params.id] || [];
    chamadaDeSenha.push({id: idChamada, texto});
    chamadaDeSenhas[req.params.id] = chamadaDeSenha;

    axios.post('http://localhost:10000/eventos', {
        tipo: 'SenhaChamada',
        dados:{
            id: idChamada,
            texto,
            senhaId: req.params.id
        }
    });

    res.status(201).send(chamadaDeSenhas)
});

app.post('/eventos', (req, res) =>{
    console.log(req.body);
    res.status(200).send({msg:"ok"});
});

app.listen(port, () =>{
    console.log('Servico para chamada de senha Online. Port: 5000');
});