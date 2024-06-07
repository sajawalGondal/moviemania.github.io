// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB5NYYPBXZKSSbQCkWSTIvfL_eipYxEs7E",
//     authDomain: "moviemingle-eb87e.firebaseapp.com",
//     projectId: "moviemingle-eb87e",
//     storageBucket: "moviemingle-eb87e.appspot.com",
//     messagingSenderId: "685442556395",
//     appId: "1:685442556395:web:47515ff007b9fcda96f9ae",
//     measurementId: "G-ZYJQETBDRN"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// // Login form submission
// document.getElementById('login-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
// console.log("asdgcvasmhdvadfbsvdfb",email, password);
//     auth.signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Redirect to index.html after successful login
//             window.location.href = 'home.html';
//         })
//         .catch((error) => {
//             console.error('Error during login', error);
//         });
// });

// // Signup form submission
// document.getElementById('signup-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;

//     auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Redirect to index.html after successful signup
//             window.location.href = 'home.html';
//         })
//         .catch((error) => {
//             console.error('Error during signup', error);
//         });
// });

const firebaseConfig = {
    apiKey: "AIzaSyB5NYYPBXZKSSbQCkWSTIvfL_eipYxEs7E",
    authDomain: "moviemingle-eb87e.firebaseapp.com",
    projectId: "moviemingle-eb87e",
    storageBucket: "moviemingle-eb87e.appspot.com",
    messagingSenderId: "685442556395",
    appId: "1:685442556395:web:47515ff007b9fcda96f9ae",
    measurementId: "G-ZYJQETBDRN"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            document.getElementById('login-form').reset();
            document.getElementById('login-signup').style.display = 'none';
            // document.getElementById('home').style.display = 'block';
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("AsvzscvzScvzcv".createUserWithEmailAndPassword);
            // Signed up
            document.getElementById('signup-form').reset();
            document.getElementById('login-signup').style.display = 'none';
            // document.getElementById('home').style.display = 'block';
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});

document.getElementById('logout-btn').addEventListener('click', function() {
    auth.signOut()
        .then(() => {
            document.getElementById('home').style.display = 'none';
            document.getElementById('login-signup').style.display = 'block';
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error.message);
        });
});

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('login-signup').style.display = 'none';
        document.getElementById('home').style.display = 'block';
    } else {
        // No user is signed in
        document.getElementById('home').style.display = 'none';
        document.getElementById('login-signup').style.display = 'block';
    }
});
