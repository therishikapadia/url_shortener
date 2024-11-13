const express=require('express')
const path=require('path')

const {connectMongoDB}=require("./connect")

const {logReqRes}=require('./middlewares')
const {restrictTo,checkForAuthentication}=require('./middlewares/auth')
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
app.use(cookieParser())
app.use(express.json())
app.use(logReqRes("log.txt"))
app.use(checkForAuthentication)


//template engine
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//routes
app.use('/url',restrictTo(["ADMIN"],["NORMAL"]),urlRoute)
app.use('/',staticRoute)
app.use('/user',userRoute)

app.listen(PORT,()=>console.log("Server runnign on port:"+PORT))