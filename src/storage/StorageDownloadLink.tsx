// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { ReactNode } from "react";

type StorageDownloadLinkProps = {
  reference: StorageReference;
  onLoading?: () => ReactNode;
  onDone: (link: string) => ReactNode;
};

export const StorageDownloadLink = ({
  reference,
  onLoading = () => <></>,
  onDone,
}: StorageDownloadLinkProps) => {
  return <div>StorageDownloadLink</div>;
};
