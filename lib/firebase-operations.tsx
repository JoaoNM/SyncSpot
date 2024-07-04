// // lib/firebase-operations.ts
// import { ref, set } from "firebase/database";
// import { database } from "../components/firebase-providers";

// export const writeUserData = (userId: string, name: string, email: string) => {
//   set(ref(database, "users/" + userId), {
//     username: name,
//     email: email,
//   });
// };
