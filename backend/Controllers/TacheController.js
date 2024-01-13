const MyList = require("../models/ListeSchema");

const get_All_Taches = async (req, res) => {
  try {
    const result = await MyList.find();
    res.json(result);
  } catch (err) {
    res.json("Aucune tache trouver dans la liste");
  }
};

const get_Tache_Id = async (req, res) => {
  try {
    const tacheId = req.params.id;
    console.log(tacheId);
    const searchTache = await MyList.findById(tacheId);
    console.log(searchTache);
    if (searchTache) res.json(searchTache);
    else res.status(404).json("La tache n'existe pas");
  } catch (err) {
    res.json({ message: "Erreur lors de la récupération de la tâche" });
  }
};

const post_Create_Tache = async (req, res) => {
  console.log(req.data);
  try {
    const { tache, date_fin, etat } = req.body;
    if (!tache) {
      return res.status(400).json({ message: 'Le champ "tache" est requis' });
    }
    const mytache = new MyList({ tache, date_fin, etat });
    const nouveauTache = await mytache.save();
    res.json(nouveauTache);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la sauvegarde de la tâche",
        error: err.message,
      });
  }
};

const put_Update_Tache = async (req, res) => {
  try {
    const tacheId = req.params.id;
    const updateData = await MyList.findByIdAndUpdate(tacheId, req.body, {
      new: true,
    });
    if (updateData) res.json(updateData);
    else res.status(404).json("La tache non trouvable");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la tâche" });
  }
};

const delete_Delete_Tache = async (req, res) => {
  try {
    const tacheId = req.params.id;
    const deletedTask = await MyList.findByIdAndDelete(tacheId);
    if (deletedTask) {
      res.json({ message: "Tâche supprimée avec succès" });
    } else {
      res.status(404).json({ message: "Tâche non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la tâche" });
  }
};

module.exports = {
  get_All_Taches,
  get_Tache_Id,
  post_Create_Tache,
  put_Update_Tache,
  delete_Delete_Tache,
};
