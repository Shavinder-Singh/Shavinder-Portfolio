const mainDate = document.getElementById("mainDate");
const mainMonth = document.getElementById("mainMonth");


function TodayDate() {
    const date = new Date();
    const todayDate = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    // console.log(todayDate);
    mainDate.innerText = todayDate;
    mainMonth.innerText = month;
}

TodayDate();


let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    window.location.href = `./loginpage.html`;
})