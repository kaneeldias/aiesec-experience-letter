const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = {
  create: async function (requestData, docUrl) {
    const emailConfig = (await db.collection('config').doc('email').get()).data();
    let email = {
      to: emailConfig.lcvps_pm[requestData.entity],
      cc: [emailConfig.mcvp_im],
      replyTo: emailConfig.mcvp_tm,
      message: {
        subject: requestData.name + " has requested for an experience letter.",
        text: docUrl
      },
      data: requestData,
    }
    await db.collection("emails").doc(new Date().toISOString() + email).set(email)
  }
};
