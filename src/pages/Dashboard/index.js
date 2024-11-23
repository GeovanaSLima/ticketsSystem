import './dashboard.css';
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

import { db } from '../../services/firebaseConnection';
import { AuthContext } from "../../contexts/auth";

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
      setTickets([]);

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
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          message: doc.data().message 
        })
      })

      setTickets(tickets => [...tickets, ...lista])
    } else {
      setIsEmpty(true);
    }
  }

  if (loading) {
    return(
      <div>
        <Sidebar/>

        <div className="content">
          <Title titleName="Tickets">
            <FiMessageSquare size={30} />
          </Title>

          <div className="container dashboard">
            <span>Buscando Chamados...</span>
          </div>
        </div>
      </div>
    )
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
                  {tickets.map((item, index) => {
                    return(
                      <tr key={index}>
                        <td data-label="Cliente">{item.customer}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          <span className="badge" style={{ backgroundColor: '#999' }}>{item.status}</span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: "#3583F6" }}>
                            <FiSearch color="#FFF" size={17} />
                          </button>
                          <button className="action" style={{ backgroundColor: "#F6A935" }}>
                            <FiEdit2 color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            </>
          )}

        </>
      </div>
    </div>
  )
}