require("dotenv")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const connectDB = require("./config/db")

const app = express()

connectDB()

app.use(cors())

app.use(
  bodyParser.urlencoded({
    true: false,
    extended: true,
  })
)

app.use(bodyParser.json({}))

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.use("/waitlist", require("./routes/waitlist"))

// Error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  console.log(error)
  res.status(status).json({ message: message, data: data })
})

const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
)