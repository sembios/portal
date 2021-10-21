import firebase from 'firebase/app'
import 'firebase/database' 

const firebaseConfig = {
  apiKey: "AIzaSyD_QSt4hyXwsViX8M2mQlApCHjnjJcH5GE",
  authDomain: "database-9bd84.firebaseapp.com",
  databaseURL: "https://database-9bd84-default-rtdb.firebaseio.com",
  projectId: "database-9bd84",
  storageBucket: "database-9bd84.appspot.com",
  messagingSenderId: "229473698094",
  appId: "1:229473698094:web:f015cc58316b5c448ababf"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
  