// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { DocumentReference, deleteDoc } from "firebase/firestore";
import { useState } from "react";

type UseSetDocumentState = "ready" | "loading" | "done";
type UseSetDocumentDispatcher = () => Promise<void>;

type UseSetDocument = {
  state: UseSetDocumentState;
  dispatch: UseSetDocumentDispatcher;
  error?: FirebaseError;
};

export const useDeleteDocument = (
  reference: DocumentReference,
): UseSetDocument => {
  const [state, setState] = useState<UseSetDocumentState>("ready");
  const [error, setError] = useState<FirebaseError | undefined>();

  const dispatch: UseSetDocumentDispatcher = async () => {
    setState("loading");
    try {
      await deleteDoc(reference);
      setState("done");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setState("ready");
        setError(e);
      } else {
        setState("ready");
        throw e;
      }
    }
  };

  return { state, dispatch, error };
};
