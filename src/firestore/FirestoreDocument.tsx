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
};

export const FirestoreDocument = ({
  reference,
  loading = () => <></>,
  error = () => <></>,
  done,
}: FirestoreDocumentProps) => {
  const {
    loading: processing,
    snapshot,
    error: err,
  } = useDocument({ reference });

  return processing ? loading() : err ? error() : done(snapshot!);
};
