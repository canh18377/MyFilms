const express = require('express')
const morgan = require('morgan')
const path =require('path')
const cors = require('cors');
const object = require('./midderware/jwtActions')
const router = require('./routes/index')
const { engine } = require('express-handlebars')
var bodyParser = require('body-parser')
const db = require('./config/connect')
const app = express()
const port = 8080

app.use(cors({
  origin: 'http://localhost:3000', // Chỉ cho phép nguồn này truy cập
  methods: ['GET', 'POST'],     // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Các header được phép
}));

app.use(morgan('combined'))
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'resourse','views'));

object.createJwt({name:'canh',password:'123'})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router(app)
db.connect()
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})