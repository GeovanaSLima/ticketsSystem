import './modal.css';

import { FiChevronLeft } from 'react-icons/fi';

export default function Modal({ content, closeModal }) {
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ closeModal }>
          <FiChevronLeft size={20} color="#FFF"/>
        </button>

        <main>
          <h2>Detalhes do Chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{content.customer}</i>
            </span>
          </div>
          
          <div className="row">
            <span>
              Assunto: <i>{content.assunto}</i>
            </span>
            <span>
              Cadastrado Em: <i>{content.createdFormat}</i>
            </span>
          </div>
          
          <div className="row">
            <span>
              Status: 
              <i className="status-badge" style={{ color: "#FFF", backgroundColor: content.status === 'Aberto' ? "#999": "#5CB85C" }} >
                {content.status}
              </i>
            </span>
          </div>

            {content.message !== '' && (
              <>
                <h3 className="modal-msg-title">Mensagem</h3>
                <p>
                  {content.message}
                </p>
              </>
            )}

        </main>
      </div>
    </div>
  )
}