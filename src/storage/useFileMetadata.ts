// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FullMetadata, StorageReference } from "firebase/storage";
import { useState } from "react";

type UseFileMetadataParams = {
  reference: StorageReference;
};

type UseFileMetadataState = "ready";
type UseFileMetadataDispatcher = () => Promise<FullMetadata>;
type UseFileMetadata = {
  state: UseFileMetadataState;
  dispatch: UseFileMetadataDispatcher;
};

export const useFileMetadata = ({
  reference,
}: UseFileMetadataParams): UseFileMetadata => {
  const [state, setState] = useState<UseFileMetadataState>("ready");

  const dispatch: UseFileMetadataDispatcher = async () => {
    throw "tbi";
  };

  return { state, dispatch };
};
