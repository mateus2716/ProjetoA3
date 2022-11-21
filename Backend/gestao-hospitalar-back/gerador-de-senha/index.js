const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const axios = require("axios");

const port = 4000;
senhas = {};
contadorId = 0;
numeroSenha1 = 0;
numeroSenha2 = 0;
numeroSenha3 = 0;

senhas = {};
contadorId = 0;

app.get('/senhas',(req, res) => {
    res.send(senhas);
});

//post
app.post('/senhas', async (req, res) => {
    
    contadorId++;       
    const {especialidade, preferencial} = req.body;

    switch(especialidade){

        case "01":
            numeroSenha1++;
            const med1 = "CG";   //Clinico Geral
            senhas[contadorId] = {
                numeroSenha1, 
                med1, 
                preferencial 
            };

            await axios.post("http://localhost:10000/eventos",{
                tipo: 'SenhaGerada',
                dados:{
                    especialidade,
                    med1,
                    numeroSenha1,
                    preferencial,
                    contadorId
                }
            });
            console.log(senhas);
        break;

        case "02":
            numeroSenha2++;
            const med2 = "CO";   //Clinico Ortopedista
            senhas[contadorId] = {
                numeroSenha2, 
                med2,
                preferencial
            };

            await axios.post("http://localhost:10000/eventos",{
                tipo: 'SenhaGerada',
                dados:{
                    tipo: 'SenhaGerada',
                    especialidade,
                    med2,
                    numeroSenha1,
                    contadorId
                }
            });
                console.log(senhas);
            break;


        case "03":
            numeroSenha3++;
            const med3 = "CP";   //Clinico Pediatra
            senhas[contadorId] = {
                numeroSenha3, 
                med3,
                preferencial
            };

            await axios.post("http://localhost:10000/eventos",{
                tipo: 'SenhaGerada',
                dados:{
                    especialidade,
                    med3,
                    numeroSenha3,
                    preferencial,
                    contadorId
                }
            });
            console.log(senhas);
        break;
    };  
    res.status(201).send(senhas[contadorId]);
});

app.post('/eventos', (req, res) =>{
    console.log(req.body);
    res.status(200).send({msg:"ok"});
});

app.listen(port, () => {
    console.log('Servico de gerador de senha Online. Port: 4000');
});