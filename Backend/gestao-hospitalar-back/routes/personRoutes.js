const router = require('express').Router()

const UserRegistration = require('../models/UserRegistration')

// ROta de criar novo usuário
router.post('/', async (req, res) => {

    const {name, email, profile, CRM, active} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório'})
        return
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

// ROta de buscar usuário
router.get('/', async (req, res) =>{
    try {

        const person = await UserRegistration.find()

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// ROta de buscar usuário pelo id
router.get('/:id', async (req, res) =>{
    const id = req.params.id

    try {
        const person = await UserRegistration.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// ROta de atualizar usuário 
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    
    const {name, email, profile, CRM, active} = req.body

    const person = {
        name,
        email,
        profile,
        CRM,
        active
    }

    try {
        const updatePerson = await UserRegistration.updateOne({ _id: id }, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// ROta de excluir usuário
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await UserRegistration.findOne({ _id: id })

    if(!person) {
        res.status(422).json({message: 'O usuário não foi encontrado!'})
        return
    }

    try {
        await UserRegistration.deleteOne({_id: id})

        res.status(200).json({message: 'Usuário removido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router;