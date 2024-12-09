import express, { response } from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb"

const app = express()
const port = process.env.PORT || 8282

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))

app.get("/", (req, res) => res.send("our app is working"))

app.listen(port, () => console.log(`Server listening on ${port}`))
