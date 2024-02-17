// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ActionCodeSettings, Auth, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from ".";

type UseSendEmailVerificationState = "ready" | "loading" | "done" | "anonymous";
type UseSendEmailVerificationDispatcher = (
  actionCodeSettings?: ActionCodeSettings,
) => Promise<void>;
type UseSendEmailVerification = {
  state: UseSendEmailVerificationState;
  dispatch: UseSendEmailVerificationDispatcher;
};

export const useSendEmailVerification = (
  auth: Auth,
): UseSendEmailVerification => {
  const user = useUser(auth);
  const [state, setState] = useState<UseSendEmailVerificationState>("ready");

  useEffect(() => {
    if (!user) {
      setState("anonymous");
      return;
    }
  }, [user]);

  const dispatch: UseSendEmailVerificationDispatcher = async (
    actionCodeSetting,
  ) => {
    setState("loading");
    await sendEmailVerification(
      user!, // guaranteed user not null on ready
      actionCodeSetting,
    );
    setState("done");
  };

  return { state, dispatch: state === "ready" ? dispatch : async () => {} };
};
