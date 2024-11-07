require('dotenv').config();

const express = require('express');
const cors = require('cors');

const contacts = require('./routes/contacts/contacts.routes');

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/contacts', contacts);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
