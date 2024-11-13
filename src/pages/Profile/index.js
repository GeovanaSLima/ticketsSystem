import './profile.css';

import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import avatar from '../../assets/img/avatar.png';

import { FiSettings, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return(
    <div>
      <Sidebar />

      <div className="content">
        <Title titleName="Meu Perfil">
          <FiSettings size={30} />
        </Title>

        <div className="container">
          
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" /> <br/>
              {avatarUrl === null ? (
                <img src={avatar} alt="Foto de Perfil" width={250} height={250} />
              ) : (
                <img src={avatarUrl} alt="Foto de Perfil" width={250} height={250} />
              )}
            </label>

            <label>Nome</label>
            <input type="text" placeholder="Seu Nome" />
            
            <label>Email</label>
            <input type="text" placeholder="test@test.com" disabled={true} />

            <button type="submit">Salvar</button>

          </form>

        </div>

        <div className="container">
          <button className="logout-btn"> Sair</button>
        </div>

      </div>
    </div>
  )
}