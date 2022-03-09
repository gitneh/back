const { Router } = require("express")
const Contenedor = require("../models/movie")

const router = Router()

router.get("/", async (req, res) => {
  const { order, name } = req.query

  const productos = await Contenedor.getAll(name, order)

  res.send(productos)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  const producto = await Contenedor.getById(id)
  if (!producto) {
    res.sendStatus(404)
  } else {
    res.send(producto)
  }
  
})

router.put("/:id", async (req, res) => {
  const { body } = req
  const { id } = req.params
  
  const exists = await Contenedor.exists(id)

  console.log(exists, id)
  if (!exists) {
    res.sendStatus(404)
    return
  }

  await Contenedor.update(id, body)

  res.sendStatus(200)
})

router.post("/", async (req, res) => {
  const { body } = req

  const id = await Contenedor.create(body)

  res.status(201).send({ id })

})
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const exists = await Contenedor.exists(id)

  console.log(exists, id)
  if (!exists) {
    res.sendStatus(404)
    return
  }

  await Contenedor.delete(id)

  res.sendStatus(200)
})

module.exports = router