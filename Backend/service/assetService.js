const assetDao = require('../dao/assetDao')
class assetService {

    assetList(rcaId){

        return assetDao.assetList(rcaId);
    }

    createAsset(assetDto,rcaId){
        const {plant,processArea,asset} = assetDto;
        
        return assetDao.createAsset(rcaId,plant,processArea,asset);
    
    }

    async updateAsset(assetDetails){ 
        const {rcaId,assetId,plant,processArea} = assetDetails;
        return assetDao.updateAsset(rcaId,assetId,plant,processArea);
                
    }

    deleteAsset(rcaId,assetId){
        
        return assetDao.deleteAsset(rcaId,assetId);
    }

    getAsset(rcaId,assetId){

        return assetDao.getAsset(rcaId,assetId);
    }

}   

module.exports = new assetService();