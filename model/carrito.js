const mongoose = require("mongoose")

class Carrito {
  constructor() {
    const schema = new mongoose.Schema({
      nombre: String,
      descripcion: String,
      codigo: String,
      url: String,
      precio: Number,
      stock: { type: Number, default: 0 },
      timestamp: { type: Number, default: Date.now() }
    })

    this.model = mongoose.model("carrito", schema)
  }

  async crearCarrito(carrito) {
    const carrito = await this.model.create(carrito)
    console.log(JSON.stringify(product, null, 2))
    return carrito
  }

  async getCarrito(id) {
    const cid = await this.model.findOne({ id: id });
    if (cid) {
        return cid
    } else {
        console.log("not found")
    }
  }

  async borrarProducto() {
    const borrar = await this.model.deleteOne ({nombre: $nombre})
    return borrar
   }
  
  async actualizar() {
    const result = await this.model.updateOne ({ nombre: Xbox }, { $set: XboxOne })
  return result
}

  async traerProductos(orderBy = '', search = '') {
    let carritos = []
    let find = search ? { nombre: { $regex: search, $options: "i" } } : {}
    if (orderBy) {
      const sort = {}
      sort[orderBy] = -1
      carritos = await this.model.find(find).sort(sort)
    } else {
      carritos = await this.model.find(find)
    }
    console.log(`Productos en DB: ${products.length}`)

    return products.map((p) => {
      return {
        nombre: p.nombre,
        descripcion: p.descripcion,
        codigo: p.codigo,
        url: p.url,
        precio: p.precio,
        stock: p.stock,
        id: p["_id"],
        timestamp: p.timestamp
      }
    })
  }
}


module.exports = new Carrito()