---
tags:
  - hook
---

# `useAuthState` hook

`useAuthState` hook is used to listen to authentication state and get the current user. A very simple example would be:

```typescript
const { user } = useAuthState({ auth });
```

You can also dispatch actions when state changes or an error occurs.

```typescript
const onError = (err) => {
  // handle err
};

const onComplete = () => {
  // do something after state changes
}

const { user } = useAuthState({ auth, onError, onComplete });
```

## Input Parameters

Input parameters for `useAuthState` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |
| `onError` | `(error: Error) => void` or `undefined` | A function to handle errors. | ❌ | `undefined` |
| `onComplete` | `() => void` or `undefined` | A function to run after state changes. | ❌ | `undefined` |

## Return Type

`useAuthState` hook return only an instance of `{ user: User | undefined }`. When the user has not signed it, `user` will be `undefined`. If user has signed in, it will be an instance of [`User`][UserRefDoc].

!!! warning
    Remember that `user` will not be undefined if [`signInAnonymously`][signInAnonymouslyDoc] is used to authenticate a user. Firebase-based anonymous users are technically autenticated. If you used [`signInAnonymously`][signInAnonymouslyDoc], you must rely on [`user.isAnonymous`][UserIsAnonymousRefDoc] property.

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[UserRefDoc]: https://firebase.google.com/docs/reference/node/firebase.User
[UserIsAnonymousRefDoc]: https://firebase.google.com/docs/reference/node/firebase.User#isanonymous
[signInAnonymouslyDoc]: https://firebase.google.com/docs/auth/web/anonymous-auth