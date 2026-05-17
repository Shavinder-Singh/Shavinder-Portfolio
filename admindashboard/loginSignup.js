// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import {
    getAuth, signInWithEmailAndPassword, updateProfile,
    updateEmail,
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
//add by custom (me)
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBR5eqXgYeipFaJGBJBvE07X8uQUI12YWs",
    authDomain: "portfolio-shubh-834a8.firebaseapp.com",
    projectId: "portfolio-shubh-834a8",
    storageBucket: "portfolio-shubh-834a8.firebasestorage.app",
    messagingSenderId: "983739291306",
    appId: "1:983739291306:web:f34dafba9b7fa4c3e762d3",
    measurementId: "G-1WVDEQWDLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//add by custom (me)

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

// login
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;



        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {

                alert("Login Successful");

                window.location.href = "./admindashboard.html";

            })

            .catch((error) => {

                alert(error.message);

            });

    });

}






// Change Password
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const newEmail = document.getElementById("changeEmail").value;

    const newPassword = document.getElementById("changePassword").value;

    const user = auth.currentUser;

    if (!user) {

        alert("User not logged in");

        return;

    }

    try {

        /* ================= EMAIL UPDATE ================= */

        if (newEmail !== "") {

            await updateEmail(user, newEmail);

            console.log("Email Updated");

            alert("Email Updated");

        }

        /* ================= PASSWORD UPDATE ================= */

        if (newPassword !== "") {

            await updatePassword(user, newPassword);

            console.log("Password Updated");

            alert("Password Updated");

        }

    }

    catch (error) {

        console.log(error.message);

        alert(error.message);

    }

});