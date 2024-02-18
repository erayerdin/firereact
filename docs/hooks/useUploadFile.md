---
tags:
  - hook
---

# `useUploadFile` Hook

`useUploadFile` hook is used to upload a file to Firebase Storage. It does not listen to the progress, thus, it is good for spinner-like indicators and quite performant. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useUploadFile(reference);
const result = await dispatch(file);
```

!!! warning
    `useUploadFile` is lazy by default and will not do anything until you use `dispatch` function.

```typescript
const { state } = useUploadFile(reference);
await dispatch();
// `state` is "ready" | "loading" | "done"
```

`dispatch` method will return an instance of [`UploadResult`][UploadResultRefDoc].

## Input Parameters

Input parameters for `useUploadFile` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useUploadFile` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "done"` | The state of the upload process. |
| `dispatch` | `(file: File | Blob | Buffer, metadata?: UploadMetadata) => Promise<UploadResult>` | A callback to start upload process. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference
[UploadResultRefDoc]: https://firebase.google.com/docs/reference/js/storage.uploadresult