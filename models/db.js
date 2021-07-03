const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("react_imersao", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com bando de dados realizado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro: Conexão com bando de dados não realizado com sucesso");
  });

  module.exports = sequelize
