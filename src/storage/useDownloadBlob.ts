// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseDownloadBlobState = "ready";
type UseDownloadBlob = {
  state: UseDownloadBlobState;
};

export const useDownloadBlob = (): UseDownloadBlob => {
  return {
    state: "ready",
  };
};
