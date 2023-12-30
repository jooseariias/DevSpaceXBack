require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
    "postgres://postgres:1234@localhost:5432/DevSpaceX",
  {
    logging: false, 
    native: false, 
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,Question,Category,Answer
} = sequelize.models;

// Aca vendrian las relaciones

//relacion usuario y preguntas


User.hasOne(Question);
Question.belongsTo(User);

// // // //relacion de prguntas y categorias
Category.hasOne(Question)
Question.belongsTo(Category)

Question.hasMany(Answer);
Answer.belongsTo(Question);
// User.hasOne(Answer);
// Answer.belongsTo(User);

User.hasOne(Answer)
Answer.belongsTo(User)



// Questions.hasOne(Answer);
// Answer.belongsTo(Questions);

// Questions.hasOne(Categories,{through: "Questions_Categories"});
// Categories.belongsTo(Questions);





module.exports = {
  ...sequelize.models, 
  conn: sequelize, 
};