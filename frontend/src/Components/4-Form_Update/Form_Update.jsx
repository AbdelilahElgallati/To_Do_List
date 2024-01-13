import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Form_Update.css'

const FormUpdate = () => {

  const [tache,setTache] = useState('');
  const [etat,setEtat] = useState('à faire');
  const [date_fin,setDate_fin] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les données de tache à mettre à jour
    axios.get('http://localhost:3000/taches/update/' + id)
      .then(res => {
        if (res.data) {
          console.log(res.data)
          const { tache, etat, date_fin } = res.data;
          setTache(tache);
          setEtat(etat);
          const formattedDate = new Date(date_fin).toISOString().split('T')[0];
          setDate_fin(formattedDate);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit (event){
    event.preventDefault();
    console.log(id);
    // axios.put('http://localhost:3000/update/' + id,{tache,date_fin,etat})
    axios.put('http://localhost:3000/taches/update/' + id,{tache,date_fin,etat})
    .then(res => { 
      navigate('/');
    }).catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className='formUpdate' action="" method="post">
      <div>
        <label htmlFor="nom">Tâche :</label>
        <input type="text" name="tache" id='tache' value={tache}
          onChange={e=>setTache(e.target.value)}
        />
        <input type="hidden" name="etat" value="à faire" id='etat' 
        />
      </div>
      <div>
        <label htmlFor="nom">Date fin :</label>
        <input type="date" name="date" id='date' value={date_fin}
          onChange={e=>setDate_fin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="etat">Etat de tâche :</label>
        <select name="etat" id="etat"
          value={etat}
          onChange={(e) => setEtat(e.target.value)}
        >
          <option value="à faire">à faire</option>
          <option value="complétée">Complétée</option>
        </select>
      </div>
      <button type="submit">Modifier la tâche</button>
    </form>
  );
}

export default FormUpdate;
