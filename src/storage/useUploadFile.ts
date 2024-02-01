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

type UseUploadFileProps = {
  reference: StorageReference;
};

type UseUploadFileState = "ready" | [number, number] | "done";
type UseUploadFileDispatcher = (
  file: Buffer | File | Blob,
  metadata?: UploadMetadata,
) => Promise<UploadResult>;
type UseUploadFile = {
  state: UseUploadFileState;
  dispatch: UseUploadFileDispatcher;
};

export const useUploadFile = ({
  reference,
}: UseUploadFileProps): UseUploadFile => {
  const [state, setState] = useState<UseUploadFileState>("ready");

  const dispatch: UseUploadFileDispatcher = async (file, metadata) => {
    const result = await uploadBytes(reference, file, metadata);
    setState("done");
    return result;
  };

  return { state, dispatch };
};
