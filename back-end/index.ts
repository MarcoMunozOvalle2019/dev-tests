import  express from "express"
import cors from "cors"
import usuariosRouter from "./modules/usersRouter"
export const app=express()

app.use(cors()) //politicas de seguridad
app.use(express.json())
app.use("/api",usuariosRouter)

const PORT=process.env.PORT || 3000
export const server=app.listen(PORT,()=>{
    console.log("servidos escuchando en puerto 3000")
})
server.on("error",console.error)
