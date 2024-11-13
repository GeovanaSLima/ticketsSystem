import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  async function handleLogOut() {
    await logOut();
  }

  return(
    <div>

      <Sidebar />

      <h1>dash</h1>
      <button onClick={handleLogOut}>Sair</button>
    </div>
  )
}