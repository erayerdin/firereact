---
tags:
  - component
---

# `StorageMetadata` Component

You can use `StorageMetadata` component to render metadata for a file in Firebase Storage. The simplest usage would be:

```typescript
const fileRef = ref(storage, "path/to/remote/file.png");

// ...

<StorageMetadata
  reference={fileRef}
  onDone={(metadata) => (
    <div>
      <div>File name: {metadata.name}</div>
      <div>File size: {metadata.size}</div>
    </div>
  )}
/>
```

You can also define how your loading state will look like as such:

```typescript
<StorageMetadata
  reference={docRef}
  onLoading={() => (
    <div>Loading...</div>
    {/** or a spinner */}
  )}
  onDone={(metadata) => (
    <div>
      <div>File name: {metadata.name}</div>
      <div>File size: {metadata.size}</div>
    </div>
  )}
/>
```

## Input Parameters

Input parameters for `StorageMetadata` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
| `onDone` | `(metadata: FullMetadata) => ReactNode`[^fullmetadata] | The component to render when the process is done. | ✅ | - |
| `onLoading` | `() => ReactNode` | The component to render while it's loading. | ❌ | An empty component. |

[^fullmetadata]: Refer to [`FullMetadata`][FullMetadataRefDoc].

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/android/com/google/firebase/storage/StorageReference
[FullMetadataRefDoc]: https://firebase.google.com/docs/reference/js/storage.fullmetadata