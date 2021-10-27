/* eslint-disable no-undef */
/* eslint-disable prefer-template */
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { v4 as uuidv4 } from "uuid";

export function uploadFileFirebase(file) {
  return new Promise((resolve, reject) => {
    // Create the file metadata
    const metadata = {
      contentType: "image/gif",
    };
    const storageRef = firebase.storage().ref();
    // Upload file and metadata to the object 'images/mountains.jpg'
    const fileUuid = uuidv4();
    const uploadTask = storageRef
      .child("content/" + fileUuid)
      .put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      () => {},
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject(
              new Error("User doesn't have permission to access the object"),
            );
            break;
          case "storage/canceled":
            // User canceled the upload
            reject(new Error("User canceled the upload"));
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            reject(
              new Error("Unknown error occurred, inspect error.serverResponse"),
            );
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
}
