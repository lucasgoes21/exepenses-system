import express from 'express';

const app = express();
app.use(express.json());

//Cadastro de pessoas//

const pessoas = [];




app.post('/cadastroPessoa', (req, res) => {

    if(pessoas.length != 0) {
        const {nome, idade, id} = pessoas[pessoas.length - 1];
        const id_pessoa = id + 1;
        req.body.id = id_pessoa;
        pessoas.push(req.body);

        res.send('Pessoa cadastrada com sucesso!');
    }

    req.body.id = 0;
    pessoas.push(req.body);
    res.send('Pessoa cadastrada com sucesso!');
})

app.put('/cadastroPessoa/:id', (req, res) => {

    const id = req.params.id;
    const { nome, idade } = req.body;

    pessoas[id] = { nome, idade, id };

    res.send('Pessoa atualizada com sucesso!');
});

app.delete('/cadastroPessoa/:id', (req, res) => {

    const id = req.params.id;
    pessoas.splice(id);
    res.send('Pessoa deletada com sucesso!');

});

app.get('/cadastroPessoa', (req, res) => {
  res.json(pessoas);
});

//Cadastro de transações// 

const transacao = [];
const id_transacao = 0;

app.post('/cadastroTransacao', (req, res) => {
    
    req.body.id = id_transacao;
    transacao.push(req.body);
    id_transacao = id_transacao + 1;

    res.send('Transação cadastrada com sucesso!');
});

app.get('/cadastroTransacao', (req, res) => {
    res.json(transacao);
})

//Consultas de totais (Pessoas)//


/*
{
    Nome: João
    total de receitas: 1000
    total de despesas: 500
    saldo: 500
}
*/

app.get('/consultaPessoa', (req, res) => {
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


});

app.listen(3000);