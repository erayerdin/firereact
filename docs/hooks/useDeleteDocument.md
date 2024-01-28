---
tags:
  - hook
---

# `useDeleteDocument` Hook

`useDeleteDocument` hook is used to delete a document in Firestore. A very simple example would be:

```typescript
const docRef = doc(firestore, "collectionName", "docId");
const { state, dispatch, error } = useDeleteDocument(docRef);
const docRef = await dispatch();
```

!!! info
    Nothing is done until you use `dispatch` returned by `useDeleteDocument` hook.

!!! warning
    Do not use `dispatch` in parallel as it will cause race conditions.

## Input Parameters

Input parameters for `useDeleteDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReferen`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |

## Return Type

`useDeleteDocument` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready"` or `"loading"` or `"done"`  | Whether this hook is ready to dispatch, currently dispatching or has dispatched successfully. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |
| `dispatch` | `() => Promise<DocumentReference | undefined>` | A function to start adding a document. |

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError