import { Sequelize } from "sequelize";
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
    id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

export {Transacao};	