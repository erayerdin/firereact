// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";

type UseDownloadLinkParams = {
  reference: StorageReference;
};

type UseDownloadLinkState = "ready";
type UseDownloadLink = {
  state: UseDownloadLinkState;
};

export const useDownloadLink = ({
  reference,
}: UseDownloadLinkParams): UseDownloadLink => {
  return { state: "ready" };
};
