---
tags:
  - component
---

# `AuthorizationZone` Component

You can use `AuthorizationZone` component to conditionally render the provided component. You can provide your own custom authorization logic but, by default, the logic is to check whether the user is authenticated (signed-in) or not.

So, to render a component only when a user is signed-in, the simplest usage would be:

```typescript
<AuthorizationZone
  auth={auth}
  onSuccess={(user) => (
    <p>User with {user?.email} has signed in.</p>
    {/** or a sign out button */}
  )}
/>
```

!!! tip
    `AuthorizationZone` component listens to your authentication state automatically and reflects the changes.

By default, an empty component will be rendered when authorization fails. You can change this behavior via providing a function returning a component on `onFailure` property of `AuthorizationZone`. It'd look like this:

```typescript
<AuthorizationZone
  auth={auth}
  onSuccess={(user) => (
    <p>User with {user?.email} has signed in.</p>
    {/** or a sign out button */}
  )}
  onFailure{() => (
    <p>User has not logged in.</p>
    {/** or a sign in button */}
  )}
/>
```

As mentioned earlier, `AuthorizationZone` accepts custom logic. Some of frequent logic is already covered by `firereact`. For example, instead of rendering when the user is authenticated, you can render when they are anonymous. See this example:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.isAnonymous()}
  onSuccess={() => (
    <p>User has not logged in.</p>
    {/** or a sign in button */}
  )}
/>
```

Check out [Validators](#validators) to see available validators by `firereact`.

You can also provide your own logic in `validator` property. See the example below:

```typescript
<AuthorizationZone
  auth={auth}
  validator={async (user) => {
    // you can do anything here
    // e.g. check related firestore doc to validate the user has the sufficient role to see this component
    // return a boolean
  }}
  onSuccess={() => (
    <p>User can authorized this component.</p>
  )}
/>
```

!!! info
    `validator` might be async function or not depending on your need.

## Input Parameters

Input parameters for `FirestoreDocument` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `auth` | [`firebase/auth/Auth`][AuthRefDoc] | Auth service instance. | ✅ | - |
| `onSuccess` | `(user: User | null) => ReactNode` | The component to render when `validator` returns `true`. | ✅ | - |
| `onFailure` | `(user: User | null) => ReactNode` | The component to render when `validator` returns `false`. | ❌ | An empty component. |
| `validator` | `(user: User | null) => Promise<boolean> | boolean` | The function to decide whether to render the component or not. | ❌ | `Validators.isAuthenticated()` |

## Validators

`AuthorizationZone` component has `validator` property, which requires a type that is `(user: User | null) => Promise<boolean> | boolean`. This means it's a function that automatically is provided with an instance of [`User`][UserRefDoc] and might or might not be an async function (can return either `Promise<boolean>` or `boolean`).

`firereact` already provides premade useful validators. Here is an exhaustive list of them:

 - [`Validators.isAuthenticated`](#isauthenticated-validator)
 - [`Validators.isAnonymous`](#isanonymous-validator)
 - [`Validators.isVerified`](#isverified-validator)
 - [`Validators.every`](#every-validator)
 - [`Validators.some`](#some-validator)

You can also write your own custom validator.

### Custom Validator

Let's assume these conditions:

 - You'd like to check a user is admin to render a `<button>Delete Product</button>`
 - Each user has their own document under `profiles` collection in Firestore, which is possibly created by [`onCreate`][onCreateTriggerDoc] via Firebase Functions.
 - `id` of each document under `profiles` is the same as `user.uid` (user's id in Firebase Auth).
 - Each document under `profiles` collection has a field named `roles`, which is an array of string (`string[]`).
 - For security reasons, of course, `roles` field is protected as read-only via Firestore security rules.

A minimal document under `profiles` would look as such:

```json
{
  // other fields
  "roles": [], // read-only, maybe ["admin"]
}
```

You can render this delete button with a validator similar to this:

```typescript
<AuthorizationZone
  auth={auth}
  validator={async (user) => {
    const docRef = doc(firestore, "profiles", user?.uid);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    const roles = data.roles;

    return data.roles.includes("admin");
  }}
  onSuccess={() => (
    <button>Delete Product</button>
  )}
