require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const UserRegistration = require('../models/UserRegistration')

// Private Route
router.get("/:id", checkToken, async (req, res) => {
    const id = req.params.id;
  
    // check if user exists
    const user = await UserRegistration.findById(id, "-password");
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
});

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
}

// ROta de criar novo usuário
router.post("/auth/register", async (req, res) => {
  const {name, password,confirmpassword, email, profile, CRM, active} = req.body

  // validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" });
  }

  // check if user exists
  const userExists = await UserRegistration.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new UserRegistration({
    name,
    email,
    password: passwordHash,
    profile,
    CRM,
    active
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Rota de login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exists
  const user = await UserRegistration.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

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
  
  const {name, password, email, profile, CRM, active} = req.body

  const person = {
      name,
      password,
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