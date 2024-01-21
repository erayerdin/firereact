// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Query } from "firebase/firestore";

type UseCollectionParams = {
  query: Query;
  options?: {
    listen: boolean;
  };
};

const useCollection = ({
  query,
  options = { listen: false },
}: UseCollectionParams) => {
  const { listen } = options;
};

export default useCollection;
