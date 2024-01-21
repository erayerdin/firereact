// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CollectionReference } from "firebase/firestore";
import { useState } from "react";

type UseAddDocumentParams = {
  reference: CollectionReference;
  data: unknown;
};

type UseAddDocumentState = "ready" | "loading" | "done";

type UseAddDocument = {
  state: UseAddDocumentState;
};

const useAddDocument = ({
  reference,
  data,
}: UseAddDocumentParams): UseAddDocument => {
  const [state, setState] = useState<UseAddDocumentState>("ready");

  return { state };
};

export default useAddDocument;
