// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FullMetadata, StorageReference } from "firebase/storage";
import { ReactNode } from "react";

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
  return <div>StorageMetadata</div>;
};
