const { Router } = require("express")
const router = Router()
const Product = require("../model/producto.js")

const isAdmin = false

router.get("/:id/producto", async (req, res) => { 
    const { id } = req.params
    const { body } = req
    try {
      const prod = await Product.getById(id, body)
      res.send(prod)
    } catch(e) {
      throw new Exception ('not found')
    }
  })

  router.get("/producto", async (req, res) => {
    const { id } = req.params
    const { body } = req
    try { 
      const pro = await Producto.getAll(id, body)
    res.send(pro)
    }catch (e) {
      throw new Exception ('not found')
    }
  })

  router.put("/:id", async (req,res) => {
  if(!isAdmin) {
    res.send({
        error: -1,
        description: "ruta /api/producto PUT nos authorized",
    })
  } else {
    const { id } = req.params
    const { body } = req
    try {
      const produ = await Product.update(id, body)
      res.send(produ)
    } catch(e) {
      throw new Exception ('not found')
    }
  }
})
router.post("/", async (req,res) => {
    if(!isAdmin) {
        res.send({
            error: -1,
            description: "ruta /api/producto POST not authorized",
        })
    } else {
  const { id } = req.params
  const { body } = req
  console.log(id, body)
  
  try {
    const produc = await Product.create(id, body)

    res.send(produc)
  } catch(e) {
    throw new Exception ('not found')
  }
}
})

router.delete("/:id", async (req,res) => {
  if(!isAdmin) {
      res.send({
          error: -1,
          description: "ruta /api/producto DELETE not authorized",
      })
  } else {
const { id, body } = req.params
  
const product= await Product.delete(id, body)

  res.send(product)}
})

module.exports = router
