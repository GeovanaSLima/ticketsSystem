import Title from '../../components/Title';
import Sidebar from '../../components/Sidebar';

import './newTicket.css';

import { FiEdit2, FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const listRef = collection(db, "customers");


export default function NewTicket() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate("/dashboard");
  
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [loadCustomer, setLoadingCustomer] = useState(true);
  const [idCustomer, setIdCustomer] = useState(false);

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
          toast.error("NENHUMA EMPRESA ENCONTRADA")
          setCustomers([ { id: "'", nomeFantasia: "Freela" } ])
          setLoadingCustomer(false);
          return;
        } 

        setCustomers(lista);
        setLoadingCustomer(false);

        if (id) {
          loadIdInfo(lista);
        }

      })
      .catch((error) => {
        console.log("Erro ao buscar os clientes", error)
        setLoadingCustomer(false);
        setCustomers([ { id: "'", nomeFantasia: "Freela" } ])
      })
    }

    loadCustomer();
  }, [id])

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  function handleCustomerChange(e) {
    setCustomerSelected(e.target.value);
  }

  async function handleSaving(e) {
    e.preventDefault();

    if (idCustomer) {
      const docRef = doc(db, "tickets", id)
      await updateDoc(docRef, {
        customer: customers[customerSelected].nomeFantasia,
        customerId: customers[customerSelected].id,
        assunto: assunto,
        message: mensagem,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.info("Chamado atualizado com sucesso!")
        setCustomerSelected(0);
        setMensagem('');
        navigate()
      })
      .catch(() => {
        toast.error("Erro ao atualizar esse chamado!")
      })

      return;
    }

    await addDoc(collection(db, "tickets"), {
      created: new Date(),
      customer: customers[customerSelected].nomeFantasia,
      customerId: customers[customerSelected].id,
      assunto: assunto,
      message: mensagem,
      status: status,
      userId: user.uid,
    })
    .then(() => {
      toast.success("Chamado Registrado");
      setMensagem('');
      setCustomerSelected(0);
      navigate()
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erro ao registrar. Tente novamente")
    })
  }

  async function loadIdInfo(lista) {
    const docRef = doc(db, "tickets", id);
    await getDoc(docRef)
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setMensagem(snapshot.data().message);

      let index = lista.findIndex(item => item.id === snapshot.data().customerId)
      setCustomerSelected(index);
      setIdCustomer(true);

    })
    .catch((error) => {
      console.log(error);
      toast.error("Chamado não encontrado");
      navigate();
    })
  }


  return(
    <div>
      <Sidebar/>

      <div className="content">
        <Title titleName={ idCustomer ? "Editar Chamado" : "Novo Chamado" }>
          {idCustomer ? (
            <FiEdit2 size={30} />
          ) : (
            <FiPlusCircle size={30}/>
          )}
        </Title>

        <div className="container">
          <form onSubmit={handleSaving} className="form-profile">
            
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

            <button type="submit">
              {idCustomer ? (
                "Salvar"
              ) : (
                "Criar Chamado"
              )}
            </button>

          </form>
        </div>

      </div>

    </div>
  )
}