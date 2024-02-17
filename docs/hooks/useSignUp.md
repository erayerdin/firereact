---
tags:
  - hook
---

# `useSignUp` hook

`useSignUp` hook is used to create a user with email and password. A very simple example would be:

```typescript
const { dispatch } = useSignUp(auth);
await dispatch(email, password);
```

!!! warning
    `useSignUp` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state[^unauthorized] of sign-up process.

```typescript
const { state, dispatch } = useSignUp(auth);
await dispatch();
// `state` is "ready" | "loading" | "authenticated"
```

!!! warning
    `useSignUp` automatically listens to authentication state and will be `"authenticated"` if the user is authenticated. In `"authenticated"` state, `dispatch` will simply do nothing even if it is invoked.

`dispatch` method will return an instance of [`UserCredential`][UserCredentialDocRef] if successful or `undefined` if user is already authenticated (thus, unauthorized to create a new user).

## Input Parameters

Input parameters for `useSignUp` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |

## Return Type

`useSignUp` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "authenticated"`[^unauthorized] | The state of sign-up process. |
| `dispatch` | `(email: string, password: string) => Promise<UserCredential>` | A callback to start sign-up process. |

[^unauthorized]: You can consider `"authenticated"` state as logically *unauthorized*. Your website visitors are not authorized to create a new users if they are authenticated (signed-in).

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[UserCredentialDocRef]: https://firebase.google.com/docs/reference/js/auth.usercredential