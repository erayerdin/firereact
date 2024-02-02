# Downloading a File

You can use one of the following ways to download a file from Firebase Storage:

 - [`useDownloadLink` hook](../hooks/useDownloadLink.md) to get the link to download
 - [`useDownloadBlob` hook](../hooks/useDownloadBlob.md) to directly download the bytes to process it yourself
 - [`useDownloadBytes` hook](../hooks/useDownloadBytes.md) to directly download the bytes to process it yourself
 - [`StorageDownloadLink` component](../components/StorageDownloadLink.md)

## `useDownloadBlob` vs. `useDownloadBytes`

`useDownloadBlob` uses [`getBlob`][getBlobRefDoc] function in Firebase Storage under the hood while `useDownloadBytes` uses [`getBytes`][getBytesRefDoc].

So, `useDownloadBlob` returns [`Blob`][BlobRef] as `useDownloadBytes` returns [`ArrayBuffer`][ArrayBufferRefDoc].

Generally speaking, both data types represent array of bytes but have subtle differences. You can refer to [this Stackoverflow answer](https://stackoverflow.com/a/39951543/2926992) to learn about the difference.

[getBlobRefDoc]: https://firebase.google.com/docs/reference/js/storage#getblob
[getBytesRefDoc]: https://firebase.google.com/docs/reference/js/storage#getbytes
[BlobRef]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[ArrayBufferRefDoc]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer