import firebase from 'firebase';
import 'firebase/analytics';
import isNode from 'detect-node'

const config = {
    // TODO: change firebase config
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app();
}

export const analytics = (event, params) => {
    if (!isNode) {
        firebase.analytics().logEvent(event, params)
    }
}
export const db = firebase.firestore();

export default firebase