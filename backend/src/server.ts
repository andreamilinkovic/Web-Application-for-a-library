import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import bookRouter from './routers/book.router';
import multer from 'multer';


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/biblioteka')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../frontend/src/assets')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    //console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      return next(-1)
    }
      res.send(file);
  })


const router = express.Router();
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));