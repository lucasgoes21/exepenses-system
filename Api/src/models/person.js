// Importa a biblioteca Sequelize
import { Sequelize } from "sequelize";

// Importa a configuração do banco de dados
import { db } from "../config/db.js";

// Define o modelo Person (Pessoa) no banco de dados
const Person = db.define("Pessoa", {
  
  // Define o campo 'id' como a chave primária e auto-incrementável
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  // Define o campo 'Nome' como uma string não nula
  Nome: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  
  // Define o campo 'Idade' como um inteiro não nulo
  Idade: {
    type: Sequelize.INTEGER,
    allowNull: false 
  }
});

export { Person };
