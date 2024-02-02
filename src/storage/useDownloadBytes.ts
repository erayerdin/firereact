// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { useState } from "react";

type UseDownloadBytesParams = {
  reference: StorageReference;
};

type UseDownloadBytesState = "ready";
type UseDownloadBytes = {
  state: UseDownloadBytesState;
};

export const useDownloadBytes = ({
  reference,
}: UseDownloadBytesParams): UseDownloadBytes => {
  const [state, setState] = useState<UseDownloadBytesState>("ready");

  return { state };
};
