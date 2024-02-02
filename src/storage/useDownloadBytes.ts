// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useState } from "react";

type UseDownloadBytesState = "ready";
type UseDownloadBytes = {
  state: UseDownloadBytesState;
};

export const useDownloadBytes = (): UseDownloadBytes => {
  const [state, setState] = useState<UseDownloadBytesState>("ready");

  return { state };
};
