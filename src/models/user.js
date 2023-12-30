const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    NombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://res.cloudinary.com/dmxriftxk/image/upload/v1694214589/user_t663yc.png",
    },
    Description: {
      type: DataTypes.STRING,
    },
  });
};
