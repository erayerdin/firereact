---
tags:
  - hook
---

# `useDocument` Hook

`useDocument` hook is used to retrieve a single Firestore document. A very simple example would be:

```typescript
const docRef = doc(firestore, "collectionName", "documentId");
const { loading, snapshot, error } = useDocument(docRef);
```

By default, `useDocument` retrieves a document only once. If you need realtime updates, you can set `options.listen` to `true` as below:

```typescript
const { loading, snapshot, error } = useDocument(docRef, { listen: true });
```

## Input Parameters

Input parameters for `useDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
| `options` | Object | Options for the hook. | ❌ | See the following parameters. |
| `options.listen` | `boolean` | Whether to listen to realtime changes of the document or not. | ❌ | `false` |
| `options.listenToMetadataChanges` | `boolean` | Whether to listen to realtime changes of the document as well its metadata. See [here][EventsForMetadataChangesDoc] | ❌ | `false` |

!!! note
    `options.listen` is `false` by default to prevent unnecessary READ queries from Firestore.

## Return Type

`useDocument` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `loading` | `boolean` | Whether the hook is loading the document or not. |
| `snapshot` | [`firebase/firestore/DocumentSnapshot`][DocumentSnapshotRefDoc] or `undefined` | Snapshot of the retrieved document. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[DocumentSnapshotRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentSnapshot
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError
[EventsForMetadataChangesDoc]: https://firebase.google.com/docs/firestore/query-data/listen#events-metadata-changes