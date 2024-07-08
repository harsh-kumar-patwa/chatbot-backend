const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Conversation = sequelize.define('Conversation', {
  userMessage: {
      type: DataTypes.STRING,
      allowNull: false
  },
  botResponse: {
      type: DataTypes.STRING,
      allowNull: false
  }
});


sequelize.sync({force:true});


module.exports = {sequelize,Conversation};
