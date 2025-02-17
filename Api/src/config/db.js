// Importa a biblioteca Sequelize
import { Sequelize } from 'sequelize';

// Cria uma instancia da classe Sequelize
const db = new Sequelize({
    dialect: 'sqlite',
    storage: '../exepenses.db',
  });

// Exporta a instancia do banco de dados
export {db};
