import Title from '../../components/Title';
import Sidebar from '../../components/Sidebar';

import './newTicket.css';

import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';


const listRef = collection(db, "customers");


export default function NewTicket() {
  const { user } = useContext(AuthContext);
  
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [loadCustomer, setLoadingCustomer] = useState(true);

  const [mensagem, setMensagem] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");

  useEffect(() => {
    async function loadCustomer() {
      const querySnapshot = await getDocs(listRef)
      .then( (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })

        if (snapshot.docs.size === 0) {
          console.log("NENHUMA EMPRESA ENCONTRADA");
          setCustomers([ { id: "'", nomeFantasia: "Freela" } ])
          setLoadingCustomer(false);
          return;
        } 

        setCustomers(lista);
        setLoadingCustomer(false);

        console.log(lista);
      })
      .catch((error) => {
        console.log("Erro ao buscar os clientes", error)
        setLoadingCustomer(false);
        setCustomers([ { id: "'", nomeFantasia: "Freela" } ])
      })
    }

    loadCustomer();
  }, [])

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  function handleCustomerChange(e) {
    setCustomerSelected(e.target.value);
  }


  return(
    <div>
      <Sidebar/>

      <div className="content">
        <Title titleName="Novo Chamado">
          <FiPlusCircle size={30}/>
        </Title>

        <div className="container">
          <form action="" className="form-profile">
            
            <label>Clientes</label>
            {
              loadCustomer ? (
                <input type="text" disabled={true} value="Carregando..." />
              ) : (
                <select value={customerSelected} onChange={handleCustomerChange}>
                  {customers.map((item, index) => {
                    return(
                      <option key={index} value={index}>
                        {item.nomeFantasia}
                      </option>
                    )
                  })}
                </select>
              )
            }

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              
              <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={ status === "Aberto" } />
              <span>Em aberto</span>
              
              <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={ status === "Progresso" } />
              <span>Em Progresso</span>
              
              <input type="radio" name="radio" value="Finalizado" onChange={handleOptionChange} checked={ status === "Finalizado" } />
              <span>Finalizado</span>

            </div>

            <label>Mensagem</label>
            <textarea type="text" value={mensagem} onChange={ (e) => setMensagem(e.target.value)} placeholder="Descreva seu problema"></textarea>

            <button type="submit">Criar Chamado</button>

          </form>
        </div>

      </div>

    </div>
  )
}