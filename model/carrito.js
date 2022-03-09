const path = require("path")
const fs = require("fs/promises")
const { timingSafeEqual } = require("crypto")

class Carrito {
  constructor() {
    this.path = path.join(__dirname, "../database/carrito.json")
    this.data = [] // carrito en memoria
  }

  async crearCarrito(carrito) {
    await this.readData()
    carrito.timestamp = Date.now()
    if (carrito.id != 0){
    carrito.id = this.data[this.data.length - 1].id + 1
    this.data.push(carrito)
    } else {
      throw new Exception("no hay productos")
    }
    await this.writeData()
  }

  async agregarProductos(id, productos) {
    await this.readData()
    const carrito = this.getCarrito(id)
    if (!carrito) {
      throw new Exception("no existe")
    }

    carrito.productos.push(productos)

    await this.writeData()
  }

  async borrarProducto(id, idProd) {
    await this.readData()
    const carrito = this.getCarrito(id)
    carrito.productos = carrito.productos.filter(p => p.id != idProd)
    await this.writeData()
  }

  getCarrito(id) {
    const carrito = this.data.find(c => c.id == id)
    if (!carrito) {
      throw new Exception("no existe")
    }

    return carrito
  }

  async borrarCarrito(id) {
    await this.readData()
    const carrito = this.getCarrito(id)
    carrito.productos = carrito.productos.splice(0, carrito.length)
    await this.writeData()
  }

  async traerProductos(carrito) {
    await this.readData()
    const prod = carrito.map(function(){
      return prod.nombre
    })
   await this.writeData()
  }

  async readData() {
    this.data = JSON.parse(await (fs.readFile(this.path, "utf8")))
  }

  async writeData() {
    await fs.writeFile(this.path, JSON.stringify(this.data, null, 2))
  }
}

module.exports = new Carrito()