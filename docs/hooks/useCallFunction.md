---
tags:
  - hook
---

# `useCallFunction` hook

`useCallFunction` hook is used to invoke a function in Firebase Functions. A very simple example would be:

```typescript
const { invoke } = useCallFunction(functions, { name: "yourFunctionName" });
const result = await invoke({
  // ... request data to send ...
});
const data = result.data; // response data
```

!!! warning
    `useCallFunction` is lazy by default and will not do anything until you use `invoke` function.

You can also check the state of the invocation as such:

```typescript
const { state } = useCallFunction({ functions });
await invoke();
// `state` is "ready" | "loading" | "done"
```

`invoke` method will return an instance of [`HttpsCallableResult<unknown>`][HttpsCallableResultRefDoc].

## Input Parameters

Input parameters for `useCallFunction` hook is as follows:

| Name | Type | Description | Required | Default Value |
|---|---|---|---|---|
| `functions` | [`firebase/functions/Functions`][FunctionsRefDoc] | Reference to the Firebase Functions service instance. | ✅ | - |
| `options` | `Object` | Options for the process. | ✅ | See below. |
| `options.name` | `string` | The name of the function to be called. | ✅ | - |
| `options.httpsCallableOptions` | [`firebase/functions/HttpsCallableOptions`][HttpsCallableOptionsRefDoc] | The options for callable. | ❌ | `undefined` |

## Return Type

`useCallFunction` hook returns an object with properties as below:

| Name | Type | Description |
|---|---|---|
| `state` | `"ready" | "loading" | "done"` | The state of the invocation process. |
| `invoke` | `(data: unknown) => Promise<HttpsCallableResult<unknown>>` | A callback to start invocation process. |

[FunctionsRefDoc]: https://firebase.google.com/docs/reference/js/functions.functions
[HttpsCallableOptionsRefDoc]: https://firebase.google.com/docs/reference/js/functions.httpscallableoptions
[HttpsCallableResultRefDoc]: https://firebase.google.com/docs/reference/js/functions.httpscallableresult