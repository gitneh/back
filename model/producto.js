const path = require("path")
const fs = require("fs/promises")
const { timingSafeEqual } = require("crypto")

class Producto {
    constructor() {
      this.path = path.join(__dirname, "../database/productos.json")
      this.data = [] 
    }

    async traerProducto(productos) {
      await this.readData()
      this.data.get(productos)
      await this.writeData()
  
    }
    async actualizarId(id, productos) {
      await this.readData()
      const producto = this.data.find(c => c.id == id)
      if (!producto) {
        throw new Exception("no existe")
      }
  
      producto.productos.update(productos)
  
      await this.writeData()
    }
    async agregarProducto(id, productos) {
      await this.readData()
      const producto = this.data.find(c => c.id == id)
      if (!producto) {
        throw new Exception("no existe")
      }
  
      producto.productos.push(productos)
  
      await this.writeData()
    }
    async borrarProducto(id, idProd) {
      await this.readData()
      const producto = this.getProducto(id)
      producto.productos = carrito.productos.filter(p => p.id != idProd)
  
      await this.writeData()
    }

    getProducto(id) {
        const producto = this.data.find(c => c.id == id)
        if (!producto) {
          throw new Exception("no existe")
        }
    
        return producto
      }
    async readData() {
        this.data = JSON.parse(await (fs.readFile(this.path, "utf8")))
      }
    
    async writeData() {
        await fs.writeFile(this.path, JSON.stringify(this.data, null, 2))
      }
}

module.exports = new Producto()