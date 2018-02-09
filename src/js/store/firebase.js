import Vue from 'vue';
import * as firebase from 'firebase';

const eventBus = new Vue();

let rotationRef;

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

function startFirebase(userKey) {
  db.child(userKey).set({
    
  });
  
  db.on('child_added', snapshot => eventBus.$emit('user-added', snapshot.val()));  
  db.on('child_removed', snapshot => eventBus.$emit('user-removed', snapshot.key));  
  db.on('child_changed', snapshot => eventBus.$emit('user-changed', snapshot.val()));  
}

// From retros
export async function setActiveUser(userName) {
    firebase.database().ref('.info/connected').on('value', async snapshot => {
        if (!snapshot.val()) {
            return instanceRef && instanceRef.remove();
        }

        const activeUserRef = activeUsersRef.child(sanitizeFirebasePath(userName));
        activeUserRef.update({ userName });

        instanceRef = activeUserRef.child('instances').push();
        await instanceRef.onDisconnect().remove();
        instanceRef.set(true);
    });
}


/*db.ref('rotation').once('value', (snapshot) => {
  eventBus.$emit('rotation', snapshot.val() || {});
} );

subscribeForRotation();
*/
export async function subscribeForRotation() {
  if (rotationRef) {
    rotationRef.off('value');
  }
  rotationRef = db.ref('rotation');
  rotationRef.on('value', snapshot => {
    eventBus.$emit('rotation', snapshot.val() || {});
  }, console.error);
}

export function onChangeRotation(listener) {
  eventBus.$on('rotation', listener);
}