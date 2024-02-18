---
tags:
  - hook
---

# `useDownloadBytes` Hook

`useDownloadBytes` hook is used to directly download a file as bytes from Firebase Storage. Instead of [`useDownloadLink` hook](./useDownloadLink.md), this hook might be useful to process a file byte by byte instead of directly downloading to the user's machine.

A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useDownloadBytes(reference);
const bytes = await dispatch(file);
```

!!! warning
    `useDownloadBytes` is lazy by default and will not do anything until you use `dispatch` function.

You can get the state of the progress with this example.

```typescript
const { state } = useDownloadBytes(reference);
const bytes = await dispatch();
// `state` is "ready" | "loading" | "done"
```

`dispatch` method will return an instance of [`Blob`][BlobDoc], but additionally, you can also listen to [`Blob`][BlobDoc] from `useDownloadBytes` hook as well:

```typescript
const { bytes } = useDownloadBytes(reference);
// bytes updates and rerenders when the state is `"done"`
// until then, it is `undefined`
await dispatch();
```

## Input Parameters

Input parameters for `useDownloadBytes` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useDownloadBytes` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `bytes` | [`ArrayBuffer`][ArrayBufferRefDoc] or `undefined` | The bytes of remote file to read. `undefined` if the `state` is not `"done"`. |
| `state` | `"ready" | "loading" | "done"` | The state of the process. |
| `dispatch` | `(maxDownloadSizeBytes? number) => Promise<string>` | A callback to start the process and return the link. You can also define how many bytes to download at most. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference
[ArrayBufferRefDoc]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer