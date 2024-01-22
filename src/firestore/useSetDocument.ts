// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { useState } from "react";

type UseSetDocumentParams = {
  reference: DocumentReference;
};

type UseSetDocumentState = "ready" | "loading" | "done";
type UseSetDocumentDispatcher = (
  data: DocumentData,
  options: {
    merge: boolean;
  },
) => Promise<DocumentReference | undefined>;

type UseSetDocument = {
  state: UseSetDocumentState;
  dispatch: UseSetDocumentDispatcher;
  reference?: DocumentReference;
  error?: FirebaseError;
};

const useSetDocument = ({
  reference,
}: UseSetDocumentParams): UseSetDocument => {
  const [state, setState] = useState<UseSetDocumentState>("ready");
  const [refer, setRefer] = useState<DocumentReference | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  const dispatch: UseSetDocumentDispatcher = async (
    data: DocumentData,
    options = { merge: true },
  ) => {
    const { merge } = options;

    throw "tbi";
  };

  return { state, dispatch, reference: refer, error };
};

export default useSetDocument;
