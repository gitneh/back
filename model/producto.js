const path = require("path")
const fs = require("fs/promises")
const { timingSafeEqual } = require("crypto")

class Producto {
    constructor() {
      this.path = path.join(__dirname, "../database/productos.json")
      this.data = [] 
    }

    async traerProductos(producto) {
      await this.readData()
      const prod = producto.map(function(){
        return prod.nombre
      })
     await this.writeData()
    }
    async actualizarId(id, idAct, newValue) {
      await this.readData()
      const producto = this.getProducto(id)
      producto[idAct] = newValue
      await this.writeData()
    }
    async agregarProducto(id, producto) {
      await this.readData()
      const producto = this.getProducto(id)
      if (!producto) {
        throw new Exception("no existe")
      }
      producto.push(producto) 
      await this.writeData()
    }
    async borrarProducto(id, idProd) {
      await this.readData()
      const producto = this.getProducto(id)
      producto = producto.filter(p => p.id != idProd)
  
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