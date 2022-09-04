const fs = require("fs");
const documentDAO = require("../dao/documentDao");
const rcaDAO = require("../dao/rcaDao");

class DocumentService {
  async createDocument(readData) {
    const { rca_id } = readData.params;
    let checkRcaid;

    const readFiles = readData.files;

    const readfiletype = [];

    await rcaDAO.isRcaIdExists(rca_id).then((value) => {
      checkRcaid = value.valuecode;
      console.log(checkRcaid);
    });
    for (let i = 0; i < readFiles.length; i++) {
      if (readFiles[i].mimetype == "application/pdf") {
        readfiletype.push(1);
      }
    }

    if (checkRcaid == 1 && readFiles.length == readfiletype.length) {
      return documentDAO.createDocument(rca_id, readFiles);
    } else {
      let filepath = `files\\`;

      for (let i = 0; i < readFiles.length; i++) {
        fs.unlink(
          filepath + readFiles[i].filename,

          (err) => {
            if (err) {
              console.log(err);
            }

            console.log(readFiles[i].filename + " was deleted");
          }
        );
      }

      return {
        statuscode: 400,

        message:
          "Something went wrong while uploading document only pdf format is allowed.",
      };
    }
  }

  async getDocument(readParams) {
    const { rca_id } = readParams;
    let checkRCA;
    await rcaDAO.isRcaIdExists(rca_id).then((value) => {
      checkRCA = value.valuecode;
    });
    if (checkRCA == 1) {
      return documentDAO.getDocument(readParams);
    } else {
      return { statusCode: 400, message: "no documents for given rca_id" };
    }
  }

  async deleteDocument(readParams) {
    const data = await documentDAO.getDocumentByDocumentId(readParams);

    const filepath = `files\\${data}`;

    fs.unlink(
      filepath,

      (err) => {
        if (err) {
          console.log(err);
        }

        console.log(data + " was deleted");
      }
    );

    const value = await documentDAO.deleteDocument(readParams);

    return value;
  }
}

module.exports = new DocumentService();
