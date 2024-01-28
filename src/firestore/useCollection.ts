// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { Query, QuerySnapshot, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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

export const useCollection = ({
  query,
  options = { listen: false },
}: UseCollectionParams): UseCollection => {
  const { listen } = options;

  const [loading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<QuerySnapshot | undefined>();
  const [error, setError] = useState<FirebaseError | undefined>();

  useEffect(() => {
    setLoading(true);

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
      getDocs(query)
        .then((qSnapshot) => {
          setSnapshot(qSnapshot);
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
  }, [listen, query]);

  return { loading, snapshot, error };
};