/>
```

!!! warning
    Of course, this is a throw-away and quite simple example. Each render will cost one Firestore read. Optimize yourself.

### `isAuthenticated` Validator

This is the default validator used by `AuthorizationZone`. It will render the component only if the user is authenticated. Since it solely uses Firebase Auth, it does not cost anything.

In Firebase, there are two types of anonymity, check ["On Anonymity" section in `useSignOut` hook][OnAnonymity] to get a grasp of it. This validator returns false when user is really anonymous (meaning `null`) or when user is Firebase-handled anonymous.

If, for a reason, you'd like to consider Firebase-handled anonymous users as *authenticated*, then you can pass `true` to `includeFirebaseAnon`, the example is:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.isAuthenticated(true)}
  onSuccess={() => (
    <p>Authenticated or Firebase anon maybe</p>
  )}
/>
```

#### Input Parameters

Only takes positional parameters.

 Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `includeFirebaseAnon` | `boolean` | Consider Firebase-handled anonymous as *authenticated* as well | ❌ | `false` |

### `isAnonymous` Validator

This validator will render the component only if the user is anonymous. Since it solely uses Firebase Auth, it does not cost anything. A simple example would be:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.isAnonymous()}
  onSuccess={() => (
    <p>only anons can see this</p>
  )}
/>
```

In Firebase, there are two types of anonymity, check ["On Anonymity" section in `useSignOut` hook][OnAnonymity] to get a grasp of it. This validator returns `true` when user is really anonymous (meaning `null`) or when user is Firebase-handled anonymous.

If, for a reason, you'd like to consider Firebase-handled anonymous users as *authenticated* rather than *anonymous*, then you can pass `true` to `excludeFirebaseAnon`, the example is:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.isAnonymous(true)}
  onSuccess={() => (
    <p>definitely an anon, not even Firebase-handled</p>
  )}
/>
```

#### Input Parameters

Only takes positional parameters.

 Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `excludeFirebaseAnon` | `boolean` | Consider Firebase-handled anonymous as *authenticated* rather than *anonymous* | ❌ | `false` |

### `isVerified` Validator

This validator will render the component only if the user email is verified. Since it solely uses Firebase Auth, it does not cost anything. A simple example would be:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.isVerified()}
  onSuccess={() => (
    <p>This user is verified.</p>
  )}
/>
```

!!! warning
    If the user is a real anonymous (`null`), then `isVerified` validator will consider it as non-verified (`false`).

### `every` Validator

This validator is a kind of validator composer and will render the component only if all the subvalidators return `true`.

This example will render `onSuccess`:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.every([
    // your own validators or premade validators
    // can be async as well
    () => true,
    () => true,
  ])}
  onSuccess={() => (
    <p>successful</p>
  )}
/>
```

#### Input Parameters

Only takes positional parameters.

 Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `validators` | An array of `(user: User | null) => Promise<boolean> | boolean` | Returns `true` if all validations pass. | ✅ | - |

### `some` Validator

This validator is a kind of validator composer and will render the component if any of subvalidators return `true`.

This example will render `onSuccess`:

```typescript
<AuthorizationZone
  auth={auth}
  validator={Validators.some([
    // your own validators or premade validators
    // can be async as well
    () => false,
    () => true,
  ])}
  onSuccess={() => (
    <p>successful</p>
  )}
/>
```

#### Input Parameters

Only takes positional parameters.

 Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `validators` | An array of `(user: User | null) => Promise<boolean> | boolean` | Returns `true` if any of validations pass. | ✅ | - |

[AuthRefDoc]: https://firebase.google.com/docs/reference/node/firebase.auth.Auth
[UserRefDoc]: https://firebase.google.com/docs/reference/node/firebase.User
[onCreateTriggerDoc]: https://firebase.google.com/docs/functions/auth-events#trigger_a_function_on_user_creation
[OnAnonymity]: ../hooks/useSignOut.md#on-anonymity