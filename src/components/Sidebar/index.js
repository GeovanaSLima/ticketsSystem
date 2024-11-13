import './sidebar.css';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import avatarImg from '../../assets/img/avatar.png';

import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
  const { user } = useContext(AuthContext)
  return(
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto de Usuário" />
      </div>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>

      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>

      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </div>
  )
}