import Title from '../../components/Title';
import Sidebar from '../../components/Sidebar';

import './newTicket.css';

import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';

export default function NewTicket() {
  const [customer, setCustomer] = useState([]);

  const [mensagem, setMensagem] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");

  function handleOptionChange(e) {
    setStatus(e.target.value);
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
            <select>
              <option key={1} value={1}>Mercado Teste</option>
              <option key={2} value={2}>Info</option>
            </select>

            <label>Assunto</label>
            <select>
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