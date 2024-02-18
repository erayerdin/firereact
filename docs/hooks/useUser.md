---
tags:
  - hook
---

# `useUser` hook

`useUser` hook is used to get the currently signed-in user. A very simple example would be:

```typescript
const user = useUser(auth);
```

!!! warning
    Under the hood, `useUser` listens to authentication state changes, so it will reflect and rerender when the user signs in, up or out.

You can also dispatch actions when user state changes or an error occurs.

```typescript
const onError = (err) => {
  // handle err
};

const onChange = () => {
  // do something after state changes
}

const user = useUser({ auth, onError, onChange });
```

## Input Parameters

Input parameters for `useUser` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |
| `options` | `Object` | Options for the process. | ❌ | See below. |
| `options.onError` | `(error: Error) => void` or `undefined` | A function to handle errors. | ❌ | `undefined` |
| `options.onChange` | `() => void` or `undefined` | A function to run after state changes. | ❌ | `undefined` |

## Return Type

`useUser` hook return only an instance of `User | null`. When the user has not signed it, `user` will be `undefined`. If user has signed in, it will be an instance of [`User`][UserRefDoc].

!!! warning
    Remember that `user` will not be undefined if [`signInAnonymously`][signInAnonymouslyDoc] is used to authenticate a user. Firebase-based anonymous users are technically autenticated. If you used [`signInAnonymously`][signInAnonymouslyDoc], you must rely on [`user.isAnonymous`][UserIsAnonymousRefDoc] property.

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[UserRefDoc]: https://firebase.google.com/docs/reference/node/firebase.User
[UserIsAnonymousRefDoc]: https://firebase.google.com/docs/reference/node/firebase.User#isanonymous
[signInAnonymouslyDoc]: https://firebase.google.com/docs/auth/web/anonymous-auth