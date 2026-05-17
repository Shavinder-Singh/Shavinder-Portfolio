// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

//add by custom (me)
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";//
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";


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
//for images upload
// const storage = getStorage();


const addProjectForm = document.getElementById("addProjectForm");



addProjectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const Ptitle = document.getElementById("addProjectTitle").value;
    // image upload
    const fileInput = document.getElementById("imageInput");

    const Pdescription = document.getElementById("addProjectDescription").value;
    const Pdate = document.getElementById("addProjectDate").value;
    const Plink = document.getElementById("addProjectLink").value;
    const Pstatus = document.getElementById("addProjectStatus").value;


    // const PTags = document.getElementById("tagInput").value;
    

    if (editId) {

        await updateDoc(doc(db, "projects", editId), {
            title: Ptitle,
            images: storedImageURL,
            description: Pdescription,
            date: Pdate,
            link:Plink,
            status: Pstatus,
            tags: storedTags
        });
        alert("project updated");
        editID = null;
    }
    else {


        await addDoc(collection(db, "projects"), {
            title: Ptitle,
            images: storedImageURL,
            description: Pdescription,
            date: Pdate,
            link:Plink,
            status: Pstatus,
            tags: storedTags
        })
    }

    addProjectForm.reset();

});
// Adding images in project
// const inputFile = fileInput.files[0];
// alert("sa")

let fileItem;
let fileName;




// Images Upload Code for each projects
let fileText = document.getElementById("fileText");

var storedImageURL = [];

window.getFile = function (e) {

    const fileItem = e.target.files[0];

    const fileName = fileItem.name;

    if (storedImageURL.includes(fileName)) {

        alert("File already added");
        return;

    }

    storedImageURL.push(fileName);

    renderImage();
    console.log(storedImageURL);


}
function renderImage() {
    fileText.innerHTML = storedImageURL.map((item, index) => {
        return ` <div>
            <p>${item}</p>
            <button onclick="deleteImage(${index})">
                Delete
            </button>
        </div>`;

    }).join("");
}
window.deleteImage = function (index) {
    storedImageURL.splice(index, 1)
    console.log(storedImageURL);
    renderImage();
    console.log(storedImageURL);

}




//Tags Upload Code for each projects
let tagBox = document.getElementById("tagBox");
var storedTags = [];

window.handleTagsInput = function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        storedTags.push(e.target.value);
        e.target.value = "";
        renderTags();
    }
}
function renderTags() {
    tagBox.innerHTML = storedTags.map((item, index) => {
        return ` <div>
        <p>${item}</p>
        <button onclick="deleteTag(${index})">
            Delete
        </button>
    </div>`; join("");
    })
    console.log(storedTags);

}
window.deleteTag = function (index) {
    storedTags.splice(index, 1);
    renderTags();
}




// showing Projects in projects section admin dashboard

async function showProjects() {
    const projectsBody = document.getElementById("projects_body");

    const getFireProjects = await getDocs(collection(db, "projects"));
    console.log(getFireProjects);
    getFireProjects.forEach((item) => {
        const data = item.data();
        projectsBody.innerHTML += `

  <tr>

                                <td data-label="Project">
    ${data.title}
                                </td>

                                <td data-label="Technology">
            ${data.tags.map((item) => {
            return `<span> ${item}</span>`;
        }).join("")}
                                </td>

                                <td data-label="Status">
                                    Completed
                                </td>

                                <td data-label="Actions">

                                    <div class="btn-group">

                                        <button class="action-btn" onClick="editProject('${item.id}')">
                                            Edit
                                        </button>

                                       <button class="action-btn" onClick="deleteProject('${item.id}')">
 Delete 
</button> 

                                    </div>

                                </td>

                            </tr>
`;
    })
}

showProjects();



// delete Project
window.deleteProject = async function (id) {
    await deleteDoc(doc(db, "projects", id));
    alert("project deleted");
    renderImage();
    renderTags();
    showProjects();
};



// edit Project
// editing project ID
let editId = null;
console.log(editId);
window.editProject = async function (id) {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    const getdata = docSnap.data();
    document.getElementById("addProjectTitle").value = getdata.title;
    document.getElementById("addProjectDescription").value = getdata.description;
    document.getElementById("addProjectDate").value = getdata.date;
    storedImageURL = getdata.images || [];
    storedTags = getdata.tags || [];

    renderImage();
    renderTags();
    editId = id;
    // console.log(editId)

    popup.style.display = "flex";
};



// exporting data to other files
export const getProjects = await getDocs(collection(db, "projects"));