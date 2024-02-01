---
tags:
  - hook
---

# `useUploadFile` Hook

`useUploadFile` hook is used to upload a file to Firebase Storage. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useUploadFile({ reference });
const result = await dispatch(file);
```

`dispatch` method will return an instance of [`UploadResult`][UploadResultRefDoc].

!!! warning
    `useUploadFile` is lazy by default and will not do anything until you use `dispatch` function.

```typescript
const { state } = useUploadFile({ reference });
await dispatch();
// `state` is "ready" | [number, number] | "done"
```

Unlike other hooks, `useUploadFile` does not have a `"loading"` state. Instead, it will have `[number, number]` state. The first element represents the transferred bytes while the last one represents the total bytes, so you can use these to reflect it on a kind of progressbar.

If you do not want to use a progressbar but use a spinner-like interface to keep it simple, you can get `"loading"` state as such:

```typescript
const isUploading = typeof state === "array";
// will be true if uploading
// will be false if not
```

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