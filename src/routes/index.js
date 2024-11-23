import { Routes, Route } from "react-router-dom";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from "../pages/Dashboard";
import Private from "./Private";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import NewTicket from "../pages/NewTicket";

function RoutesApp() {
  return(
    <Routes>
      <Route path="/"          element={ <SignIn/> } />
      <Route path="/register"  element={ <SignUp/> } />
      
      <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
      <Route path="/profile"   element={ <Private> <Profile/>   </Private> } />
      <Route path="/customers" element={ <Private> <Customers/> </Private> } />
      <Route path="/new"       element={ <Private> <NewTicket/> </Private> } />
      <Route path="/new/:id"    element={ <Private> <NewTicket/> </Private> } />
    </Routes>
  )
}

export default RoutesApp;