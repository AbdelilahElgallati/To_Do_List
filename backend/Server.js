const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const MyList = require('./models/ListeSchema');

const TacheRoutes = require('./Routes/TacheRoute')

const app = express()


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/taches',TacheRoutes);


// app.get('/', async (req, res)=>{
//   try{
//     const result = await MyList.find();
//     res.json(result)
//   } catch(err){
//     res.json('Aucune tache trouver dans la liste')
//   }
// })

// app.get('/update/:id', async (req, res)=>{
//   try{
//     const tacheId = req.params.id;
//     console.log(tacheId);
//     const searchTache = await MyList.findById(tacheId)
//     console.log(searchTache);
//     if(searchTache) res.json(searchTache)
//     else res.status(404).json("La tache n'existe pas")
//   } catch(err) {
//     res.json({ message: 'Erreur lors de la récupération de la tâche' });
//   }
// })

// app.post('/create', async (req, res) => {
//   console.log(req.data);
//   try {
//     const { tache, date_fin, etat } = req.body;
//     if (!tache) {
//       return res.status(400).json({ message: 'Le champ "tache" est requis' });
//     }
//     const mytache = new MyList({ tache, date_fin, etat });
//     const nouveauTache = await mytache.save();
//     res.json(nouveauTache);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur lors de la sauvegarde de la tâche', error: err.message });
//   }
// });

// app.put('/update/:id', async (req,res)=>{
//   try{
//     const tacheId = req.params.id;
//     const updateData = await MyList.findByIdAndUpdate(tacheId,req.body,{new:true});
//     if(updateData) res.json(updateData)
//     else res.status(404).json("La tache non trouvable")
//   }catch(err) {
//     res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
//   }
// })



// app.delete('/delete/:id', async (req,res)=>{
//   try{
//     const tacheId= req.params.id;
//     const deletedTask = await MyList.findByIdAndDelete(tacheId)
//     if (deletedTask) {
//       res.json({ message: 'Tâche supprimée avec succès' });
//     } else {
//       res.status(404).json({ message: 'Tâche non trouvée' });
//     }
//   } catch(err) {
//     res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
//   }
  
// })

mongoose
  .connect('mongodb://127.0.0.1:27017/ToDoList', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Connection to database'))
  .catch((err)=>console.error(`Error connection to the database ${err}`));

app.listen(3000, ()=> console.log('Listening on port 3000'));