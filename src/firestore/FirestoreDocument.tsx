// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import { ReactNode } from "react";
import { useDocument } from ".";

type FirestoreDocumentProps = {
  reference: DocumentReference;
  loading?: () => ReactNode;
  error?: (error: FirebaseError) => ReactNode;
  done: (snapshot: DocumentSnapshot) => ReactNode;
  listen?: boolean;
};

export const FirestoreDocument = ({
  reference,
  loading = () => <></>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error = (_err) => <></>,
  done,
  listen = false,
}: FirestoreDocumentProps) => {
  const {
    loading: processing,
    snapshot,
    error: err,
  } = useDocument({ reference, options: { listen } });

  return processing ? loading() : err ? error(err) : done(snapshot!);
};
