import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc  } from "firebase/firestore";

import { auth, db } from '../services/firebaseConnection';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigate = useNavigate();

  function signIn(email, password) {
    console.log(email);
    console.log(password);
    alert('logado')
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        name: name,
        avatarUrl: null
      })
      .then( () => {
        
        let data = {
          uid: uid,
          name: name,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Seja bem-vindo(a)");
        navigate("/dashboard")
      })


    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
    })

  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data));
  }
  
  return(
    <AuthContext.Provider 
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;