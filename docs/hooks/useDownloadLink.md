---
tags:
  - hook
---

# `useDownloadLink` Hook

`useDownloadLink` hook is used to get the download link of a file in Firebase Storage. A very simple example would be:

```typescript
const reference = ref(storage, "path/to/remote/file.png");
const { dispatch } = useDownloadLink(reference);
const link = await dispatch();
```

!!! warning
    `useDownloadLink` is lazy by default and will not do anything until you use `dispatch` function.

You can get the state of the progress with this example.

```typescript
const { state } = useDownloadLink(reference);
const link = await dispatch();
// `state` is "ready" | "loading" | "done"
```

`dispatch` method will return an instance of `string`, but additionally, you can also listen to `link` from `useDownloadLink` hook as well:

```typescript
const { link } = useDownloadLink(reference);
// link updates and rerenders when the state is `"done"`
// until then, it is `undefined`
await dispatch();
```

## Input Parameters

Input parameters for `useDownloadLink` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a file in Storage. | ✅ | - |

## Return Type

`useDownloadLink` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `link` | `string | undefined` | The download link. `undefined` if the `state` is not `"done"`. |
| `state` | `"ready" | "loading" | "done"` | The state of the process. |
| `dispatch` | `() => Promise<string>` | A callback to start the process and return the link. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/js/storage.storagereference