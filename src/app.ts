import express from 'express';
import helmet from 'helmet';

import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import routes from './controllers';
import { errorHandler } from './middlewares/error';
import { responseEnhancer } from './middlewares/formatter';
import { ApiError } from './exceptions/api-error';
import jwtStrategy from './configs/jwt';
import path from 'path';

const app = express();
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(cors());
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());
app.use(responseEnhancer);

app.use('/api/v1', routes);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));

export default app;