import express from 'express';
import 'dotenv/config';

const app = express();
app.get('/', (req,res)=>res.send('ChantierSync API ready'));

const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log('API listening on', port));
