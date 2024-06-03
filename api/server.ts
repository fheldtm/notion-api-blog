import express, { type Request, type Response } from 'express';
import routes from './router/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

export default fromNodeMiddleware(app);
