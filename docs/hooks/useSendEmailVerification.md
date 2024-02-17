---
tags:
  - hook
---

# `useSendEmailVerification` hook

`useSendEmailVerification` hook is used to send email verification to a user. A very simple example would be:

```typescript
const { dispatch } = useSendEmailVerification(auth);
await dispatch();
```

!!! warning
    `useSendEmailVerification` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state of the process.

```typescript
const { state, dispatch } = useSendEmailVerification(auth);
await dispatch();
// `state` is "ready" | "loading" | "done" | "anonymous"
```

!!! warning
    `useSendEmailVerification` automatically listens to authentication state and will be `"anonymous"` if the user has not signed in. In `"anonymous"` state (or any state other than `"ready"` to be exact), `dispatch` will simply do nothing even if it is invoked.

## Input Parameters

Input parameters for `useSendEmailVerification` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |

## Return Type

`useSendEmailVerification` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "done" | "anonymous"` | The state of the process. |
| `dispatch` | `(actionCodeSetting: ActionCodeSetting | undefined) => Promise<void>` | A callback to start the process. |

You can provide an [ActionCodeSettings][ActionCodeSettingsDocRef] instance to the `dispatch` method.

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[ActionCodeSettingsDocRef]: https://firebase.google.com/docs/reference/js/auth.actioncodesettings