import { Sequelize } from "sequelize";
import {db} from "../config/db.js";

const Person = db.define('Pessoa', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export {Person};
