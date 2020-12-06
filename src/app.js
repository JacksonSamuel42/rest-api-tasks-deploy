import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes';

const app = express();

// Settings
app.set('port', process.env.PORT || 3200);

// middleware
const corsOptions = {}
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/tasks', taskRoutes);

export default app;
