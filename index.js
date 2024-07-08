require('dotenv').config();
const { sequelize } = require('./models/conversation');
const express = require('express');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chat');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use('/', chatRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
