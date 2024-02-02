// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { useState } from "react";

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
  const [state, setState] = useState<UseDownloadBlobState>("ready");

  return {
    state,
    dispatch: async () => {
      throw "tbi";
    },
  };
};
