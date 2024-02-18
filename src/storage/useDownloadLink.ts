// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference, getDownloadURL } from "firebase/storage";
import { useState } from "react";

type UseDownloadLinkState = "ready" | "loading" | "done";
type UseDownloadLinkDispatcher = () => Promise<string>;
type UseDownloadLink = {
  link: string | undefined;
  state: UseDownloadLinkState;
  dispatch: UseDownloadLinkDispatcher;
};

export const useDownloadLink = (
  reference: StorageReference,
): UseDownloadLink => {
  const [state, setState] = useState<UseDownloadLinkState>("ready");
  const [link, setLink] = useState<string | undefined>(undefined);

  const dispatch: UseDownloadLinkDispatcher = async () => {
    setState("loading");
    const url = await getDownloadURL(reference);
    setState("done");
    setLink(link);
    return url;
  };

  return { state, dispatch, link };
};
