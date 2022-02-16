const express = require('express')
const path = require('path')
const app = express()
const pugEngine = require('./engines/pug')
const ejsEngine = require('./engines/ejs')

const pugRouter = require('./routes/pug')
const ejsRouter = require('./routes/ejs')

const PORT = process.env.PORT || 8080

app.set('views', './views/ejs');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use("/ejs", ejsRouter)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))