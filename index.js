const express=require('express')
const path=require('path')

const {connectMongoDB}=require("./connect")

const {logReqRes}=require('./middlewares')
const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth')
const cookieParser=require('cookie-parser')

const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')

const app = express()
const PORT=8000

//connect db
connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('MongoDB Connected'));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logReqRes("log.txt"))
app.use(cookieParser())


//template engine
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//routes
app.use('/url', restrictToLoggedInUserOnly,urlRoute)
app.use('/',checkAuth,staticRoute)
app.use('/user',userRoute)

app.listen(PORT,()=>console.log("Server runnign on port:"+PORT))