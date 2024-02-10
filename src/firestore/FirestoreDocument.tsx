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
  onLoading?: () => ReactNode;
  onError?: (error: FirebaseError) => ReactNode;
  onDone: (snapshot: DocumentSnapshot) => ReactNode;
  listen?: boolean;
};

export const FirestoreDocument = ({
  reference,
  onLoading = () => <></>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError = (_err) => <></>,
  onDone,
  listen = false,
}: FirestoreDocumentProps) => {
  const {
    loading: processing,
    snapshot,
    error: err,
  } = useDocument(reference, { listen });

  return processing ? onLoading() : err ? onError(err) : onDone(snapshot!);
};
