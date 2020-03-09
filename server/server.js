import express from 'express';
import http from 'http'

import 'babel-polyfill';
import cors from 'cors';
import bodyParser from 'body-parser'
import env from './env';

// Routes
import badgetRouter from './routes/budgetRoute'; 


const app = express();

// Initialization
app.use(cors());
app.use(bodyParser.json());

app.use('/api', badgetRouter);

// Server
const port = env.PORT || 3030;
const server = http.createServer(app);
server.listen(port, () => console.log(`🚀 Habitissimo API runing on ${port}`));

// Export app for testing purposes
export default app;