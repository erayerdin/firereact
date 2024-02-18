// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Functions,
  HttpsCallableOptions,
  HttpsCallableResult,
  httpsCallable,
} from "firebase/functions";
import { useState } from "react";

type UseCallFunctionOptions = {
  name: string;
  httpsCallableOptions?: HttpsCallableOptions;
};

type UseCallFunctionState = "ready" | "loading" | "done";
type UseCallFunctionInvoker = (
  data?: unknown,
) => Promise<HttpsCallableResult<unknown>>;
type UseCallFunction = {
  state: UseCallFunctionState;
  invoke: UseCallFunctionInvoker;
};

export const useCallFunction = (
  functions: Functions,
  { name, httpsCallableOptions }: UseCallFunctionOptions,
): UseCallFunction => {
  const [state, setState] = useState<UseCallFunctionState>("ready");

  const invoke: UseCallFunctionInvoker = async (data: unknown = {}) => {
    setState("loading");
    const r = httpsCallable(functions, name, httpsCallableOptions).call(data);
    setState("done");
    return r;
  };

  return { state, invoke };
};
