// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  StorageReference,
  UploadMetadata,
  UploadResult,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";

type UseUploadFileState = "ready" | "loading" | "done";
type UseUploadFileDispatcher = (
  file: Buffer | File | Blob,
  metadata?: UploadMetadata,
) => Promise<UploadResult>;
type UseUploadFile = {
  state: UseUploadFileState;
  dispatch: UseUploadFileDispatcher;
};

export const useUploadFile = (reference: StorageReference): UseUploadFile => {
  const [state, setState] = useState<UseUploadFileState>("ready");

  const dispatch: UseUploadFileDispatcher = async (file, metadata) => {
    setState("loading");
    const result = await uploadBytes(reference, file, metadata);
    setState("done");
    return result;
  };

  return { state, dispatch };
};
