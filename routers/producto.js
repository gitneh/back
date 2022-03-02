const { Router } = require("express")
const router = Router()
const Producto = require("../model/producto.js")

const router = Router()

const isAdmin = false

router.get("/:id/productos", async (req, res) => { 
    const { id } = req.params
    const { body } = req
    try {
      await Producto.traerProducto(id, body)
      res.sendStatus(201)
    } catch(e) {
      if (e.message === "no existe") {
        res.sendStatus(404) // HTTP Not Found
      } else {
        console.log(e)
        res.sendStatus(500) // HTTP Internal Server Error
      }
    }
  })

router.update("/:id/productos", async (req,res) => {
  if(!isAdmin) {
    res.send({
        error: -1,
        description: "ruta /api/producto POST nos authorized",
    })
  } else {
    const { id } = req.params
    const { body } = req
    try {
      await Producto.actualizarId(id, body)
      res.sendStatus(201)
    } catch(e) {
      if (e.message === "no existe") {
        res.sendStatus(404) // HTTP Not Found
      } else {
        console.log(e)
        res.sendStatus(500) // HTTP Internal Server Error
      }
    }
  }
})
router.post("/:id/productos", async (req,res) => {
    if(!isAdmin) {
        res.send({
            error: -1,
            description: "ruta /api/producto POST nos authorized",
        })
    } else {
  const { id } = req.params
  const { body } = req
  console.log(id, body)
  
  try {
    await Producto.agregarProducto(id, body)

    res.sendStatus(201)
  } catch(e) {
    if (e.message === "no existe") {
      res.sendStatus(404) // HTTP Not Found
    } else {
      console.log(e)
      res.sendStatus(500) // HTTP Internal Server Error
    }
  }
}
})

router.delete("/:id/productos", async (req,res) => {
  if(!isAdmin) {
      res.send({
          error: -1,
          description: "ruta /api/producto POST nos authorized",
      })
  } else {
const { id, body } = req.params
  
await Producto.borrarProducto(id, body)

  res.sendStatus(201)}
})

module.exports = router
