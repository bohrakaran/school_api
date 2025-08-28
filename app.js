import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import {config} from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js'

config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', schoolRoutes);
app.get('/',(req, res)=> res.json({ok: true, message: "School API is live"}));
app.use((_req,res)=> res.status(404).json({ok: false, error: 'Not found'}));

const PORT = process.env.PORT|| 10000;
app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`));
