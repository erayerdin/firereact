// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { useState } from "react";

type UseDeleteFileParams = {
  reference: StorageReference;
};

type UseDeleteFileState = "ready";
type UseDeleteFile = {
  state: UseDeleteFileState;
};

export const useDeleteFile = ({
  reference,
}: UseDeleteFileParams): UseDeleteFile => {
  const [state, setState] = useState<UseDeleteFileState>("ready");

  return { state };
};
