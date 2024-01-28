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

type UseDocumentParams = {
  reference: DocumentReference;
  options?: {
    listen: boolean;
  };
};

type UseDocument = {
  loading: boolean;
  snapshot?: DocumentSnapshot;
  error?: FirebaseError;
};

export const useDocument = ({
  reference,
  options = { listen: false },
}: UseDocumentParams): UseDocument => {
  const { listen } = options;

  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<DocumentSnapshot | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useEffect(() => {
    setLoading(true);
    if (listen) {
      const unsub = onSnapshot(
        reference,
        { includeMetadataChanges: true },
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
  }, [listen, reference]);

  return { loading, snapshot, error };
};
