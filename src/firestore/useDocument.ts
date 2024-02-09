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

type UseDocumentParams<O> = {
  reference: DocumentReference;
  converter?: (snapshot: DocumentSnapshot) => O | undefined;
  options?: {
    listen: boolean;
  };
};

type UseDocument<O> = {
  loading: boolean;
  snapshot?: DocumentSnapshot;
  data?: O;
  error?: FirebaseError;
};

export const useDocument = <O>({
  reference,
  converter = () => undefined,
  options = { listen: false },
}: UseDocumentParams<O>): UseDocument<O> => {
  const { listen } = options;

  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<DocumentSnapshot | undefined>();
  const [data, setData] = useState<O | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useEffect(() => {
    if (snapshot) {
      const d = converter(snapshot);
      setData(d);
    }
  }, [snapshot, converter]);

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

  return { loading, snapshot, data, error };
};
