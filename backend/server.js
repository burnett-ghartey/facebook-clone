const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileupload = require("express-fileupload")
const dotenv = require("dotenv")
dotenv.config()
const { readdirSync } = require('fs')
const app = express()

// const options = {
//     origin: 'http://localhost:3000',
//     useSuccessStatus: 200
// }
app.use(cors())
app.use(
    fileupload({
        useTempFiles: true,
    })
)
app.use(express.json())

//  routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)))

//  database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected successfully')
}).catch((err) => {
    console.log('Error connecting to mongodb', err)
})



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`)
})