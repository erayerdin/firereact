// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";

type UseAddDocumentParams = {
  reference: CollectionReference;
};

type UseAddDocumentState = "ready" | "loading" | "done";
type UseAddDocumentDispatcher = (
  data: DocumentData,
) => Promise<DocumentReference | undefined>;

type UseAddDocument = {
  state: UseAddDocumentState;
  dispatch: UseAddDocumentDispatcher;
  reference?: DocumentReference;
  error?: FirebaseError;
};

const useAddDocument = ({
  reference,
}: UseAddDocumentParams): UseAddDocument => {
  const [state, setState] = useState<UseAddDocumentState>("ready");
  const [ref, setRef] = useState<DocumentReference | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  const dispatch: UseAddDocumentDispatcher = async (data: DocumentData) => {
    setState("loading");

    try {
      const docRef = await addDoc(reference, data);
      setRef(docRef);
      setState("done");
      return docRef;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error);
        setState("ready");
        return;
      } else {
        setState("ready");
        throw error;
      }
    }
  };

  return { state, dispatch, reference: ref, error };
};

export default useAddDocument;
