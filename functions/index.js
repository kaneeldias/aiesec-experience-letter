const functions = require("firebase-functions");
let test = require("./test.js");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.onNewRequest = functions.firestore.document('/requests/{documentId}')
  .onCreate( async (snap, context) => {
    let docUrl = await test.test(snap.data());

    const emailConfig = (await db.collection('config').doc('email').get()).data();

    let email = {
      to: emailConfig.lcvps_pm[snap.data().entity],
      cc: [emailConfig.mcvp_im],
      replyTo: emailConfig.mcvp_tm,
      message: {
        subject: snap.data().name + " has requested for an experience letter.",
        text: docUrl
      },
      data: snap.data(),
    }
    await db.collection("emails").add(email)
  });
