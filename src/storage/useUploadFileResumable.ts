// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  StorageReference,
  UploadMetadata,
  UploadResult,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

type UseUploadFileResumableState = "ready" | [number, number] | "done";
type UseUploadFileResumableDispatcher = (
  file: Buffer | File | Blob,
  metadata?: UploadMetadata,
) => Promise<UploadResult>;
type UseUploadFileResumable = {
  state: UseUploadFileResumableState;
  dispatch: UseUploadFileResumableDispatcher;
};

export const useUploadFileResumable = (
  reference: StorageReference,
): UseUploadFileResumable => {
  const [state, setState] = useState<UseUploadFileResumableState>("ready");

  const dispatch: UseUploadFileResumableDispatcher = async (file, metadata) => {
    const task = uploadBytesResumable(reference, file, metadata);
    task.on("state_changed", (snapshot) => {
      setState([snapshot.bytesTransferred, snapshot.totalBytes]);
    });
    const result = await task;
    setState("done");
    return result;
  };

  return { state, dispatch };
};
