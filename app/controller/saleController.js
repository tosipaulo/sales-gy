const express = require('express');
const authMiddleware = require('../middleware/auth');

const Sale = require('../schema/Sale')

const router = express.Router();

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {

        const sale = await Sale.find().populate('client');
        
        res.send({ sale })

    }catch(err) {
        return res.status(400).send({ erro: 'Não foi possivel listar' })
    }
});

router.post('/', async (req, res) => {

     try {
         const sale = await Sale.create({...req.body, user: req.userId });

        return res.send({ sale });

    }catch(err) {
        return res.status(400).send({ erro: 'Não foi possivel cadastrar uma venda' })
    }
})

router.put('/:saleId', async (req, res) => {

    try {
        const saleReq = req.body;
        
        const sale = await Sale.findByIdAndUpdate(req.params.saleId, saleReq , {new: true})
        return res.send({ msg: 'venda atualizada com sucesso', sale})

    } catch (err) {
        return res.status(400).send({ erro: 'Não foi possivel deletar uma venda' })
    }
})

router.delete('/:saleId', async (req, res) => {

    try {

        const sale = await Sale.findByIdAndRemove(req.params.saleId)

        return res.send({msg: 'venda deletada com sucesso'})

    }catch(err) {
        return res.status(400).send({ erro: 'Não foi possivel deletar uma venda' })
    }
})

module.exports = (app) => app.use('/sale', router)