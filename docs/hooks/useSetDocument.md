---
tags:
  - hook
---

# `useSetDocument` Hook

`useSetDocument` hook is used for one of these purposes:

 - To create a document by defining its ID instead of random-generated ID provided by Firestore
 - To totally overwrite the existing document.
 - To merge new fields and update existing ones in an already present document.

A very simple example would be:

```typescript
const docRef = doc(firestore, "collectionName", "docId");
const { state, dispatch, error } = useSetDocument(docRef);
const docData = { name: "Eray", surname: "Erdin" };
const docRef = await dispatch(docData);
```

!!! info
    Nothing is done until you use `dispatch` returned by `useSetDocument` hook.

!!! warning
    Do not use `dispatch` in parallel as it will cause race conditions.

You can also use `useSetDocument` to update a document.

```typescript
const docRef = doc(firestore, "collectionName", "existingDocId");
const { state, dispatch, error } = useSetDocument(docRef);

// document before: { name: "Ilia", surname: "Tayefi", age: 20 }
const docData = { name: "Eray", surname: "Erdin" };
const docRef = await dispatch(docData);
// document after: { name: "Eray", surname: "Erdin" }
```

However, as you can observe on the code snippet above, this totally overwrites the existing document. If you'd like to change some fields in the document with provided `docData` without touching the other fields, what you'd like to do is to set `merge` option on `dispatch` function as such:

```typescript
const docRef = doc(firestore, "collectionName", "existingDocId");
const { state, dispatch, error } = useSetDocument(docRef);

// document before: { name: "Ilia", surname: "Tayefi", age: 20 }
const docData = { name: "Eray", surname: "Erdin" };
const docRef = await dispatch(docData, { merge: true });
// document after: { name: "Eray", surname: "Erdin", age: 20 }
```

## Input Parameters

Input parameters for `useSetDocument` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/firestore/DocumentReference`][DocumentReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |

## Return Type

`useSetDocument` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready"` or `"loading"` or `"done"`  | Whether this hook is ready to dispatch, currently dispatching or has dispatched successfully. |
| `error` | [`firebase/FirebaseError`][FirebaseErrorRefDoc] or `undefined` | The instance of error if any. |
| `dispatch` | `(data: DocumentData, options?: SetOptions) => Promise<DocumentReference | undefined>`[^1] | A function to set the content of a document. |

[^1]: You can see API docs for `SetOptions` [here][SetOptionsRefDoc] or read its usage document [here][SetADocumentDoc]. To keep it simple, it is simply a `{ merge: boolean, mergeFields: string[] }` type where `merge` is to merge given data into the document and `mergeFields` to specify which fields to specifically merge (useful especially in batch operations).

!!! warning
    Only [`firebase/FirebaseError`][FirebaseErrorRefDoc] is caught if any. `error` will not be an instance of another type.

[DocumentReferenceRefDoc]: https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentReference
[SetOptionsRefDoc]: https://firebase.google.com/docs/reference/android/com/google/firebase/firestore/SetOptions
[SetADocumentDoc]: https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
[FirebaseErrorRefDoc]: https://firebase.google.com/docs/reference/node/firebase.FirebaseError