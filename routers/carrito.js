const { Router } = require("express")
const router = Router()
const Carrito = require("../model/carrito.js")

router.post("/", async (req,res) => {
const { id } = req.params
const { body } = req
console.log(id, body)

try {
  const car = await Carrito.crear(id, body)

  res.send(car)
} catch(e) {
  throw new Exception ('not found')
}
})


router.get("/:id/carrito", async (req, res) => { 
  const { id } = req.params
  const { body } = req
  try {
    const carr = await Carrito.getCarrito(id, body)
    res.send(carr)
  } catch (e) {
    throw new Exception ('not found')
  }
})
router.get("/carrito", async (req, res) => {
  const { id } = req.params
  const { body } = req
  try { 
    const carri = await Carrito.traerProductos(id, body)
  res.send(carri)
  }catch (e) {
  throw new Exception ('not found')
  }
})

router.delete("/:id/carritos/:carrito", async (req, res) => {
  const { id, prod } = req.params
  const carrit = await Carrito.borrarProducto(id, prod)
  res.send(carrit)
})

router.put("/:id", async (req,res) => {
    const { id } = req.params
    const { body } = req
    try {
      const carrito = await Product.actualizar(id, body)
      res.send(carrito)
    } catch(e) {
      throw new Exception ('not found')
    }
})




module.exports = router