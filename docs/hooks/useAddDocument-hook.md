---
tags:
  - hook
---

# `useAddDocument` Hook

`useAddDocument` hook is used to create documents in a collection in Firebase. A very simple example would be:

```typescript
const colRef = collection(firestore, "collectionName");
const { state, dispatch, reference, error } = useAddDocument(colRef);
const docData = { name: "Eray", surname: "Erdin" };
const docRef = await dispatch(docData);
```

!!! info
    Nothing is done until you use `dispatch` returned by `useAddDocument` hook.

!!! warning
    Do not use `dispatch` in parallel as it will cause race conditions.

## Input Parameters

Input parameters for `useAddDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/CollectionReference`][CollectionReferenceRefDoc] | Reference to a collection in Firestore or a query. | ✅ | - |

## Return Type

`useAddDocument` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready"` or `"loading"` or `"done"`  | Whether this hook is ready to dispatch, currently dispatching or has dispatched successfully. |
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] or `undefined` | Reference of the added document. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |
| `dispatch` | `(data: DocumentData) => Promise<DocumentReference | undefined>` | A function to start adding a document. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[CollectionReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.CollectionReference
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError