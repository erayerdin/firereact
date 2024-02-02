// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";

type UseDownloadBlobParams = {
  reference: StorageReference;
};

type UseDownloadBlobState = "ready";
type UseDownloadBlobDispatcher = () => Promise<Blob>;
type UseDownloadBlob = {
  state: UseDownloadBlobState;
  dispatch: UseDownloadBlobDispatcher;
};

export const useDownloadBlob = ({
  reference,
}: UseDownloadBlobParams): UseDownloadBlob => {
  return {
    state: "ready",
    dispatch: async () => {
      throw "tbi";
    },
  };
};
