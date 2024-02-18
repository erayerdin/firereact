// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference, getBytes } from "firebase/storage";
import { useState } from "react";

type UseDownloadBytesState = "ready" | "loading" | "done";
type UseDownloadBytesDispatcher = (
  maxDownloadSizeBytes?: number,
) => Promise<ArrayBuffer>;
type UseDownloadBytes = {
  bytes: ArrayBuffer | undefined;
  state: UseDownloadBytesState;
  dispatch: UseDownloadBytesDispatcher;
};

export const useDownloadBytes = (
  reference: StorageReference,
): UseDownloadBytes => {
  const [state, setState] = useState<UseDownloadBytesState>("ready");
  const [bytes, setBytes] = useState<ArrayBuffer | undefined>(undefined);

  const dispatch: UseDownloadBytesDispatcher = async (maxDownloadSizeBytes) => {
    setState("loading");
    const bytes = await getBytes(reference, maxDownloadSizeBytes);
    setState("done");
    setBytes(bytes);
    return bytes;
  };

  return { bytes, state, dispatch };
};
