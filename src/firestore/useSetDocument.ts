// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentReference } from "firebase/firestore";

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
  throw "tbi";
};

export default useSetDocument;
