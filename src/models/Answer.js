const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Answer", { 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true

    },
   
    Body: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
