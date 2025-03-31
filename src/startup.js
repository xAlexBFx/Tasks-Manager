import app from './app.js'
import {connectDB} from './db.js'

connectDB();
app.listen(8080)
console.log(`>>> App at http://localhost:8080`)