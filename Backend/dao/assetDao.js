const { default: knex } = require('knex');
const db = require('../db/db');
class assetDao {

    async assetList(rcaId) {
        try {
            const list = await db('Assets').where({ rcaId: rcaId });
            return list;
        }
        catch (err) {
            return "err";
        }
    }

    async createAsset(rcaId, plant, processArea, asset) {
        try {
            const [rcaId2] = await db('Assets').insert({

                plant: plant,
                processArea: processArea,
                asset: asset,
                rcaId: rcaId,

            })
                .returning('rcaId');
            const asset2 = [rcaId2, plant, processArea, asset]
            return asset2;
        }
        catch (err) {
            return "err";
        }
    }

    async updateAsset(rcaId, assetId, plant, processArea) {
        try {
            const [asset2] = await db('Assets')
                .where({ assetId: assetId, rcaId: rcaId })
                .update({
                    plant: plant,
                    processArea: processArea,

                })
                .returning(['assetId']);
            return asset2;
        }
        catch (err) {
            return "err";
        }
    }

    async deleteAsset(rcaId, assetId) {
        try {
            const asset = await db('Assets').where({ assetId: assetId, rcaId: rcaId }).del();
            return "successfully deleted !!!";
        }
        catch (err) {
            return "err";
        }

    }

    async getAsset(rcaId,assetId)
    {
        try {
            const asset = await db('Assets').where({  assetId: assetId, rcaId: rcaId });
            return asset;
        }
        catch (err)
        {
            return "err";
        }
    }
}

module.exports = new assetDao();
