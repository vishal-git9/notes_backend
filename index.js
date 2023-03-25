const express = require("express")
const connection = require("./config/db")
const authChecker = require("./Middlewares/Auth.middleware")
const authRouter = require("./Routes/user.routes")
const notesRouter = require("./Routes/note.routes")

const app = express()

app.use(express.json())
app.use("/auth",authRouter)
app.use(authChecker)
app.use("/notes",notesRouter)


app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("could'nt connect to db")
    }
    console.log("listening on port 4500")
})