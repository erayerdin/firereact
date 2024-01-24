# Contexts and Providers

Optionally, you can use contexts and providers provided by `firereact` to get the instance of your Firebase app or any specific service to avoid prop-drilling and global variables.

Later, in your code, you can access to these instances via [useContext][useContextDoc] as such:

```typescript
const YourCustomComponent = () => {
  const firestore = useContext(FirestoreContext);

  // use `firestore` instance
}
```

!!! info
    This is totally *optional* and you can still stick to classic prop-drilling methods or global variables.

## Setting Up

After you install `firereact`, head to you application entry point (`index.ts`, `main.tsx` or maybe `App.tsx`) and wrap your app with providers given by `firereact` library.

### Setting Up for Firebase

Head to your entry point and wrap your app with `FirebaseProvider`:

```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseProvider app={app}>
      {/** the rest of your app */}
    </FirebaseProvider>
  </React.StrictMode>
)
```

`FirebaseProvider` only requires one parameter with signature `app: FirebaseApp`.

Now, you can get the instance of your `FirebaseApp` anywhere in the component tree by simply doing:

```typescript
const app = useContext(FirebaseAppContext);
```

!!! tip
    The type you get from `useContext` is `FirebaseApp | undefined`. You can simply use `app!` (non-null assertion operator) as you guarantee it to be defined when you use `FirebaseProvider`.

### Setting Up for Firestore

Head to your entry point and wrap your app with `FirestoreProvider`:

```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirestoreProvider firestore={firestore}>
      {/** the rest of your app */}
    </FirestoreProvider>
  </React.StrictMode>
)
```

`FirestoreProvider` only requires one parameter with signature `firestore: Firestore`.

Now, you can get the instance of your `Firestore` anywhere in the component tree by simply doing:

```typescript
const firestore = useContext(FirestoreContext);
```

!!! tip
    The type you get from `useContext` is `Firestore | undefined`. You can simply use `firestore!` (non-null assertion operator) as you guarantee it to be defined when you use `FirestoreProvider`.

### Setting Up for Multiple Instances

Sometimes, wrapping your entry point with multiple providers might look ugly. In that case, you can use `FirebaseSuiteProvider`, which lets you selectively choose what types of Firebase services should be injected into your global app context.

Head to your entry point and wrap your app with `FirebaseSuiteProvider`:

```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseSuiteProvider
      app={app} {/** optional */}
      firestore={firestore} {/** optional */}
    >
      {/** the rest of your app */}
    </FirebaseSuiteProvider>
  </React.StrictMode>
)
```

All the parameters for `FirebaseSuiteProvider` are optional.

Now, you can get the instance of any service anywhere in the component tree by simply doing:

```typescript
const app = useContext(FirebaseAppContext);
const firestore = useContext(FirestoreContext);
```

!!! warning
    The type you get from `useContext` can be `undefined`. You need to make sure you provide the instance of a specific Firebase service globally before using non-null assertion operator.

[useContextDoc]: https://react.dev/reference/react/useContext