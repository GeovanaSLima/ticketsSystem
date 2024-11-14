import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function Customers() {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    if(name !== '' && cnpj !== '' && endereco !== '') {
      await addDoc(collection(db, "customers"), {
        nomeFantasia: name,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(() => {
        setName('')
        setCnpj('')
        setEndereco('')
        toast.success("Empresa cadastrada com sucesso!")
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao fazer o cadastro")
      })

    } else {
      toast.error("Preencha todos os campos")
    }

  }
  
  return(
    <div>
      <Sidebar />

      <div className="content">
        <Title titleName="Clientes">
          <FiUser size={30} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            
            <label>Nome Fantasia</label>
            <input type="text" placeholser="Nome da empresa" value={name} onChange={(e) => setName(e.target.value)} />
            
            <label>CNPJ</label>
            <input type="text" placeholser="Digite o CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
            
            <label>Endereço</label>
            <input type="text" placeholser="Endereço da Empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

            <button type="submit">Salvar</button>

          </form>
        </div>

      </div>
      
    </div>
  )
}