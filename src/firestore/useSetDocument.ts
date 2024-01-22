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
  const [ref, setRef] = useState<DocumentReference | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  const dispatch: UseSetDocumentDispatcher = async (data: DocumentData) => {};

  return { state, dispatch, reference: ref, error };
};

export default useSetDocument;
