const moment = require('moment');
const express = require('express')
const app = express()
const Contenedor = require ("./clase");
const clase = new Contenedor()
app.get("/productos.json", async (req, res) => {
    const data = await clase.getAll()
    res.send(JSON.stringify(data))
})
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})

server.on("error", (err) => {
  console.log(`Error: ${err}`)
})

