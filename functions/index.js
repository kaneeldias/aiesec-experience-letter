const functions = require("firebase-functions");
let test = require("./test.js");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.onNewRequest = functions.firestore.document('/requests/{documentId}')
  .onCreate( async (snap, context) => {
    let docUrl = await test.test(snap.data());
    console.log(docUrl);
    let email = {
      subject: snap.data().name + " has requested for an experience letter.",
      data: snap.data(),
      mcvp_email: 'kaneel.dias2@aiesec.net',
      member_email: snap.data().email,
      docUrl: docUrl
    }
    await db.collection("emails").add(email)
  });

exports.test = functions.https.onRequest(async (req, res) => {
  res.json({result: await test.test()});
});
