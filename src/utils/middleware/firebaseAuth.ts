import { auth } from "../config/firebaseAdmin.js";

export async function verifyFirebaseToken(token: string) {
  return await auth.verifyIdToken(token);
}
