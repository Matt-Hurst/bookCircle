const express = require('express');
const app = express();
var cors = require('cors')
const router = require('./router');
require('./db');
require('dotenv').config()

const PORT = 3001;

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
});

