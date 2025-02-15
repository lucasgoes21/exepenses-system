import { Sequelize } from "sequelize";
import {Person} from "./person.js";
import {db} from "../config/db.js";

const Transacao = db.define('Transacao', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },

});

Transacao.belongsTo(Person, {
    constraints: true,
    foreignKey: 'id_pessoa'
});


export {Transacao};	