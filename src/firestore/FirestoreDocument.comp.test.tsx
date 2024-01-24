// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { render, screen } from "@testing-library/react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import sleep from "sleep-sleep";
import { FirestoreDocument } from ".";
import { firestore } from "../firebase";

const docRef = doc(firestore, "FirestoreDocument", "doc1");
const docData = { displayName: "Firestore Document" };

describe("initially FirestoreDocument component", () => {
  it("should return loading", async () => {
    // setup
    await deleteDoc(docRef);

    // test
    render(
      <FirestoreDocument
        reference={docRef}
        loading={() => <div>Loading...</div>}
        done={() => <></>}
      />,
    );
    expect(screen.getByText("Loading...").innerHTML).toBe("Loading...");
  });
});

describe("later FirestoreDocument component", () => {
  it("should return display name", async () => {
    // setup
    await deleteDoc(docRef);
    await setDoc(docRef, docData);

    // test
    render(
      <FirestoreDocument
        reference={docRef}
        loading={() => <div>Loading...</div>}
        done={(snapshot) => <div>{snapshot.data()?.displayName}</div>}
      />,
    );
    await sleep(250);
    expect(screen.getByText(docData.displayName).innerHTML).toBe(
      "Firestore Document",
    );

    // teardown
    await deleteDoc(docRef);
  });
});
