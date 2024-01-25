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

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth