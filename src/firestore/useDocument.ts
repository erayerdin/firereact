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
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

type UseDocumentParams = {
  reference: DocumentReference;
  options: {
    listen: boolean;
  };
};

type UseDocument = {
  loading: boolean;
  snapshot?: DocumentSnapshot;
  error?: FirebaseError;
};

const useDocument = ({
  reference,
  options = { listen: false },
}: UseDocumentParams): UseDocument => {
  const { listen } = options;

  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<DocumentSnapshot | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      if (listen) {
        const unsub = onSnapshot(reference, (snap) => {
          setSnapshot(snap);
        });
        return unsub;
      } else {
        const snapshot = await getDoc(reference);
        setSnapshot(snapshot);
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e);
      } else {
        throw e;
      }
    }
  }, []);

  return { loading, snapshot, error };
};

export default useDocument;