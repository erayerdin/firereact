// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference, deleteObject } from "firebase/storage";
import { useState } from "react";

type UseDeleteFileState = "ready" | "loading" | "done";
type UseDeleteFileDispatcher = () => Promise<void>;
type UseDeleteFile = {
  state: UseDeleteFileState;
  dispatch: UseDeleteFileDispatcher;
};

export const useDeleteFile = (reference: StorageReference): UseDeleteFile => {
  const [state, setState] = useState<UseDeleteFileState>("ready");

  const dispatch: UseDeleteFileDispatcher = async () => {
    setState("loading");
    await deleteObject(reference);
    setState("done");
  };

  return { state, dispatch };
};
