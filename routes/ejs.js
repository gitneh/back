const path = require('path')
const { Router } = require('express')

const Contenedor = require('../models/Contenedor')
const { route } = require('express/lib/application')

const controller = require('../controllers/templateController')

const router = Router()

const productModel = new Contenedor()

router.get('/', async (req, res) => {
  const products = await productModel.getAll()
  res.render('index', { products })
})

router.get('/add', (req, res) => res.render('nueva'))

router.post('/add', async (req, res) => {
  console.log(req.body)
  await productModel.add(req.body)
  res.redirect(`/ejs/result?product=${req.body.name}`)
})

router.get("/result", (req, res) => res.render('result', { product: req.query.product }))

router.get("/controller", controller.add)
module.exports = router


