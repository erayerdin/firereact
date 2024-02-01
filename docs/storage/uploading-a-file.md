# Uploading a File

To upload file to Firebase Storage, you can use one of the following methods:

 - [`useUploadFile` hook](../hooks/useUploadFile.md) to simply upload a file when you do not care about the progress (good for rendering a spinner, no constant state changes, thus performant)
 - [`useUploadFileResumable` hook](../hooks/useUploadFileResumable.md) to upload a file while listening to the progress (good for rendering a progressbar, continuous state changes, thus a bit less performant)