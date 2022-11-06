const express = require("express")
const { createServer } = require("http")
const realtimeServer = require("./realtimeServer")

const path = require("path")
const cookieParser = require("cookie-parser")

const app = express()
const httpServer = createServer(app)

// Settings
app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.use(cookieParser())


// Routes
app.use(require("./routes"))

// Public
app.use(express.static(path.join(__dirname, "public")))

// Levanto el servidor
httpServer.listen(app.get("port"), () => {
    //callback que se va a ejecutar una vez que el servidor ya esta arriba
    console.log("El servidor ya esta corriendo en el puerto", app.get("port"));
})

// Llamo al servidor de Socket.io
realtimeServer(httpServer)
