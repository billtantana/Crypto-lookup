import express from 'express';
import cryptoLookup from './routes/crypto-lookup-route.js';

const app = express();
const port = 3000;  

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', cryptoLookup);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});     
