const express = require('express')
const path = require('path')
const app = express()
const Contenedor = require("./models/Contenedor")
const contenedorRouter = require("./routes/contenedor")

// const pugEngine = require('./engines/pug')
// const ejsEngine = require('./engines/ejs')

// const pugRouter = require('./routes/pug')
const ejsRouter = require('./routes/ejs')

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server);

const PORT = process.env.PORT || 8080
const movies = [
    { id: 1, name: 'Notebook' },
    { id: 2, name: 'Netbook' },
    { id: 3, name: 'PC' },
    { id: 4, name: 'Xbox' },
    { id: 5, name: 'Ps' },
    { id: 6, name: 'Nintendo' },
  ];

app.set('views', './views/ejs');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use("/ejs", ejsRouter)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
const socketPool = {}

const users = {}
const msg = [] // base de datos de mensajes ( es un array :P)

io.on("connection", (socket) => {
  // cuando un nueva connection llega al server
  console.log(`an user connected: ${socket.id}`)

  socket.on("soy", (name) => {
    users[socket.id] = name

    console.log(users)

    for (const u of Object.entries(users)) {
  
      socket.emit("users", { id: u[0], name: u[1] })
    }
    const time = 1000
    for (let i = 0; i < 3; i++)
    {
      socketPool[socket.id] = i
      setTimeout(() => socket.emit("product", product[i]), time * (i + 1))
    }
  
    socket.on('more', () => {
      const i = socketPool[socket.id]
      const next = i + 1
      setTimeout(() => socket.emit("product", products[next]), 1000)
      socketPool[socket.id] = next
    })

    // emitir el evento de que un nuevo usuario esta en linea
    socket.broadcast.emit("users", { id: socket.id, name })

    for (const m of msg) {
      socket.emit("message", m)
    }
  })

  socket.on("message", (data) => {
    console.log(data)
    msg.push(data) // agregamos el mensaje a la base de datos (array :P)
    // retransmitir mensaje
    socket.broadcast.emit("message", data)
  })
})
(async () => {
  try {
    await Contenedor.loadData()

    app.use(express.json())

    app.get("/", (rq, rs) => rs.send("Hola"))

    app.use("/api/productos", contenedorRouter)
    app.listen(
      8080,
      () => console.log("Listening")
    )
  } catch (e) {
    console.log(e)
    console.log("could not start servers")
  }
})()

server.listen(8080, () => console.log(`listening on http://localhost:8080`))