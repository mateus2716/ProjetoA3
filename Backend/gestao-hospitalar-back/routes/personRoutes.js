const router = require('express').Router()

const UserRegistration = require('../models/UserRegistration')

// rota create person
router.post('/', async (req, res) => {

    const {name, email, profile, CRM, active} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório'})
    }

    const person = {
        name,
        email,
        profile,
        CRM,
        active
    }

    try {

        await UserRegistration.create(person)

        res.status(201).json({message: 'Usuário criado com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/', async (req, res) =>{
    try {

        const person = await UserRegistration.find()

        res.status(200).json(person);

    } catch {
        res.status(500).json({error: error})
    }
})


module.exports = router;