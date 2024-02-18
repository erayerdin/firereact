// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";
import { ReactNode, useEffect } from "react";
import { useDownloadLink } from ".";

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
  const { link, state, dispatch } = useDownloadLink(reference);

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  return state === "done" ? onDone(link!) : onLoading();
};
