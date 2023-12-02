import express from "express"
import path from "path"
import { fileURLToPath } from "url"

/** Routes Controller  */
import main from "./routes/main.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

/** Set Engine View */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/** Static Content */
app.use(express.static(path.join(__dirname, "..", "/public")))

/** Route Setup */
app.use("/", main)

/** Not found Handler */
app.use((_req, res, _next) => {
    return res.status(404).render("404", { message: false })
})

/** Error Handlers */
app.use((error, req, res, next) => {
    console.log(error)
    return res.status(error.status || 500).render("500", { message: false })
})

export default app
