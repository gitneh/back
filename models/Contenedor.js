const knex = require("knex")
const fs = require("fs/promises")
const path = require("path")

class Contenedor {
  constructor() {
    this.db = knex(
      this.movieDbConfig = {
        client: "mysql",
        connection: {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "root",
          database: "contenedor_db"
        }
      })
  }

  async getProductsById(id) {
    const data = await this.db("productos")
    .where({ id })
    .first()
    return product
  }

  async loadData () {
    try {
      await this.db.schema.dropTableIfExists("productos")
      await this.db.schema.createTable("productos", (table) => {
        table.increments("id")
        table.string("nombre")
        table.integer("price")
        table.string("thumbnails")
      })

      const raw = await fs.readFile(path.join(__dirname, "../database/productos.json"))
      const productos = JSON.parse(raw)

      for (const producto of productos) {
        console.log(producto)
        await this.db("productos").insert(producto)
      }
    } catch (e) {
      throw e
    }
    
  }

  async getAll(name = "", order = "id") {
    const product = await this.db("productos")
    .whereILike("name", `%${name}%`)
    .orderBy(order, "asc")
    return product
  }

  writeData(data) {
    return fs.writeFile(this.path, JSON.stringify(data, null, 2))
  }

  async readData () {
    const raw = await fs.readFile(this.path, "utf8")
    return JSON.parse(raw)
  }
}

module.exports = new Contenedor ()