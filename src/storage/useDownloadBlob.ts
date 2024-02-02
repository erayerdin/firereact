// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type UseDownloadBlobState = "ready";
type UseDownloadBlobDispatcher = () => Promise<Blob>;
type UseDownloadBlob = {
  state: UseDownloadBlobState;
  dispatch: UseDownloadBlobDispatcher;
};

export const useDownloadBlob = (): UseDownloadBlob => {
  return {
    state: "ready",
    dispatch: async () => {
      throw "tbi";
    },
  };
};
