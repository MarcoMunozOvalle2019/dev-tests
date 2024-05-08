import * as express from "express"
import db from "../sqlitedb/db";
const usuariosRouter = express.Router();
import { Request,Response } from "express";


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