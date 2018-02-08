import Vue from 'vue';
import * as firebase from 'firebase';

const eventBus = new Vue();

let roationRef;

const config = {
  apiKey: "AIzaSyDXXtRY3pMh8Qu3e7dWkQ3TF2yMjDRYbUY",
  authDomain: "agile-cards-vr.firebaseapp.com",
  databaseURL: "https://agile-cards-vr.firebaseio.com",
  projectId: "agile-cards-vr",
  storageBucket: "agile-cards-vr.appspot.com",
  messagingSenderId: "224966352015"
};

firebase.initializeApp(config);

const db = firebase.database();

export async function subscribeForRotation() {
  if (rotationRef) {
    rotationRef.off('value');
  }
  rotationRef = db.child('rotation');
  rotationRef.on('value', snapshot => {
    eventBus.$emit('rotation', snapshot.val() || {});
  }, console.error);
}

export function onChangeRotation(listener) {
  eventBus.$on('rotation', listener);
}