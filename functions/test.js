const googleDrive = require('@googleapis/drive')
const googleDocs = require('@googleapis/docs')
const {GoogleAuth} = require('google-auth-library');

module.exports = {
  test: async function () {

    const auth = new GoogleAuth({
      keyFilename: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']
    });
    const authClient = await auth.getClient();

    const driveClient = await googleDrive.drive({
      version: "v2",
      auth: auth
    });
    let copyDocumentId = await copyTemplate(driveClient, "Kaneel Dias Experience Letter");

    const docsClient = await googleDocs.docs({
      version: 'v1',
      auth: auth
    });

    let requests = [
      {
        replaceAllText: {
          containsText: {text: '{{name}}'},
          replaceText: "Kaneel Dias",
        },
      }
    ];

    let res = await docsClient.documents.batchUpdate({
      documentId: copyDocumentId,
      resource: {
        requests
      }
    })

    return "https://docs.google.com/document/d/" + res.data.documentId;
  },
};

async function copyTemplate(driveClient, docName) {
  let request = {
    title: docName,
  };
  let response = await driveClient.files.copy({
    fileId: "1mvVXhM36vkFzR02y0lUnE1sWIhrKm64eIBx7QEtHSdM",
    resource: request,
  });
  return response.data.id;
}
