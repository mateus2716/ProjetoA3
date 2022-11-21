const express = require('express');
const mongoose = require('mongoose');

const app = express()

// Config JSON response
app.use(express.json())

// rotas da API
const userRoute = require('./routes/userRoute')

app.use('/users', userRoute)

// Open Route
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Bem vindo a API!" });
});

const dbUser     = process.env.DB_USER
const dbPassWord = process.env.DB_PASSWORD

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassWord}@apiprojeto.sfrfqfh.mongodb.net/?retryWrites=true&w=majority`
   )
   .then(() => {
    console.log('Conectado ao mongoDB')
    app.listen(3000)
   })
   .catch((err) => console.log(err))
