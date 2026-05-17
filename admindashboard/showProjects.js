import { getProjects } from "./CrudFirebaseProjects.js";

console.log(getProjects);

getProjects.forEach((item) => {

    console.log(item.data());

});

function showProjects() {
    const projectConatiner = document.getElementById("projects_dashboard_container");
    getProjects.forEach((item) => {
        const data = item.data();
        projectConatiner.innerHTML += `
        
                            <tr>

                                <td data-label="Title">
                                    ${data.title}
                                </td>

                                <td data-label="Category">
                                    ${data.tags.map((item)=>{
                                        return `<span> ${item}</span>`;
                                    })}
                                </td>

                                <td data-label="Date">
                                    ${data.date}
                                </td>

                                <td data-label="Actions">

                                    <div class="btn-group">

                                       

                                    </div>

                                </td>

                            </tr>
        `;
    });
}
showProjects();