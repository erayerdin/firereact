// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { Query, QuerySnapshot, getDocs, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

type UseCollectionParams = {
  query: Query;
  options?: {
    listen: boolean;
  };
};

type UseCollection = {
  loading: boolean;
  snapshot?: QuerySnapshot;
  error?: FirebaseError;
};

const useCollection = ({
  query,
  options = { listen: false },
}: UseCollectionParams): UseCollection => {
  const { listen } = options;

  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<QuerySnapshot | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useAsyncEffect(async () => {
    setLoading(true);

    try {
      if (listen) {
        const unsub = onSnapshot(
          query,
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
        const qSnapshot = await getDocs(query);
        setSnapshot(qSnapshot);
        setLoading(false);
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e);
        setLoading(false);
      } else {
        setLoading(false);
        throw e;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, snapshot, error };
};

export default useCollection;
