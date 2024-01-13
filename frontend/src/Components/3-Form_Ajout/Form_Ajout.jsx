import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Form_Ajout.css'

const FormAjout = () => {

  const [tache,setTache] = useState('');
  const [etat,setEtat] = useState('à faire');
  const [date_fin,setDate_fin] = useState('');

  const navigate = useNavigate();

  function handleSubmit (event){
    event.preventDefault();
    axios.post('http://localhost:3000/taches/create',{tache,date_fin,etat})
      .then(res => { 
        navigate('/');
      }).catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className='formAjoute' action="" method="post">
      <div>
        <label htmlFor="nom">Tâche :</label>
        <input type="text" name="tache" id='tache' 
          onChange={e=>setTache(e.target.value)}
        />
        <input type="hidden" name="etat" value="à faire" id='etat' 
        />
      </div>
      <div>
        <label htmlFor="nom">Date fin :</label>
        <input type="date" name="date" id='date' 
          onChange={e=>setDate_fin(e.target.value)}
        />
      </div>
      <button type="submit">Ajouter la tâche</button>
    </form>
  );
}

export default FormAjout;
