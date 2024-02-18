// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference, getBlob } from "firebase/storage";
import { useState } from "react";

type UseDownloadBlobState = "ready" | "loading" | "done";
type UseDownloadBlobDispatcher = (
  maxDownloadSizeBytes?: number,
) => Promise<Blob>;
type UseDownloadBlob = {
  blob: Blob | undefined;
  state: UseDownloadBlobState;
  dispatch: UseDownloadBlobDispatcher;
};

export const useDownloadBlob = (
  reference: StorageReference,
): UseDownloadBlob => {
  const [state, setState] = useState<UseDownloadBlobState>("ready");
  const [blob, setBlob] = useState<Blob | undefined>(undefined);

  const dispatch: UseDownloadBlobDispatcher = async (maxDownloadSizeBytes) => {
    setState("loading");
    const blob = await getBlob(reference, maxDownloadSizeBytes);
    setState("done");
    setBlob(blob);
    return blob;
  };

  return { blob, state, dispatch };
};
