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
type UseDownloadBytesDispatcher = (
  maxDownloadSizeBytes?: number,
) => Promise<ArrayBuffer>;
type UseDownloadBytes = {
  state: UseDownloadBytesState;
  dispatch: UseDownloadBytesDispatcher;
};

export const useDownloadBytes = ({
  reference,
}: UseDownloadBytesParams): UseDownloadBytes => {
  const [state, setState] = useState<UseDownloadBytesState>("ready");

  const dispatch: UseDownloadBytesDispatcher = async (maxDownloadSizeBytes) => {
    throw "tbi";
  };

  return { state, dispatch };
};
