const express = require('express');
const authMiddleware = require('../middleware/auth');

const Client = require('../schema/Client')

const router = express.Router();

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {

        const client = await Client.find();

        res.send(client)
        
    } catch (err) {
        return res.status(400).send({ erro: 'Não foi possivel listar' })
    }
})

router.post('/', async (req, res) => {
    try {

        const client = await Client.create(req.body);

        return res.send({client})

    } catch(err) {
        return res.status(400).send({ erro: 'Não foi possivel cadastrar seu cliente' })
    }
})

router.put('/:clientId', async (req, res) => {

    try {
        const clientReq = req.body;

        const client = await Client.findByIdAndUpdate(req.params.clientId, clientReq, { new: true })
        return res.send({ msg: 'venda atualizada com sucesso', client })

    } catch (err) {
        return res.status(400).send({ erro: 'Não foi possivel atualizar o cliente' })
    }
})

router.delete('/:clientId', async (req, res) => {

    try {

        const client = await Client.findByIdAndRemove(req.params.clientId)

        return res.send({ msg: 'Cliente deletado com sucesso' })

    } catch (err) {
        return res.status(400).send({ erro: 'Não foi possivel deletar uma venda' })
    }
})


module.exports = (app) => app.use('/client', router)