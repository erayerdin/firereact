// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import {
  DocumentData,
  DocumentReference,
  SetOptions,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";

type UseSetDocumentState = "ready" | "loading" | "done";
type UseSetDocumentDispatcher = (
  data: DocumentData,
  options?: SetOptions,
) => Promise<void>;

type UseSetDocument = {
  state: UseSetDocumentState;
  dispatch: UseSetDocumentDispatcher;
  error?: FirebaseError;
};

export const useSetDocument = (
  reference: DocumentReference,
): UseSetDocument => {
  const [state, setState] = useState<UseSetDocumentState>("ready");
  const [error, setError] = useState<FirebaseError | undefined>();

  const dispatch: UseSetDocumentDispatcher = async (
    data: DocumentData,
    options,
  ) => {
    setState("loading");
    try {
      await (options
        ? setDoc(reference, data, options)
        : setDoc(reference, data));
      setState("done");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setState("ready");
        setError(e);
      } else {
        setState("loading");
        throw e;
      }
      return;
    }
    setState("done");
  };

  return { state, dispatch, error };
};
