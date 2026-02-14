import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use('/api', routes);

app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
});
