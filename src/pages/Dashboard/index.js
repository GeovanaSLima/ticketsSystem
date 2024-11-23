import './dashboard.css';
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

const listRef = collection(db, "tickets");

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {

    async function loadTickets() {
      const ticketsQuery = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnapshot = await getDocs(ticketsQuery)
      await updateState(querySnapshot)

      setLoading(false);

    }

    loadTickets();

    return () => { }
  }, [])

  async function updateState(querySnapshot) {
    const isEmpty = querySnapshot.size === 0;

    if (!isEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          customer: doc.data().customer,
          customerId: doc.data().customerId,
          created: doc.data().created,
          status: doc.data().status,
          message: doc.data().message 
        })
      })

      setTickets(tickets => [...tickets, ...lista])
    } else {
      setIsEmpty(true);
    }
  }


  return(
    <div>

      <Sidebar />

      <div className="content">
        <Title titleName="Tickets">
          <FiMessageSquare size={30} />
        </Title>

        <>

          {tickets.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado...</span>
              <Link to="/new" className="new">
                <FiPlus size={25} />
                Novo chamado
              </Link>
            </div>
          ) : (
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
          )}

        </>
      </div>
    </div>
  )
}