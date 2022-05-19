import express from 'express';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import routes from './controllers';
import { errorHandler } from './middlewares/error';
import { responseEnhancer } from './middlewares/formatter';
import jwtStrategy from './configs/jwt';
import path from 'path';
import * as morgan from './middlewares/morgan';
import http from 'http';
import { NotFoundError } from './exceptions';

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
app.use(passport.initialize());
app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/files', express.static(path.join(__dirname, '../files')));
app.use((req, res, next) => {
  next(new NotFoundError('API not found'));
});

app.use(errorHandler);

export default app;
