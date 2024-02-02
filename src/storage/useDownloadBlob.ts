// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { useState } from "react";

type UseDownloadBlobParams = {
  reference: StorageReference;
};

type UseDownloadBlobState = "ready" | "loading" | "done";
type UseDownloadBlobDispatcher = () => Promise<Blob>;
type UseDownloadBlob = {
  state: UseDownloadBlobState;
  dispatch: UseDownloadBlobDispatcher;
};

export const useDownloadBlob = ({
  reference,
}: UseDownloadBlobParams): UseDownloadBlob => {
  const [state, setState] = useState<UseDownloadBlobState>("ready");
  const [blob, setBlob] = useState<Blob | undefined>(undefined);

  const dispatch: UseDownloadBlobDispatcher = async () => {
    throw "tbi";
  };

  return { state, dispatch };
};
