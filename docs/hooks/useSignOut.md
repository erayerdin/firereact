---
tags:
  - hook
---

# `useSignOut` hook

`useSignOut` hook is used to sign out currently signed-in user. A very simple example would be:

```typescript
const { dispatch } = useSignOut(auth);
await dispatch();
```

!!! warning
    `useSignOut` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state[^done] of sign-out process.

```typescript
const { state, dispatch } = useSignOut(auth);
await dispatch();
// `state` is "ready" | "loading" | "anonymous"
```

!!! warning
    `useSignOut` automatically listens to authentication state and will be `"anonymous"` if the user is anonymous. In `"anonymous"` state, `dispatch` will simply do nothing even if it is invoked.

In case of an error occurs, you can handle it by providing a function for `onError`:

```typescript
const onError = (error: Error) => {
  // do something with error
}

const { dispatch } = useSignOut(auth, { onError });
await dispatch();
```

## On Anonymity

In Firebase, there are two types of anonymity: Firebase-handled anonymous users (which are stored in Firebase and seen as real users) and real anonymous users (which are essentially `null` users).

`useSignOut` considers both cases as anonymous and behaves accordingly. So, in a case where user is *Firebase-handled* or *really* anonymous, `useSignOut` will have `"anonymous"` state. If, for a reason, this behavior is not desirable for you, you can use `onlyRealAnon` parameter on `useSignOut` hook. To see both cases, check this code:

```typescript
const onlyRealAnon = true;

// User is really anonymous
const { state } = useSignOut(auth); // state: "anonymous"
const { state } = useSignOut(auth, { onlyRealAnon }); // state: "anonymous"

// User is anonymous in Firebase Auth records
const { state } = useSignOut(auth); // state: "anonymous"
const { state } = useSignOut(auth, { onlyRealAnon }); // state: "ready"
```

## Input Parameters

Input parameters for `useSignOut` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |
| `options` | `Object` | Options for the process. | ❌ | See below. |
| `options.onError` | `(error: Error) => void` | A function to handle errors. | ❌ | Throws error. |
| `options.onlyRealAnon` | `boolean` | Consider the user anonymous only if they are `null`. | ❌ | `false` (which also considers Firebase-handled anonymous users) |

## Return Type

`useSignOut` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "anonymous"`[^done] | The state of sign-out process. |
| `dispatch` | `() => Promise<void>` | A callback to start sign-out process. |

[^done]: You can consider `"anonymous"` state as logically *done*.

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth