import './modal.css';

import { FiChevronLeft } from 'react-icons/fi';

export default function Modal() {
  return(
    <div className="modal">
      <div className="container">
        <button className="close">
          <FiChevronLeft size={20} color="#FFF"/>
        </button>

        <main>
          <h2>Detalhes do Chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>Mercado</i>
            </span>
          </div>
          
          <div className="row">
            <span>
              Assunto: <i>suporte</i>
            </span>
            <span>
              Cadastrado Em: <i>22/11/2024</i>
            </span>
          </div>
          
          <div className="row">
            <span>
              Status: <i>Aberto</i>
            </span>
          </div>

          <>
            <h3 className="modal-msg-title">Mensagem</h3>
            <p>
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla 
            </p>
          </>

        </main>
      </div>
    </div>
  )
}