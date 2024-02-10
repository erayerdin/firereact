---
tags:
  - hook
---

# `useCollection` Hook

`useCollection` hook is used to list a collection in Firebase. A very simple example would be:

```typescript
const colRef = collection(firestore, "collectionName");
const { loading, snapshot, error } = useCollection(colRef);
```

You can also pass in a customized query:

```typescript
const colRef = collection(firestore, "collectionName");
const query = query(colRef, where("field", "==", "value"));
const { loading, snapshot, error } = useCollection(query);
```

By default, `useCollection` lists a collection only once. If you need realtime updates, you can set `options.listen` to `true` as below:

```typescript
const { loading, snapshot, error } = useCollection(colRef, { listen: true });
```

## Input Parameters

Input parameters for `useCollection` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/CollectionRefference`][CollectionReferenceRefDoc] or [`firebase/firestore/Query`][QueryRefDoc] | Reference to a collection in Firestore or a query. | ✅ | - |
| `options` | Object | Options for the hook. | ❌ | See below. |
| `options.listen` | `boolean` | Whether to listen to realtime changes of the document or not. | ❌ | `false` |
| `options.listenToMetadataChanges` | `boolean` | Whether to listen to realtime changes of the document or not as well as its metadata. See [this][EventsForMetadataChangesDoc]. | ❌ | `false` |

!!! note
    `options.listen` is `false` by default to prevent unnecessary READ queries from Firestore.

## Return Type

`useCollection` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `loading` | `boolean` | Whether the hook is loading the collection or not. |
| `snapshot` | [`firebase/firestore/QuerySnapshot`][QuerySnapshotRefDoc] or `undefined` | Snapshot of the retrieved document. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[CollectionReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.CollectionReference
[QueryRefDoc]: https://firebase.google.com/docs/reference/node/firebase.database.Query
[QuerySnapshotRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.QuerySnapshot
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError
[EventsForMetadataChangesDoc]: https://firebase.google.com/docs/firestore/query-data/listen#events-metadata-changes