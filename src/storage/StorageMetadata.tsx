// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FullMetadata, StorageReference } from "firebase/storage";
import { ReactNode, useEffect } from "react";
import { useFileMetadata } from ".";

type StorageMetadataProps = {
  reference: StorageReference;
  onLoading?: () => ReactNode;
  onDone: (metadata: FullMetadata) => ReactNode;
};

export const StorageMetadata = ({
  reference,
  onLoading = () => <></>,
  onDone,
}: StorageMetadataProps) => {
  const { metadata, state, dispatch } = useFileMetadata(reference);

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  return state === "done" ? onDone(metadata!) : onLoading();
};
