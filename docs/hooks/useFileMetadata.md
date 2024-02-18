---
tags:
  - hook
---

# `useFileMetadata` Hook

`useFileMetadata` hook is used to get the metadata of a file in Firebase Storage. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useFileMetadata(reference);
const metadata = await dispatch();
```

!!! warning
    `useFileMetadata` is lazy by default and will not do anything until you use `dispatch` function.

You can get the state of the progress with this example.

```typescript
const { state } = useFileMetadata(reference);
const metadata = await dispatch();
// `state` is "ready" | "loading" | "done"
```

`dispatch` method will return an instance of [`FullMetadata`][FullMetadataRefDoc], but additionally, you can also listen to `metadata` from `useFileMetadata` hook as well:

```typescript
const { metadata } = useFileMetadata(reference);
// metadata updates and rerenders when the state is `"done"`
// until then, it is `undefined`
await dispatch();
```

## Input Parameters

Input parameters for `useFileMetadata` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useFileMetadata` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `metadata` | [`FullMetadata`][FullMetadataRefDoc] or `undefined` | Metadata of file. `undefined` if the `state` is not `"done"`. |
| `state` | `"ready" | "loading" | "done"` | The state of the process. |
| `dispatch` | `() => Promise<FullMetadata>` | A callback to start the process and return the metadata. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference
[FullMetadataRefDoc]: https://firebase.google.com/docs/reference/js/storage.fullmetadata