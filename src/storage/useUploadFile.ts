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
