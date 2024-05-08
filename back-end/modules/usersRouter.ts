import * as express from "express"
import db from "../sqlitedb/db";
const usuariosRouter = express.Router();
import { Request,Response } from "express";
const fs = require("fs");

const carga=(data:any)=>{  
    const [
           Mail_Agricultor,
           Nombre_Agricultor,	
           Apellido_Agricultor,         
           Mail_Cliente,	
           Nombre_Cliente,	
           Apellido_Cliente,	
           Nombre_Campo,	
           Ubicación_de_Campo,	
           Fruta_Cosechada,	
           Variedad_Cosechada]=data
         
    const sql ="INSERT INTO users (Mail_Agricultor, Nombre_Agricultor, Apellido_Agricultor, Mail_Cliente,	Nombre_Cliente,	Apellido_Cliente,	Nombre_Campo,	Ubicación_de_Campo,	Fruta_Cosechada,	Variedad_Cosechada) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const params =[Mail_Agricultor, Nombre_Agricultor, Apellido_Agricultor,	Mail_Cliente,	Nombre_Cliente,	Apellido_Cliente,	Nombre_Campo,	Ubicación_de_Campo,	 Fruta_Cosechada,	Variedad_Cosechada]
    db.run(sql, params, (err:any, result:any)=>{
      if (err){
          return err;
      }
      console.log('correcto')
      return;
    })  
  }

usuariosRouter.get("/csv",async(req:Request,res:Response)=>{    
    
})

usuariosRouter.get("/",(req:Request,res:Response)=>{
    const getQuery="SELECT * FROM users"
    db.all(getQuery, (err:any, rows:any) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"exito",
            "data":rows
        })
      });
})

usuariosRouter.get("/user",(req:Request,res:Response)=>{
})

usuariosRouter.post("/",(req:Request,res:Response)=>{
})

usuariosRouter.put("/:id",(req,res)=>{
})

usuariosRouter.delete("/:id",(req:Request,res:Response)=>{
})

export default usuariosRouter