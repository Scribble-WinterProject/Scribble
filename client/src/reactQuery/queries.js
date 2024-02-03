import {
createUserAccount,
  passwordEmail,
  resetPassword,
signInAccount
} from "../appwrite/api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const userSignInMutation = () => {
  return useMutation({
    mutationFn: (user) =>
      signInAccount(user.email, user.password),
  });
};

export const userForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: ({userId, secret, password}) =>
      resetPassword(userId, secret, password),
  });
};

export const useEmailVerificationMutation = () => {
  return useMutation({
    mutationFn: (email) => passwordEmail(email),
  });
};

// export const userLogOutMutation = () => {
//   return useMutation({
//     mutationFn: () => logOutUser(),
//   });
// };