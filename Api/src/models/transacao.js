import { Sequelize } from "sequelize";
import {Person} from "./person.js";
import {db} from "../config/db.js";

// Define o modelo Transacao no banco de dados
const Transacao = db.define('Transacao', {

    // campo id como chave primaria e auto-incrementavel
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // campo Descricao que armazena uma string
    Descricao: {
        type: Sequelize.STRING,
        allowNull: false, // nao permite valores nulos
    },
    // campo valor que armazena um numero decimal
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false, // nao permite valores nulos
    },
    // campo tipo que armazena uma string
    tipo: {
        type: Sequelize.STRING,
        allowNull: false, // nao permite valores nulos
    },

});

// Define a relacao entre a tabela Transacao e a tabela Person
// cada transacao pertence a uma pessoa
Transacao.belongsTo(Person, {
    constraints: true,
    foreignKey: 'id_pessoa' // nome da chave estrangeira
});


// exporta o modelo Transacao
export {Transacao};
