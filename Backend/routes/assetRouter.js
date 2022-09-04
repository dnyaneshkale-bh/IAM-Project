const express = require('express');
const assetController = require('../controller/assetController');
const router = express.Router({ mergeParams: true });


router.get('',assetController.assetList);
router.post('',assetController.createAsset);
router.put('/:assetId',assetController.updateAsset);
router.delete('/:assetId',assetController.deleteAsset);
router.get('/:assetId',assetController.getAsset);



module.exports = router;