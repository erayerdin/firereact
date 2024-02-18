// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FullMetadata, StorageReference, getMetadata } from "firebase/storage";
import { useState } from "react";

type UseFileMetadataState = "ready" | "loading" | "done";
type UseFileMetadataDispatcher = () => Promise<FullMetadata>;
type UseFileMetadata = {
  metadata: FullMetadata | undefined;
  state: UseFileMetadataState;
  dispatch: UseFileMetadataDispatcher;
};

export const useFileMetadata = (
  reference: StorageReference,
): UseFileMetadata => {
  const [state, setState] = useState<UseFileMetadataState>("ready");
  const [metadata, setMetadata] = useState<FullMetadata | undefined>(undefined);

  const dispatch: UseFileMetadataDispatcher = async () => {
    setState("loading");
    const metadata = await getMetadata(reference);
    setState("done");
    setMetadata(metadata);
    return metadata;
  };

  return { metadata, state, dispatch };
};
