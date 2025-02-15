import express from 'express';
import {db} from './config/db.js';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';

import { Person } from './models/person.js';
import { Transacao } from './models/transacao.js';

await db.sync();

const app = express();
app.use(express.json());






//Cadastro de pessoas//

app.post('/cadastroPessoa', (req, res) => {

    const newPerson = Person.create(req.body);

    res.send('Pessoa cadastrada com sucesso!');

})

app.put('/cadastroPessoa/:Id', (req, res) => {
     
    const newPerson = Person.update(req.body, {
        where: {
            id: req.params.Id
        }
    });

    res.send('Pessoa atualizada com sucesso!');

});

app.delete('/cadastroPessoa/:Id', (req, res) => {

    const newPerson = Person.destroy({
        where: {
            id: req.params.Id
        }
    });

    const newtransacao = Transacao.destroy({
        where: {
            id_pessoa: req.params.Id
        }
    });

    res.send('Pessoa deletada com sucesso!');

});


//Cadastro de transações// 


app.post('/cadastroTransacao', (req, res) => {
    
    const newTransacao = Transacao.create(req.body);

    res.send('Transação cadastrada com sucesso!');

});


//Consultas de totais (Pessoas)//


/*
{
    Nome: João
    total de receitas: 1000
    total de despesas: 500
    saldo: 500
}
*/

app.get('/consultaPessoa/', async (req, res) => {
    const Consultas_totais_pessoas = await Transacao.sequelize.query(
        `SELECT 
            p.nome, 
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) AS total_receitas,
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS total_despesas,
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS saldo_total
        FROM Pessoas p
        LEFT JOIN Transacaos t ON p.id = t.id_pessoa
        GROUP BY p.id, p.nome;`,
        { type: QueryTypes.SELECT }
    );
    const Consultas_totais = await Transacao.sequelize.query(
        `SELECT 
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) AS total_receitas,
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS total_despesas,
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS saldo_liquido
            FROM Transacaos t;`,
        { type: QueryTypes.SELECT }
    );

    
    res.send({Consultas_totais_pessoas, Consultas_totais});
    
});

export { app };