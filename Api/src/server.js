import express from 'express';
import {db} from './config/db.js';
import { QueryTypes } from 'sequelize';
import cors from 'cors';

import { Person } from './models/person.js';
import { Transacao } from './models/transacao.js';

// sincroniza o banco de dados com as models criadas
await db.sync();

const app = express();

// permite que o servidor aceite requisições com corpo no formato json
app.use(express.json());

// permite que o servidor receba requisições de origem diferente
app.use(cors());

// rotas de cadastro de pessoas
app.post('/cadastroPessoa', async (req, res) => {

    // cria uma nova pessoa com os dados recebidos na requisição
    const newPerson = await Person.create(req.body);

    // envia uma resposta informando que a pessoa foi cadastrada com sucesso
    res.send('Pessoa cadastrada com sucesso!');

});

app.get('/cadastroPessoa/:Id', async (req, res) => {
     // busca uma pessoa pela chave primaria recebida na requisição
     const newPerson = await Person.findByPk(req.params.Id)

     // envia a pessoa encontrada como resposta
     res.send(newPerson);
});

app.get('/cadastroTransacao/', async (req, res) => {
    const newTransacao = await Transacao.findAll({
        include: [{
            model: Person,
            attributes: ['nome']
        }]
    });
    res.send(newTransacao);
});

app.put('/cadastroPessoa/:Id', async (req, res) => {
     
    // atualiza uma pessoa com os dados recebidos na requisição
    const newPerson = await Person.update(req.body, {
        // especifica que o where deve ser feito pela chave primaria
        where: {
            id: req.params.Id
        }
    });

    // envia uma resposta informando que a pessoa foi atualizada com sucesso
    res.send('Pessoa atualizada com sucesso!');

});

app.delete('/cadastroPessoa/:Id', async (req, res) => {

    // deleta todas as transações que tem a pessoa como chave estrangeira
    const newtransacao = await Transacao.destroy({
        // especifica que o where deve ser feito pela chave estrangeira
        where: {
            id_pessoa: req.params.Id
        }
    });
       
    // deleta a pessoa especificada
    const newPerson = await Person.destroy({
        // especifica que o where deve ser feito pela chave primaria
        where: {
            id: req.params.Id
        }
    });

    // envia uma resposta informando que a pessoa foi deletada com sucesso
    res.send('Pessoa deletada com sucesso!');

});

// rotas de cadastro de transacoes
app.post('/cadastroTransacao', async (req, res) => {
    
    // cria uma nova transacao com os dados recebidos na requisição
    const newTransacao = await Transacao.create(req.body);

    // envia uma resposta informando que a transacao foi cadastrada com sucesso
    res.send('Transacao cadastrada com sucesso!');

});
// rotas de consultas de totais (Pessoas)
/*
{
    Nome: João
    total de receitas: 1000
    total de despesas: 500
    saldo: 500
}
    total_receitas = 70000
    total_despesas = 123123
    saldo_liquido = 123123
{
    }
*/
app.get('/consultaPessoa/', async (req, res) => {
    // busca todas as transacoes e soma as receitas e despesas de cada pessoa
    const Consultas_totais_pessoas = await Transacao.sequelize.query(
        `SELECT 
            p.nome, 
            p.id,
            p.idade,
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) AS total_receitas,
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS total_despesas,
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS saldo_total
        FROM Pessoas p
        LEFT JOIN Transacaos t ON p.id = t.id_pessoa
        GROUP BY p.id, p.nome;`,
        { type: QueryTypes.SELECT }
    );
    // soma todas as receitas e despesas de todas as transacoes
    const Consultas_totais = await Transacao.sequelize.query(
        `SELECT 
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) AS total_receitas,
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS total_despesas,
            COALESCE(SUM(CASE WHEN t.tipo = 'receita' THEN t.valor ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN t.tipo = 'despesa' THEN t.valor ELSE 0 END), 0) AS saldo_liquido
            FROM Transacaos t;`,
        { type: QueryTypes.SELECT }
    );
    
    // envia as consultas como resposta
    res.send({Consultas_totais_pessoas, Consultas_totais});
    
});

// exporta o app para que possa ser usado em outros lugares
export { app };
