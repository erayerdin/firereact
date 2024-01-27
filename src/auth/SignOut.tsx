// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from "react";

type SignOutProps = {
  onReady: () => ReactNode;
};

export const SignOut = ({ onReady }: SignOutProps) => {
  return onReady();
};
