import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import {
  authRoutes,
  subRoutes,
  postRoutes,
  voteRoutes,
  userRoutes,
} from './routes';

import cookieParser from 'cookie-parser';

import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const origin = 'https://pjh-community-site.vercel.app';

app.use(cors({ origin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
dotenv.config();

app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/users', userRoutes);

app.use(express.static('public'));

const port = 4000;

app.listen(port, async () => {
  console.log(`Server running at ${process.env.APP_URL}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('database initialized');
    })
    .catch(error => console.log(error));
});
