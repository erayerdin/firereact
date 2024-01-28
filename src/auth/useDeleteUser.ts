// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseDeleteUserState = "anonymous";
type UseDeleteUser = {
  state: UseDeleteUserState;
};

export const useDeleteUser = (): UseDeleteUser => {
  return { state: "anonymous" };
};
