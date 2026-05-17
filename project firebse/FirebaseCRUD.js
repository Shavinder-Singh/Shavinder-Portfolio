// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
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



const form = document.getElementById("projectForm");

const projectsDiv = document.getElementById("projects");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    await addDoc(collection(db, "projects"), {
        title,
        image,
        description
    })
    form.reset();
    showProjects();
})

// Show Projects
async function showProjects() {

    projectsDiv.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "projects"));

    querySnapshot.forEach((item) => {

        const data = item.data();

        projectsDiv.innerHTML += `

      <div class="card">

        <img src="${data.image}" />

        <div class="card-content">

          <h2>${data.title}</h2>

          <p>${data.description}</p>

          <button onclick="deleteProject('${item.id}')">
            Delete
          </button>

          <button onclick="editProject(
            '${item.id}',
            '${data.title}',
            '${data.image}',
            '${data.description}'
          )">
            Edit
          </button>

        </div>

      </div>

    `;
    });
}



window.deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id))
    showProjects();
}

window.editProject = async (id, oldtitle, oldimage, olddescription) => {
    const title = prompt("New Title", oldtitle);

    const image = prompt("New Image", oldimage);

    const description = prompt("New Description", olddescription);
    await updateDoc(doc(db, "projects", id), {
        title,
        image,
        description
    })
    showProjects();

}
showProjects();

