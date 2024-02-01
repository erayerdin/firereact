// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StorageReference } from "firebase/storage";

type UseUploadFileResumableParams = {
  reference: StorageReference;
};

type UseUploadFileResumableState = "ready";
type UseUploadFileResumable = {
  state: UseUploadFileResumableState;
};

export const useUploadFileResumable = ({
  reference,
}: UseUploadFileResumableParams): UseUploadFileResumable => {
  return { state: "ready" };
};
