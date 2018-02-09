import Vue from 'vue';
import * as firebase from 'firebase';

const eventBus = new Vue();

let rotationRef, instanceRef;

const config = {
  apiKey: "AIzaSyDXXtRY3pMh8Qu3e7dWkQ3TF2yMjDRYbUY",
  authDomain: "agile-cards-vr.firebaseapp.com",
  databaseURL: "https://agile-cards-vr.firebaseio.com",
  projectId: "agile-cards-vr",
  storageBucket: "agile-cards-vr.appspot.com",
  messagingSenderId: "224966352015"
};

function sanitizeFirebasePath(path) {
    return path
        .replace(/\./g, '%DOT%')
        .replace(/#/g, '%HASH%')
        .replace(/\$/g, '%DOLLAR%')
        .replace(/\[/g, '%LBRACKET%')
        .replace(/]/g, '%RBRACKET%')
}

function desanitizeFirebasePath(path) {
    return path
        .replace(/%DOT%/g, '.')
        .replace(/%HASH%/g, '#')
        .replace(/%DOLLAR%/g, '$')
        .replace(/%LBRACKET%/g, '[')
        .replace(/%RBRACKET%/g, ']')
}

firebase.initializeApp(config);

const db = firebase.database().ref('users');

export async function startFirebase(userKey) {
  setActiveUser(userKey);

  db.on('child_added', snapshot => eventBus.$emit('user-added', snapshot.val()));
  db.on('child_removed', snapshot => eventBus.$emit('user-removed', snapshot.key));
  db.on('child_changed', snapshot => eventBus.$emit('user-changed', snapshot.val()));
}

export async function setActiveUser(userKey) {
    firebase.database().ref('.info/connected').on('value', async snapshot => {
        if (!snapshot.val()) {
            return instanceRef && instanceRef.remove();
        }

        const instanceRef = db.child(sanitizeFirebasePath(userKey));
        await instanceRef.onDisconnect().remove();
        instanceRef.update({ userKey });
    });
}

export async function setUserRotation(userKey, rotation) {
    db.child(sanitizeFirebasePath(userKey)).child('rotation').set(rotation || {});
}

/*db.ref('rotation').once('value', (snapshot) => {
  eventBus.$emit('rotation', snapshot.val() || {});
} );

subscribeForRotation();
*/

export function onChangeUser(listener) {
  eventBus.$on('user-changed', listener);
}

export function onAddUser(listener) {
  eventBus.$on('user-added', listener);
}

export function onRemoveUser(listener) {
  eventBus.$on('user-removed', listener);
}
