import  express from "express"
import cors from "cors"
export const app=express()

app.use(cors()) //politicas de seguridad
app.use(express.json())

const PORT=process.env.PORT || 3000
export const server=app.listen(PORT,()=>{
    console.log("servidos escuchando en puerto 3000")
})
server.on("error",console.error)
