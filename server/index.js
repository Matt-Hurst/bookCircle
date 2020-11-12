const express = require('express');
const app = express();
var cors = require('cors')
const router = require('./router');
const db = require('./db');

const PORT = 3001;

app.use(cors())
app.use(express.json())
app.use(router)

// async function using async await db was crashing server - working without - ask Andre FIXME:
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
});

