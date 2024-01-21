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

By default, `useDocument` retrieves a document only once. If you need realtime updates, you can set `options.live` to `true` as below:

```typescript
const { loading, snapshot, error } = useDocument(docRef, { live: true });
```

## Input Parameters

Input parameters for `useDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
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
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[DocumentSnapshotRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentSnapshot
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError