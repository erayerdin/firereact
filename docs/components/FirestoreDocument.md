---
tags:
  - component
---

# `FirestoreDocument`

You can use `FirestoreDocument` component to read a single document from Firestore in a declarative approach. The simplest usage would be:

```typescript
const docRef = doc(firestore, "yourCollection", "docId");

// ...

<FirestoreDocument
  reference={docRef}
  onDone={(snapshot) => {
    const id = snapshot.id;
    const data = snapshot.data();

    return (
      <div>
        {id}: {data.username}
      </div>
    );
  }}
/>
```

You can also define how your loading and error states will look like as such:

```typescript
<FirestoreDocument
  reference={docRef}
  onLoading={() => {
    return <div>Loading...</div>
  }}
  onError={(error) => {
    // error: FirebaseError
    return <div>{error.code}</div>
  }}
  onDone={(snapshot) => {
    // return a component when it's done
  }}
/>
```

Or, in a shorter syntax:

```typescript
<FirestoreDocument
  reference={docRef}
  onLoading={() => (<div>Loading...</div>)}
  onError={(error) => (<div>{error.code}</div>)}
  onDone={(snapshot) => {
    // return a component when it's done
  }}
/>
```

You can also listen to real-time changes in Firestore using `listen`:

```
<FirestoreDocument
  reference={docRef}
  listen
  onLoading={() => (<div>Loading...</div>)}
  onError={(error) => (<div>{error.code}</div>)}
  onDone={(snapshot) => {
    // return a component when it's done
  }}
/>
```

## Input Parameters

Input parameters for `FirestoreDocument` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
| `onDone` | `(snapshot: DocumentSnapshot) => ReactNode`[^1] | The component to render when the process is done. | ✅ | - |
| `listen` | `boolean` | Whether to listen to realtime changes of the document or not. | ❌ | `false` |
| `onLoading` | `() => ReactNode` | The component to render while it's loading. | ❌ | An empty component |
| `onError` | `(error: FirebaseError) => ReactNode`[^2] | The component to render when a Firebase error occurs. | ❌ | An empty component |

!!! note
    `listen` is `false` by default to prevent unnecessary READ queries from Firestore.

!!! warning
    When `listen` is `true`, the change is reflected including the metadata changes on the document. See [this page](https://firebase.google.com/docs/firestore/query-data/listen#events-metadata-changes) to understand `includeMetadataChanges` option in Firestore.

[^1]: See [`firebase/firestore/DocumentSnapshot`][DocumentSnapshotRefDoc].
[^2]: See [`firebase/FirebaseError`][FirebaseErrorRefDoc].

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[DocumentSnapshotRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentSnapshot
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError