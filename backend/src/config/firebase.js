import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

let auth = null;

export function initializeFirebase() {
  if (auth) return auth;
  
const serviceAccountPath = path.resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT ?? "./firebase-service-account.json"
);

  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert(serviceAccount),
        });

  auth = getAuth(app);

  return auth;
}

export { auth };