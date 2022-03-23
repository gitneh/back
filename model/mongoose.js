const mongoose = require("mongoose")

class Product {
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

    this.model = mongoose.model("product", schema)
  }

  async create(obj) {
    const product = await this.model.create(obj)
    console.log("--------------------")
    console.log(JSON.stringify(product, null, 2))
    return product
  }

  async getAll(orderBy = '', search = '') {
    let products = []
    let find = search ? { nombre: { $regex: search, $options: "i" } } : {}
    if (orderBy) {
      const sort = {}
      sort[orderBy] = -1
      products = await this.model.find(find).sort(sort)
    } else {
      products = await this.model.find(find)
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

  async getById(id) {
      const pid = await this.model.findOne({ id: id });
    if (pid) {
        return pid
    } else {
        console.log("not found")
    }
  }

  async update( ) {
      const result = await this.model.updateOne ({ nombre: Xbox }, { $set: XboxOne })
    return result
  }

  async delete() {
      const borrado = await this.model.deleteOne({nombre: $nombre})
      return borrado

  }
}

module.exports = new Product()