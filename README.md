# exepenses-system

## Objetivo: 
  Implementar um sistema de controle de gastos residenciais com:

  1. Cadastros de transações;

  2. Cadastro de pessoas;

  3. Consulta de totais;   

  ## Especificação:  
  Em linhas gerais, basta que o sistema cumpra os requisitos apresentados, não sendo necessária preocupação com os casos inesperados, apresentação (visual), etc.  
  
  ## Tecnologias:  
  Quaisquer*, bastando que o sistema final ofereça as funcionalidades descritas a seguir. Ainda, não é obrigatório utilizar banco de dados, podendo-se manter os dados em memória da maneira que bem entender.
      
  ## Funcionalidades:  
  ### Cadastro de pessoas  
  Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação, deleção e listagem.
  Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas.
  O cadastro de pessoa deverá conter:  
    1. Identificador (deve ser um número inteiro sequencial único gerado automaticamente);  
    2. Nome (texto);  
    3. Idade (número inteiro);
  
### Cadastro de transações: 

Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação e listagem (não é necessário implementar edição/deleção).
Caso o usuário informe um menor de idade (menor de 18), apenas despesas deverão ser aceitas.
O cadastro de transação deverá conter:

1. Identificador (deve ser um número inteiro sequencial único gerado automaticamente);

2. Descrição (texto);

3. Valor (número decimal positivo);

4. Tipo (despesa/receita);

5. Pessoa (inteiro identificador da pessoa do cadastro anterior);   
    1.Esse valor precisa existir no cadastro de pessoa;

### Consulta de totais: 
Deverá listar todas as pessoas cadastradas, exibindo o total de receitas, despesas e o saldo (receita – despesa) de cada uma.

Ao final da listagem anterior, deverá exibir o total geral de todas as pessoas incluindo o total de receitas, total de despesas e o saldo líquido.

## Execução

Dentro de ./exepenses-system:
~~~ 
Cd api
npm start

cd ../frontend
npm run dev
~~~

Ou execute "start.bat"

