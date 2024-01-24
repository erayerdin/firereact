// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import { ReactNode } from "react";
import { useDocument } from ".";

type FirestoreDocumentProps = {
  reference: DocumentReference;
  loading?: () => ReactNode;
  error?: () => ReactNode;
  done: (snapshot: DocumentSnapshot) => ReactNode;
  listen?: boolean;
};

export const FirestoreDocument = ({
  reference,
  loading = () => <></>,
  error = () => <></>,
  done,
  listen = false,
}: FirestoreDocumentProps) => {
  const {
    loading: processing,
    snapshot,
    error: err,
  } = useDocument({ reference, options: { listen } });

  return processing ? loading() : err ? error() : done(snapshot!);
};
