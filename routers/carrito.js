const { Router } = require("express")
const router = Router()
const Carrito = require("../model/carrito.js")

router.post("/", async (req,res) => {
const { id } = req.params
const { body } = req
console.log(id, body)

try {
  await Carrito.crear(id, body)

  res.sendStatus(201)
} catch(e) {
  if (e.message === "no existe") {
    res.sendStatus(404) 
  } else {
    console.log(e)
    res.sendStatus(500) 
  }
}
})

router.delete("/:id", async (req,res) => {
const { id, body } = req.params
await Product.delete(id, body)
  res.sendStatus(201)
})


router.get("/:id/productos", async (req, res) => { 
  const { id } = req.params
  const { body } = req
  try {await Carrito.getCarrito(id, body)
    res.sendStatus(201)
  } catch (e) {
    if (e.message === "no existe") {
      res.sendStatus(404) // HTTP Not Found
    } else {
      console.log(e)
      res.sendStatus(500) // HTTP Internal Server Error
    }
  }
})

router.delete("/:id/productos/:prod", async (req, res) => {
  const { id, prod } = req.params
  await Carrito.borrarProducto(id, prod)
  res.sendStatus(202)
})

router.put("/:id", async (req,res) => {
    const { id } = req.params
    const { body } = req
    try {
      await Product.actualizar(id, body)
      res.sendStatus(201)
    } catch(e) {
      if (e.message === "no existe") {
        res.sendStatus(404)
      } else {
        console.log(e)
        res.sendStatus(500)
      }
    }
})




module.exports = router