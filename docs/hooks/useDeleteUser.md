---
tags:
  - hook
---

# `useDeleteUser` hook

`useDeleteUser` hook is used to delete the currently signed-in user. A very simple example would be:

```typescript
const { dispatch } = useDeleteUser(auth);
await dispatch();
```

!!! warning
    `useDeleteUser`, as mentioned, can only delete the currently signed-in user from the client side. Due to security reasons, you cannot delete any other user. If you want to delete another user, use Firebase Auth from Firebase Console or Firebase Functions.

!!! warning
    `useDeleteUser` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state[^unauthorized] of deletion process.

```typescript
const { state, dispatch } = useDeleteUser(auth);
await dispatch();
// `state` is "ready" | "loading" | "anonymous"
```

!!! warning
    `useDeleteUser` automatically listens to authentication state and will be `"anonymous"` if the user is anonymous. In `"anonymous"` state, `dispatch` will simply do nothing even if it is invoked.

By default, `"anonymous"` state includes both real anonymous and Firebase-handled anonymous users[^anonymity]. If you'd like to enable deleting Firebase-handled anonymous users as well, you can use `includeFirebaseAnon` as such:

```typescript
// assuming user is Firebase-handled anon
const { dispatch } = useDeleteUser(auth, { includeFirebaseAnon: true });
await dispatch(); // this will delete anonymous user
```

## Input Parameters

Input parameters for `useDeleteUser` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |
| `options` | `Object` | Options for the operation. | ❌ | See below. |
| `options.includeFirebaseAnon` | `boolean` | Enable deleting Firebase-handled anonymous users. | ❌ | `false` |

## Return Type

`useDeleteUser` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "anonymous"`[^unauthorized] | The state of sign-up process. |
| `dispatch` | `() => Promise<void>` | A callback to start deletion process. |

[^unauthorized]: You can consider `"anonymous"` state as logically *unauthorized*. Your website visitors are not authorized to delete users if they are anonymous (signed-in).

[^anonymity]: See ["On Anonimity" section on `useSignOut` hook](useSignOut.md#on-anonymity) to learn more about how Firebase handles anonymity.

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth