// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FirebaseError } from "firebase/app";
import { Query, QuerySnapshot } from "firebase/firestore";
import { useState } from "react";

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

  return { loading, snapshot, error };
};

export default useCollection;
