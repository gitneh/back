const express = require("express")
const mongoose = require("mongoose")
const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } = require("./config")
const adminMiddleware = require("./middlewares/admin")

const app = express()
const routerCarrito = require("./routers/carrito")
const routerProducto = require("./routers/producto")
const routerMongo = require("./routers/mongo")

mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`).then(() => {
    app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/carrito", routerCarrito)
app.use("/api/producto", adminMiddleware, routerProducto)
app.use("/api/mongo", routerMongo)

app.listen(8080, () => console.log("listening"))
}).catch((err) => console.log("error on mongo", err))

 