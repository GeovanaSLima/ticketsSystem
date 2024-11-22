import './dashboard.css';
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  async function handleLogOut() {
    await logOut();
  }

  return(
    <div>

      <Sidebar />

      <div className="content">
        <Title titleName="Tickets">
          <FiMessageSquare size={30} />
        </Title>

        <>
          <Link to="/new" className="new">
            <FiPlus size={25} />
            Novo chamado
          </Link>

          <table>
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Assunto</th>
                <th scope="col">Status</th>
                <th scope="col">Cadastrado em</th>
                <th scope="col">#</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td data-label="Cliente">Empresa Teste</td>
                <td data-label="Assunto">Suporte</td>
                <td data-label="Status">
                  <span className="badge" style={{ backgroundColor: '#999' }}>Em Aberto</span>
                </td>
                <td data-label="Cadastrado">12/11/2024</td>
                <td data-label="#">
                  <button className="action" style={{ backgroundColor: "#3583F6" }}>
                    <FiSearch color="#FFF" size={17} />
                  </button>
                  <button className="action" style={{ backgroundColor: "#F6A935" }}>
                    <FiEdit2 color="#FFF" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  )
}