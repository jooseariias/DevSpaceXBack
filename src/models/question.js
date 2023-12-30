const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Question", { 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    Body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });
};
