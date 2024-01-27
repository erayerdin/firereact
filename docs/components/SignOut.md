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
    `SignOut` component listens to your authentication state automatically and reflects the changes.

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
  onAnonymous={() => (
    {/** component to render when anonymous */}
  )}
/>
```

!!! info
    By default, `onReady` renders a `button` with text `Sign Out` while `onLoading` and `onAnonymous` renders an empty component.

!!! warning
    *Anonymity* is handled differently in Firebase and, thus, in this component as well. See ["On Anonymity" section in `useSignOut` hook][OnAnonymity] to get a grasp of it. You can also pass a `onlyRealAnon: boolean` parameter to this component to change this behavior.

## Input Parameters

Input parameters for `FirestoreDocument` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Auth service instance. | ✅ | - |
| `onlyRealAnon` | `boolean` | Only react when user is `null`. See [this section][OnAnonymity]. | ❌ | `false` |
| `onReady` | `(dispatch: () => Promise<void>) => ReactNode` | The component to render when it's ready to sign out. | ❌ | `(dispatch) => <button onClick={dispatch}>Sign Out</button>` |
| `onLoading` | `() => ReactNode` | The component to render while it's loading. | ❌ | An empty component. |
| `onAnonymous` | `() => ReactNode` | The component to render the user is anonymous. | ❌ | An empty component. |

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[OnAnonymity]: ../hooks/useSignOut.md#on-anonymity