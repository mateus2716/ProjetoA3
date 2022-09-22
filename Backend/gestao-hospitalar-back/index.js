const express = require('express');
const mongoose = require('mongoose');
const app = express()


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


app.get('/', (req, res) => {


    res.json({message: 'Oi express!'})
})

const DB_USER = 'yohanapinheiro'
const DB_PASSWORD = encodeURIComponent('123456SaoJudas')

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiprojeto.sfrfqfh.mongodb.net/?retryWrites=true&w=majority`
   )
   .then(() => {
    console.log('Conextado ao mongoDB')
    app.listen(3000)
   })
   .catch((err) => console.log(err))
