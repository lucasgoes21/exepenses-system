import express from 'express';
import {db} from './config/db.js';

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

/*app.get('/consultaPessoa', (req, res) => {
    const ConsultasPessoa = [];
    transacao.forEach((i) => {

        const {Descricao, valor, tipo, id_pessoa, id_transacao} = i;

        ConsultasPessoa[id_pessoa].nome = pessoas.find((p) => p.id == id_pessoa);
        
        if (tipo == 'receita') {
            ConsultasPessoa[id_pessoa].totalReceitas += valor;
        } else {
            ConsultasPessoa[id_pessoa].totalDespesas += valor;
        }

        ConsultasPessoa[id_pessoa].saldo = ConsultasPessoa[id_pessoa].totalReceitas - ConsultasPessoa[id_pessoa].totalDespesas;
    });

    res.json(ConsultasPessoa);


});*/

export { app };