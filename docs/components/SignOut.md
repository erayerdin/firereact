---
tags:
  - component
---

# `SignOut` Component

You can use `SignOut` component to sign out an already signed-in user. The simplest usage would be:

```typescript
<SignOut
  auth={auth}
/>
```

!!! tip
    You can further customize your `button` to your liking.

You can also render specific components depending on the state.

```typescript
<SignOut
  auth={auth}
  onReady{(dispatch) => (
    <button onClick={dispatch}>Log Out</button>
  )}
  onLoading={() => (
    {/** component/spinner to render while loading */}
  )}
  onDone={() => (
    {/** component to render when done */}
  )}
/>
```

!!! info
    By default, `onReady` renders a `button` with text `Sign Out` while `onLoading` and `onDone` renders an empty component.

## Input Parameters

Input parameters for `FirestoreDocument` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Auth service instance. | ✅ | - |
| `onReady` | `(dispatch: () => Promise<void>) => ReactNode` | The component to render when it's ready to sign out. | ❌ | `(dispatch) => <button onClick={dispatch}>Sign Out</button>` |
| `onLoading` | `() => ReactNode` | The component to render while it's loading. | ❌ | An empty component. |
| `onDone` | `() => ReactNode` | The component to render the process is done. | ❌ | An empty component. |

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth