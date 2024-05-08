import * as sqlite3 from "sqlite3"
const DBSOURCE = "Marcodb.sqlite"

let db = new sqlite3.Database(DBSOURCE,(err:any) => {
    if (err) {
        console.error(err.message)
        throw err
      }else{
          console.log('Connectado a SQLite base datos')
          const sqlCreate=
          `CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              Mail_Agricultor text UNIQUE,
              Nombre_Agricultor text,	
              Apellido_Agricultor text,
              Mail_Cliente text UNIQUE,
              Nombre_Cliente text,
              Apellido_Cliente text,
              Nombre_Campo text,
              Ubicación_de_Campo text,	
              Fruta_Cosechada text UNIQUE,
              Variedad_Cosechada text,
  
              CONSTRAINT Fruta_Cosechada UNIQUE (Variedad_Cosechada)            
              CONSTRAINT Fruta_Cosechada UNIQUE (Variedad_Cosechada)            
              CONSTRAINT Nombre_Campo UNIQUE (Ubicación_de_Campo)            
              );`;
          db.run(sqlCreate, err => {
              if (err) {
                  return console.error(err.message);
              }
              console.log("exito creacion tabla usuarios");
          });
      }
})
export default db