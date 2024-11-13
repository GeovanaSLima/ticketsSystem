import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);

  async function handleLogOut() {
    await logOut();
  }

  return(
    <div>
      <h1>dash</h1>

      <button onClick={handleLogOut}>Sair</button>
    </div>
  )
}