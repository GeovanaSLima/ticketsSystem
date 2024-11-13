import './profile.css';

import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import avatar from '../../assets/img/avatar.png';

import { FiSettings, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile() {
  const { user, setUser, storageUser, logOut } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    const image = e.target.files[0];
    
    if(image) {
      if(image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG")
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUID = user.uid;

    const uploadRef = ref(storage, `images/${currentUID}/${imageAvatar.name}`);

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        let urlFoto = downloadURL;
        const docRef = doc(db, "users", user.uid)

        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          name: name,
        })
        .then(() => {
          let data = {
            ...user,
            avatarUrl: urlFoto,
            name: name
          }
  
          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso!")
        })
      })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if(imageAvatar === null && name !== '') {
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        name: name
      })
      .then(() => {
        let data = {
          ...user,
          name: name
        }

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!")
      })
    } else if(name !== '' && imageAvatar !== null) {
      handleUpload()
    }
  }

  return(
    <div>
      <Sidebar />

      <div className="content">
        <Title titleName="Meu Perfil">
          <FiSettings size={30} />
        </Title>

        <div className="container">
          
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /> <br/>
              {avatarUrl === null ? (
                <img src={avatar} alt="Foto de Perfil" width={250} height={250} />
              ) : (
                <img src={avatarUrl} alt="Foto de Perfil" width={250} height={250} />
              )}
            </label>

            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            
            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>

          </form>

        </div>

        <div className="container">
          <button className="logout-btn" onClick={ () => logOut() }> Sair</button>
        </div>

      </div>
    </div>
  )
}