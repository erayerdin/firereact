---
tags:
  - hook
---

# `useSignOut` hook

`useSignOut` hook is used to sign out currently signed-in user. A very simple example would be:

```typescript
const { dispatch } = useSignOut({ auth });
await dispatch();
```

!!! warning
    `useSignOut` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state of sign-out process.

```typescript
const { state, dispatch } = useSignOut({ auth });
await dispatch();
// `state` is "ready" | "loading" | "done"
```

!!! warning
    `useSignOut` hook does not listen to current authentication state. Refer to [`useUser` hook](./useUser-hook.md) to reflect changes on authentication state changes.

## Input Parameters

Input parameters for `useSignOut` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |

## Return Type

`useSignOut` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "done"` | The state of sign-out process. |
| `dispatch` | `() => Promise<void>` | A callback to start sign-out process. |

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth