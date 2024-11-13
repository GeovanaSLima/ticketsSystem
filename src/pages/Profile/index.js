import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

import { FiSettings } from "react-icons/fi";

export default function Profile() {
  return(
    <div>
      <Sidebar />

      <div className="content">
        <Title titleName="Meu Perfil">
          <FiSettings size={30} />
        </Title>
      </div>
      <h1>Profile</h1>
    </div>
  )
}