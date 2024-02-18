---
tags:
  - hook
---

# `useDeleteFile` Hook

`useDeleteFile` hook is used to delete a file from Firebase Storage. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useDeleteFile(reference);
await dispatch();
```

!!! warning
    `useDeleteFile` is lazy by default and will not do anything until you use `dispatch` function.

You can also listen to the state:

```typescript
const { state } = useDeleteFile(reference);
await dispatch();
// `state` is "ready" | "loading" | "done"
```

## Input Parameters

Input parameters for `useDeleteFile` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useDeleteFile` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "done"` | The state of the deletion process. |
| `dispatch` | `() => Promise<void>` | A callback to start deletion process. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference