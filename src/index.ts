import express, { Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import userRoutes from './routes/user'
import commentRoute from './routes/comment'

const app = express();
dotenv.config();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/users', userRoutes)
app.use('/posts', commentRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});