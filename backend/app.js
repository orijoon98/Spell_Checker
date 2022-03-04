const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const spell = require('./routes/spell');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/spell', spell);

app.listen(8000, () => {
  logger.info('server started');
});
