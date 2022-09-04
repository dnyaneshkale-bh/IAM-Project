const assetService = require('../service/assetService');
class asestController{

    async assetList(req,res){
        try{
            const rcaId = req.params.rca_id;
            
            const list = await assetService.assetList(rcaId);
            if(list == "err")
            {
                res.status(424).json(list);
            }
            else
            {
            res.status(200).json(list);
            }
        }
        catch(err){
            console.log(err);
            res.status(400);
        }
    }

    async createAsset(req,res){
        try{
            const rcaid = await assetService.createAsset(req.body,req.params.rca_id);
            if(rcaid == "err")
            {
                res.status(400).json(rcaid);
            }
            else
            {
            res.status(201).json(rcaid);
            }
        }
        catch(err){
            
            res.status(400);
        }
    }

    async updateAsset(req,res){ 
        try{
               const rcaId = req.params.rca_id;
               const {assetId} = req.params;
               const asset = await assetService. updateAsset({...req.body,rcaId,assetId});
            if(asset == "err")
            {
                res.status(500).json(asset);
            }
            else
            {
                res.status(200).json(asset);
            }

           }
           catch(err){
               console.log(err);
               res.status(400);
           }
    }   

    async deleteAsset(req,res){
        try
        {
            const rcaId = req.params.rca_id;
            const {assetId} = req.params;
            const assets = await assetService.deleteAsset(rcaId,assetId);
            console.log(assets);
            if(assets == "successfully deleted !!!")
            {
                res.status(404).json(assets);
            }
            else
            {
                res.status(204).json(assets);
            }
        }
        catch(err){
            console.log(err);
            res.status(400);
        }
    }

    async getAsset(req,res){
        try
        {
            const rcaId = req.params.rca_id;
            const {assetId} = req.params;
            const asset = await assetService.getAsset(rcaId,assetId);
            if(asset == "err")
            {
                res.status(424).json(asset);
            }
            else
            {
            res.status(200).json(asset);
            }
        }
        catch(err)
        {
            console.log(err);
            res.status(400);
        }
    }

}
module.exports = new asestController();

