import { useState, useEffect, useRef } from "react";
import Trash from "../../assets/trash.png";
import Edit from "../../assets/edit.png";
import "./style.css";
import api from "../../services/api";

function Home() {
  // Referências para os inputs
  const inputNome = useRef();
  const inputIdade = useRef();
  const inputId = useRef();
  const inputValor = useRef();
  const inputTipoR = useRef();
  const inputTipoD = useRef();
  const inputDesc = useRef();
  const inputEditNome = useRef();
  const inputEditIdade = useRef();

  // Variável de estado para controlar se a pessoa tem menos de 18 anos
  const [menor18, setMenor18] = useState(false);

  // Variável de estado para controlar se a pessoa existe
  const [exist, setexist] = useState(false);

  // Função para verificar se a pessoa tem menos de 18 anos
  async function menor() {
    const dataFromApi = await api.get(
      `/cadastroPessoa/${inputId.current.value}`
    );
    let person = dataFromApi.data;
    if (person.Idade < 18) {
      // se a pessoa tem uma idade, ela existe, entao seta a pessoa como existente
      setexist(true);
      setMenor18(true);
    }
    if (person.Idade > 18) {
      setexist(true);
      setMenor18(false);
    }
    console.log(menor18);
  }

  // Função para cadastrar uma pessoa
  async function cadPessoa() {

    // Verifica se os campos nome e idade estao vazios se estiverem, exibe um alerta e nao cadastra a pessoa
    if(inputNome.current.value == "" || inputIdade.current.value == "") {
      alert("Preencha todos os campos");
      return;
    }

    await api.post("/cadastroPessoa", {
      Nome: inputNome.current.value,
      Idade: inputIdade.current.value,
    });
    getTransacao();
    getPessoas();
  }

  // Função para cadastrar uma transação
  async function cadTransacao() {
    let auxTipo;

    if(inputValor.current.value == "" || inputId.current.value == "") {
      alert("Preencha todos os campos");
      return;
    }
    if(!exist){
      alert("Pessoa nao cadastrada");
      return
    }

    // Verifica se a pessoa tem menos de 18 anos e se a transação é receita
    if (!menor18 && inputTipoR.current.checked) {
      auxTipo = "receita";
    }
    // Verifica se a transação é despesa
    if (inputTipoD.current.checked) {
      auxTipo = "despesa";
    }

    await api.post("/cadastroTransacao", {
      Descricao: inputDesc.current.value,
      valor: inputValor.current.value,
      tipo: auxTipo,
      id_pessoa: inputId.current.value,
    });
    menor();
    setexist(false);
    getTransacao();
    getPessoas();
  }
  const [listaTransacao, setListaTransacao] = useState([]);

/*Listagem de transaçoes, segue o mesmo conseito do listagem de pessoas*/
  async function getTransacao() {
    const dataFromApi = await api.get("/cadastroTransacao");
    setListaTransacao(dataFromApi.data);
    console.log(dataFromApi.data);
  }

  // Variáveis de estado para armazenar as pessoas e transações
  const [pessoas, setPessoas] = useState([]);
  const [transacao, setTransacao] = useState([]);

  

  // Função para deletar uma pessoa
  async function delPessoa(id) {
    await api.delete(`/cadastroPessoa/${id}`);
    getTransacao();
    getPessoas();
  }

  // Função para buscar todas as pessoas e transações
  async function getPessoas() {
    const dataFromApi = await api.get("/consultaPessoa");
    setTransacao(dataFromApi.data.Consultas_totais);
    setPessoas(dataFromApi.data.Consultas_totais_pessoas);

  }

  // Função que é chamada quando a página é carregada
  useEffect(() => {
    getTransacao();
    getPessoas();
  }, []);

  // Variáveis de estado para controlar a edição de uma pessoa
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [pessoaEditId, setPessoaEditId] = useState();
  const [pessoaEditNome, setPessoaEditNome] = useState();
  const [pessoaEditIdade, setPessoaEditIdade] = useState();

  // Função para editar uma pessoa
  async function edit(pId) {
    console.log(pId);
    setMostrarDiv(false);
    const dataFromApi = await api.get(`/cadastroPessoa/${pId}`);
    console.log(dataFromApi.data);
    const auxData = dataFromApi.data;

    if (auxData.id === pessoaEditId) {
      setPessoaEditId(undefined);
      setPessoaEditNome(undefined);
      setPessoaEditIdade(undefined);
      return;
    }

    setPessoaEditId(auxData.id);
    setPessoaEditNome(auxData.Nome);
    setPessoaEditIdade(auxData.Idade);

    setMostrarDiv(true);
  }

  // Função para confirmar a edição de uma pessoa
  async function editConfirm() {
    
    if(inputEditNome.current.value == "" || inputEditIdade.current.value == "") {
      alert("Preencha todos os campos");
      return;
    }
    

    await api.put(`/cadastroPessoa/${pessoaEditId}`, {
      Nome: inputEditNome.current.value,
      Idade: inputEditIdade.current.value,
    });
    getPessoas();
    getTransacao();
    setMostrarDiv(false);
  }


  // Nesse componente, temos 3 colunas:
  // A primeira coluna, é a do cadastro de pessoa e transação
  // A segunda coluna, é a do total de transações
  // A terceira coluna, é a da lista de pessoas
  return (
    <div className="home">
      <div className="row">
        <div className="column">
          {/* Componente de cadastro de pessoa e transação */}
          <div className="cadPessoa">
            <form>
              <h1>Cadastro Pessoa</h1>
              <input
                
                placeholder="Nome"
                name="nome"
                type="text"
                ref={inputNome}
              />
              <input
                
                placeholder="Idade"
                name="idade"
                type="number"
                ref={inputIdade}
              />
              <button type="button" onClick={cadPessoa}>
                Cadastrar
              </button>
            </form>
          </div>
          <div className="cadPessoa">
            <form>
              <h1>Cadastro Transação</h1>
              <input
                onChange={menor}
                placeholder="Identificador"
                name="id_pessoa"
                type="text"
                ref={inputId}
              />
              <input
                placeholder="Valor"
                type="number"
                min="0.00"
                ref={inputValor}
              />
              <div className="radiobutton">
                {!menor18 && (
                  <div className="radiobutton">
                    <input
                      className="radio"
                      type="radio"
                      id="receita"
                      name="tipo"
                      value={"receita"}
                      ref={inputTipoR}
                    />
                    <label htmlFor="Receita">Receita</label>
                  </div>
                )}

                <input 
                  className="radio"
                  type="radio"
                  id="despesa"
                  name="tipo"
                  value={"despesa"}
                  defaultChecked
                  ref={inputTipoD}
                />
                <label htmlFor="despesa">Despesa</label>
              </div>
              <textarea placeholder="Descrição" ref={inputDesc}></textarea>
              <button type="button" onClick={cadTransacao}>
                Cadastrar
              </button>
            </form>
          </div>
        </div>
        <div className="column">
          {/*Componente do total de transações*/}
          <div className="totalTrasacao">
            <h1>Total das Transações</h1>
            {transacao.map((trans) => (
              <table>
                <tr>
                  <td>
                    <p>Total de Receitas</p>
                  </td>
                  <td>
                    <p><span>R$ {trans.total_receitas}</span></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Total de Despesas</p>
                  </td>
                  <td>
                    <p><span>R$ {trans.total_despesas}</span></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Saldo Liquido</p>
                  </td>
                  <td>
                    <p><span>R$ {trans.saldo_liquido}</span></p>
                  </td>
                </tr>
              </table>
            ))}
          </div>
          <div>
            {/* Componente de edição de pessoa*/}
            {mostrarDiv && (
              <div className="cadTransacao">
                <form>
                  <h1>Editar Pessoa</h1>
                  <input
                    placeholder="Id"
                    defaultValue={pessoaEditId}
                    disabled
                    type="text"
                  />
                  <input
                    placeholder="Nome"
                    defaultValue={pessoaEditNome}
                    type="text"
                    ref = {inputEditNome}
                  />
                  <input
                    placeholder="Idade"
                    defaultValue={pessoaEditIdade}
                    type="number"
                    ref = {inputEditIdade}
                  />
                  <button onClick={editConfirm} type="button">Confirmar</button>
                </form>
              </div>
            )}
          </div>
          <div className="ListaPessoa">
            <h1 >Lista De transações</h1>

            {/*Listagem de transaçoes, segue o mesmo conseito do listagem de pessoas*/}

          {listaTransacao.map((ListTrans) => (
            <div className="listaPessoas">
              <div key={ListTrans.id}>
                <p>Id: <span>{ListTrans.id}</span></p>
                <p>Nome: <span>{ListTrans.Pessoa.nome}</span></p>
                <p>Valor: <span>R$ {ListTrans.valor}</span></p>
                <p>Tipo: <span>{ListTrans.tipo}</span></p>
                <p>Descricao: <span>{ListTrans.Descricao}</span></p>
              </div>
            </div>
          ))}
            </div>
        </div>
        <div className="column">
          {/*Componente da lista de pessoas*/}
          <div className="listaPessoah1">
        <h1 >Lista de pessoas</h1>
          {pessoas.map((pessoa) => (
            <div className="listaPessoas">
              <div key={pessoa.id}>
                <p>Id: <span>{pessoa.id}</span></p>
                <p>Nome: <span>{pessoa.Nome}</span></p>
                <p>Idade: <span>{pessoa.Idade}</span></p>
                <p>Receitas: <span>{pessoa.total_receitas}</span></p>
                <p>Despesas: <span>{pessoa.total_despesas}</span></p>
                <p>Saldo: <span>{pessoa.saldo_total}</span></p>
              </div>
              <div className="icons">
                <button onClick={() => delPessoa(pessoa.id)} type="button">
                  <img src={Trash} height={20} width={20} />
                </button>
                <button onClick={() => edit(pessoa.id)} type="button">
                  <img src={Edit} height={20} width={20} />
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


