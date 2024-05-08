import * as sqlite3 from "sqlite3"
const DBSOURCE = "Marcodb.sqlite"

let db = new sqlite3.Database(DBSOURCE,(err:any) => {

})
export default db