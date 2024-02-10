// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type UseDocumentOptions = {
  listen?: boolean;
  listenToMetadataChanges?: boolean;
};

type UseDocument = {
  loading: boolean;
  snapshot?: DocumentSnapshot;
  error?: FirebaseError;
};

export const useDocument = (
  reference: DocumentReference,
  { listen, listenToMetadataChanges }: UseDocumentOptions = {
    listen: true,
    listenToMetadataChanges: false,
  },
): UseDocument => {
  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<DocumentSnapshot | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useEffect(() => {
    setLoading(true);
    if (listen) {
      const unsub = onSnapshot(
        reference,
        { includeMetadataChanges: listenToMetadataChanges },
        (snap) => {
          setSnapshot(snap);
          setLoading(false);
        },
        (error) => setError(error),
        () => setLoading(false),
      );
      return unsub;
    } else {
      getDoc(reference)
        .then((snapshot) => {
          setSnapshot(snapshot);
          setLoading(false);
        })
        .catch((e) => {
          if (e instanceof FirebaseError) {
            setError(e);
            setLoading(false);
          } else {
            setLoading(false);
            throw e;
          }
        })
        .finally(() => setLoading(false));
    }
  }, [reference, listen, listenToMetadataChanges]);

  return { loading, snapshot, error };
};
