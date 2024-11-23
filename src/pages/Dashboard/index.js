import './dashboard.css';
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

import { db } from '../../services/firebaseConnection';
import { AuthContext } from "../../contexts/auth";
import Modal from '../../components/Modal';

const listRef = collection(db, "tickets");

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [loadingMore, setLoadingMore] = useState(false);

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

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length -1] 
      
      setTickets(tickets => [...tickets, ...lista])
      setLastDoc(lastDoc);

    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);

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

  async function handleMore() {
    setLoadingMore(true);

    const ticketsQuery = query(listRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(5));
    const querySnapshot = await getDocs(ticketsQuery);
    await updateState(querySnapshot);

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
                          <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5CB85C' : '#999'}}>
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <Link className="action" style={{ backgroundColor: "#3583F6" }}>
                            <FiSearch color="#FFF" size={17} />
                          </Link>
                          <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: "#F6A935" }}>
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && <h3 className="title-more">Buscando mais chamados...</h3>}
              {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}

            </>
          )}

        </>
      </div>

      <Modal/>
      
    </div>
  )
}