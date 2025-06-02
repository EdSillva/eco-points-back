import { auth } from "../config/firebaseAdmin.js";
export async function verifyFirebaseToken(token) {
    return await auth.verifyIdToken(token);
}
