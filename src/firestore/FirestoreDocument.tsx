// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from "react";

type FirestoreDocumentProps = {
  loading: () => ReactNode;
};

export const FirestoreDocument = ({ loading }: FirestoreDocumentProps) => {
  return loading();
};
