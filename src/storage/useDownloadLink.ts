// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference, getDownloadURL } from "firebase/storage";
import { useState } from "react";

type UseDownloadLinkParams = {
  reference: StorageReference;
};

type UseDownloadLinkState = "ready" | "loading" | "done";
type UseDownloadLinkDispatcher = () => Promise<string>;
type UseDownloadLink = {
  state: UseDownloadLinkState;
  dispatch: UseDownloadLinkDispatcher;
};

export const useDownloadLink = ({
  reference,
}: UseDownloadLinkParams): UseDownloadLink => {
  const [state, setState] = useState<UseDownloadLinkState>("ready");

  const dispatch: UseDownloadLinkDispatcher = async () => {
    setState("loading");
    const url = await getDownloadURL(reference);
    setState("done");
    return url;
  };

  return { state, dispatch };
};
