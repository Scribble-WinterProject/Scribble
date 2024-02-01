import {
createUserAccount,

} from "../appwrite/api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

// export const userSignInMutation = () => {
//   return useMutation({
//     mutationFn: (email, password) => signInAccount(email, password),
//   });
// };

// export const userLogOutMutation = () => {
//   return useMutation({
//     mutationFn: () => logOutUser(),
//   });
// };