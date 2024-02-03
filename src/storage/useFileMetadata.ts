// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FullMetadata, StorageReference } from "firebase/storage";
import { useState } from "react";

type UseFileMetadataParams = {
  reference: StorageReference;
};

type UseFileMetadataState = "ready" | "loading" | "done";
type UseFileMetadataDispatcher = () => Promise<FullMetadata>;
type UseFileMetadata = {
  metadata: FullMetadata | undefined;
  state: UseFileMetadataState;
  dispatch: UseFileMetadataDispatcher;
};

export const useFileMetadata = ({
  reference,
}: UseFileMetadataParams): UseFileMetadata => {
  const [state, setState] = useState<UseFileMetadataState>("ready");
  const [metadata, setMetadata] = useState<FullMetadata | undefined>(undefined);

  const dispatch: UseFileMetadataDispatcher = async () => {
    throw "tbi";
  };

  return { metadata, state, dispatch };
};
