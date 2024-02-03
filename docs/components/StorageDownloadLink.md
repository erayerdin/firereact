---
tags:
  - component
---

# `StorageDownloadLink` Component

You can use `StorageDownloadLink` component to render a link for a file in Firebase Storage. The simplest usage would be:

```typescript
const fileRef = ref(storage, "path/to/remote/file.png");

// ...

<StorageDownloadLink
  reference={fileRef}
  onDone={(link) => (
    <a href={link} target="_blank">A Picture of a Cat</a>
  )}
/>
```

You can also define how your loading state will look like as such:

```typescript
<StorageDownloadLink
  reference={docRef}
  onLoading={() => (
    <div>Loading...</div>
    {/** or a spinner */}
  )}
  onDone={(link) => (
    <a href={link} target="_blank">A Picture of a Cat</a>
  )}
/>
```

## Input Parameters

Input parameters for `StorageDownloadLink` component is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `reference` | [`firebase/storage/StorageReference`][StorageReferenceRefDoc] | Reference to a document in Firestore. | ✅ | - |
| `onDone` | `(link: string) => ReactNode` | The component to render when the process is done. | ✅ | - |
| `onLoading` | `() => ReactNode` | The component to render while it's loading. | ❌ | An empty component. |

[StorageReferenceRefDoc]: https://firebase.google.com/docs/reference/android/com/google/firebase/storage/StorageReference