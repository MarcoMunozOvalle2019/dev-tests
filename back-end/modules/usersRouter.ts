import * as express from "express"
import db from "../sqlitedb/db";
const usuariosRouter = express.Router();
import {Fila}  from '../interface/Iuser'
import { Request,Response } from "express";
const fs = require("fs");
const { parse } = require("csv-parse");
const path=require('path')

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
    //lee csv
    fs.createReadStream(  path.join(__dirname+'/../cosechas.csv')  )
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row:any)=> {
      
        // carga db con csv
        if(row[0]!==';;;;;;;;;') { // TODO:salta lineas vacias, mejorar esto!
            if(row){carga(row[0].split(';'))}
        }
        
      })
      .on("end", ()=> {
        console.log("termino de leer csv");
        res.json({"message":"exito"})
      })
      .on("error", (error:any)=> {
        console.log(error.message);
      });
      
})

// obtener usuarios
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

//obtener un usuario
usuariosRouter.get("/user/:id",(req:Request,res:Response)=>{
    const id=req.params.id
    const getQuery="SELECT * FROM users WHERE id=?"
    const params=[id]
    db.get(getQuery,params, (err:any, row:any) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if(typeof row==="undefined"){
            res.status(404).send({
                "message":"no encontrado"
            })
            return
        }
        res.json({
            "message":"exito",
            "data":row
        })
      });

})

// crea un usuario
usuariosRouter.post("/",(req:Request,res:Response)=>{
    const body:Fila=req.body
    carga(Object.values(body))
    res.json({"message":"exito"}) 
})

//modifica propiedades parcial del usuario
usuariosRouter.put("/:id",(req,res)=>{
    let {id} = req.params;
    let sql ="UPDATE users SET ?? WHERE ID = *";
    sql = sql.replace('*',id)
    let dataBody = JSON.stringify(req.body)
    dataBody = dataBody.replace('{',' ')
    dataBody = dataBody.replace('}',' ')
    dataBody = dataBody.replace(/[:]+/g, '=');
    sql = sql.replace('??',dataBody)
   
    db.run(sql , (err:any, result:any)=>{
     if (err){
         res.status(400).json({"error": err.message})
         return;
     }
     res.json({
         "message": "exito",
     })
   })    
})

///eliminar fila
usuariosRouter.delete("/:id",(req:Request,res:Response)=>{
//verifico usuario porsiaca nno existe
const getQuery="SELECT * FROM users WHERE id=?"
const params=[req.params.id]
db.get(getQuery,params, (err:any, row:any) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    if(typeof row==="undefined"){
        res.status(404).send({
            "message":"usuario no encontrado"
        })
        return
    }
    // finalmente elimino
    const sql ="DELETE FROM users WHERE id=?";
    const params1 =[req.params.id]
    db.run(sql, params1, (err:any, result:any)=>{
      if (err){
          res.status(400).json({
            "message":err.message
          })
          return;
      }
      res.json({
          "message": "exito",
      })
    })
  })    
})

export default usuariosRouter