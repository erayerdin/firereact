---
tags:
  - hook
---

# `useUploadFileResumable` Hook

`useUploadFileResumable` hook is used to upload a file to Firebase Storage. It listens to the progress, thus, it is good for progressbar-like indicators but not performant at all since it causes frequent rerendering due to constant state changes. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useUploadFileResumable(reference);
const result = await dispatch(file);
```

!!! warning
    `useUploadFileResumable` is lazy by default and will not do anything until you use `dispatch` function.

You can listen to its state shown in example below:

```typescript
const { state } = useUploadFileResumable(reference);
await dispatch();
// `state` is "ready" | [number, number] | "done"

if (typeof state === "array") {
  const bytesTransferred = state[0];
  const bytesTotal = state[1];
}
```

`dispatch` method will return an instance of [`UploadResult`][UploadResultRefDoc].

## Input Parameters

Input parameters for `useUploadFileResumable` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useUploadFileResumable` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | [number, number] | "done"` | The state of the upload process. |
| `dispatch` | `(file: File | Blob | Buffer, metadata?: UploadMetadata) => Promise<UploadResult>` | A callback to start upload process. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference
[UploadResultRefDoc]: https://firebase.google.com/docs/reference/js/storage.uploadresult