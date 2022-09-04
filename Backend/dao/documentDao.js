const db = require("../db/db");

class DocumentDAO {
  async createDocument(rcaid, readFiles) {
    let allresdata = [];

    for (let i = 0; i < readFiles.length; i++) {
      const resdata = await db("documents").insert({
        document_name: readFiles[i].originalname,

        document_modified_name: readFiles[i].filename,

        rca_id: rcaid,
      });

      allresdata.push(resdata.rowCount);
    }

    const reslength = allresdata.length;

    const insertError = allresdata.includes(0);

    if (reslength == readFiles.length && insertError != true) {
      const data = await db("documents").where("rca_id", rcaid);

      return {
        message: "Document uploaded successfully",
        data,
        statuscode: 201,
      };
    }

    return {
      message: "Something went wrong while uploading document",
      data,
      statuscode: 400,
    };
  }

  async getDocument(readParams) {
    const data = await db("documents").where("rca_id", readParams.rca_id);

    return { data, statusCode: 200 };
  }

  async deleteDocument(readParams) {
    const data = await db("documents")
      .where("rca_id", readParams.rca_id)
      .andWhere("document_id", readParams.document_id)
      .del();

    return data;
  }

  async getDocumentByDocumentId(readParams) {
    const data = await db("documents")
      .where("rca_id", readParams.rca_id)
      .andWhere("document_id", readParams.document_id);

    let documentmodifiedname = data[0].document_modified_name;

    return documentmodifiedname;
  }
}

module.exports = new DocumentDAO();
