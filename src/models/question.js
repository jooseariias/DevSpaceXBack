const { defaults } = require("pg");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Question", { 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    Title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    Body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  });
};
