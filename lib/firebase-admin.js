const { credential } = require('firebase-admin');
const { initializeApp, getApps, getApp } = require('firebase-admin/app');
const { getFirestore } = require("firebase-admin/firestore")

const firebaseAdminConfig = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  }

const firebaseApp = !getApps().length ? initializeApp({ credential: credential.cert(firebaseAdminConfig) }) : getApp();
const firebaseDB = getFirestore()

module.exports = { firebaseApp, firebaseDB}