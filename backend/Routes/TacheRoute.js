const express = require('express');
const router = express.Router();
const TacheController = require('../Controllers/TacheController');

router.get('/',TacheController.get_All_Taches);
router.get('/update/:id',TacheController.get_Tache_Id);
router.post('/create',TacheController.post_Create_Tache);
router.put('/update/:id',TacheController.put_Update_Tache);
router.delete('/delete/:id',TacheController.delete_Delete_Tache);

module.exports = router;