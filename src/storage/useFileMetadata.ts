// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { useState } from "react";

type UseFileMetadataParams = {
  reference: StorageReference;
};

type UseFileMetadataState = "ready";
type UseFileMetadata = {
  state: UseFileMetadataState;
};

export const useFileMetadata = ({
  reference,
}: UseFileMetadataParams): UseFileMetadata => {
  const [state, setState] = useState<UseFileMetadataState>("ready");

  return { state };
};
