---
tags:
  - hook
---

# `useDocument` Hook

`useDocument` hook is used to retrieve a single Firestore document. A very simple example would be:

```typescript
const docRef = doc(firestore, "collectionName", "documentId");
const { loading, snapshot, error } = useDocument({
  reference: docRef,
});
```

By default, `useDocument` retrieves a document only once. If you need realtime updates, you can set `options.listen` to `true` as below:

```typescript
const { loading, snapshot, error } = useDocument({
  reference: docRef,
  options: { listen: true },
});
```

`useDocument` also supports converting data from Firestore. The simples example would be:

```typescript
type Profile = {
  id: string;
  displayName: string;
  bio: string;
  profilePicture: string;
}

const {
    loading,
    data, // notice how we get `data` instead of `snapshot`
    error
} = useDocument({
  reference: docRef,
  converter: (snapshot): Profile => {
    const data = snapshot.data();

    if (data) { // if data exists
      return {
        id: snapshot.id,
        ...data, // rest is what we got
      }
    }
  }
});
```

!!! warning
    `data` will always be `undefined` if no converter is provided.

## Input Parameters

Input parameters for `useDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
| `converter` | `(snapshot: DocumentSnapshot) => O` where `O` is a generic type.[^refDocumentSnapshot] | Converter for data. | ❌ | `() => undefined` |
| `options` | Object | Options for the hook. | ❌ | `{ listen: false }` |
| `options.listen` | `boolean` | Whether to listen to realtime changes of the document or not. | ❌ | `false` |

!!! note
    `options.listen` is `false` by default to prevent unnecessary READ queries from Firestore.

!!! warning
    When `options.listen` is `true`, the change is reflected including the metadata changes on the document. See [this page](https://firebase.google.com/docs/firestore/query-data/listen#events-metadata-changes) to understand `includeMetadataChanges` option in Firestore.

## Return Type

`useDocument` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `loading` | `boolean` | Whether the hook is loading the document or not. |
| `snapshot` | [`firebase/firestore/DocumentSnapshot`][DocumentSnapshotRefDoc] or `undefined` | Snapshot of the retrieved document. |
| `data` | `O` or `undefined` | Type-safe data if `converter` is defined in input parameters. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[^refDocumentSnapshot]: Refer to [DocumentSnapshot][DocumentSnapshotRefDoc].

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[DocumentSnapshotRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentSnapshot
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError