// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseUploadFile = {
  state: "ready";
};

export const useUploadFile = (): UseUploadFile => {
  return { state: "ready" };
};
