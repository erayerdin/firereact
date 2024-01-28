---
tags:
  - hook
---

# `useSignIn` Hook

`useSignIn` hook is used to sign in a user. A very simple example would be:

```typescript
const { dispatch } = useSignIn({ auth });
await dispatch({
  type: "classic",
  email,
  password,
});
```

!!! warning
    `useSignIn` is lazy by default and will not do anything until you use `dispatch` function.

You can also get the state[^unauthorized] of sign-in process.

```typescript
const { state, dispatch } = useSignIn({ auth });
await dispatch({
  type: "classic",
  email,
  password,
});
// `state` is "ready" | "loading" | "authenticated"
```

!!! warning
    `useSignIn` automatically listens to authentication state and will be `"authenticated"` if the user is authenticated. In `"authenticated"` state, `dispatch` will simply do nothing even if it is invoked.

`dispatch` method will return an instance of [`UserCredential`][UserCredentialDocRef].

```typescript
const { state, dispatch } = useSignIn({ auth });
const credential = await dispatch({
  type: "classic",
  email,
  password,
});
// do something with `credential`
```

## Input Parameters

Input parameters for `useSignIn` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Reference to the Firebase Auth service instance. | ✅ | - |

## Return Type

`useSignIn` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "authenticated"`[^unauthorized] | The state of sign-up process. |
| `dispatch` | [`UseSignInDispatcher`](#sign-in-methods) | A callback to start sign-up process. |

## Sign In Methods

There are many sign-in methods available. The available ones are:

| Method | `type` | `provider` |
|---|---|---|
| Email and password | `classic` | ❌ |
| Google | `google` | [`GoogleAuthProvider`][GoogleAuthProviderRefDoc] |
| Facebook | `facebook` | [`FacebookAuthProvider`][FacebookAuthProviderRefDoc] |
| Apple | `apple` | [`OAuthProvider`][OAuthProviderRefDoc] |
| Microsoft | `microsoft` | [`OAuthProvider`][OAuthProviderRefDoc] |
| Yahoo | `yahoo` | [`OAuthProvider`][OAuthProviderRefDoc] |
| Twitter | `twitter` | [`TwitterAuthProvider`][TwitterAuthProviderRefDoc] |
| Github | `github` | [`GithubAuthProvider`][GithubAuthProviderRefDoc] |

`dispatch` method will require an object as parameter. This object will always have property of `type: string`. `type` will correspond to what kind of method you will prefer while signing in a visitor.

If `type` is `"classic"` (email-password authentication), it's pretty simple:

```typescript
await dispatch({
  type: "classic",
  email,
  password,
});
```

If `type` is something else, you need to provide initialized `*AuthProvider` instance. An example for Google sign-in looks as such:

```typescript
const { state, dispatch } = useSignIn({ auth });
const provider = new GoogleAuthProvider();
await dispatch({
  type: "google",
  provider,
});
// state is "loading" until user signs in
```

!!! warning
    You might need to take extra steps to use 3rd-party authentication systems, e.g. for Apple, you need to comply with their anonymized data requirements. Although authentication via Google is mostly okay and require less hassle (as Firebase is a product of Google), you might want to check individual documents of each 3rd-party provider [here][AuthWebDocs]. Choose the provider of your choice from the left menu.

[^unauthorized]: You can consider `"authenticated"` state as logically *unauthorized*. Your website visitors are not authorized to sign in again if they are already authenticated (signed-in).

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[UserCredentialDocRef]: https://firebase.google.com/docs/reference/js/auth.usercredential
[OAuthProviderRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.OAuthProvider
[GoogleAuthProviderRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.GoogleAuthProvider
[FacebookAuthProviderRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.FacebookAuthProvider
[TwitterAuthProviderRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.TwitterAuthProvider
[GithubAuthProviderRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.GithubAuthProvider
[AuthWebDocs]: https://firebase.google.com/docs/auth/web/start