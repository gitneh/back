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


router.get("/:id/carrito", async (req, res) => { 
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
router.get("/carrito", async (req, res) => {
  const { id } = req.params
  const { body } = req
  try { await Carrito.traerProductos(id, body)
  res.sendStatus(201)
  }catch (e) {
    if (e.message === "no existe") {
      res.sendStatus(404) // HTTP Not Found
    } else {
      console.log(e)
      res.sendStatus(500) // HTTP Internal Server Error
    }
  }
})

router.delete("/:id/carritos/:carrito", async (req, res) => {
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