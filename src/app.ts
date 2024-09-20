import compression from 'compression';
import cors from 'cors';
import express from 'express';
import http from 'http';
import passport from 'passport';
import path from 'path';

import jwtStrategy from '@/config/jwt';
import { NotFoundError } from '@/exceptions/not-found';
import { errorHandler } from '@/middlewares/error';
import { responseEnhancer } from '@/middlewares/formatter';
import * as morgan from '@/middlewares/morgan';
import routes from '@/routes';

const app = express();

export const server = http.createServer(app);

app.use(responseEnhancer);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(cors());

app.use(compression());

passport.use('jwt', jwtStrategy);
app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/files', express.static(path.join(__dirname, '../files')));
app.use((req, res, next) => {
  next(new NotFoundError('API not found'));
});

app.use(errorHandler);

export default app;
