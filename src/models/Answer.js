const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Answer", { 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
   
    Body: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
