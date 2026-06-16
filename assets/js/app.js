window.onload = function () 
{
    initializeData();
    setActiveMenu("dashboard");
};

function loadPage(page)
{
    fetch("pages/" + page + ".html")
    .then(response => response.text())
    .then(data => {
        setActiveMenu(page);
        document.getElementById("pageContainer").innerHTML = data;
        document.getElementById("pageTitle").innerText = page.toUpperCase();
        switch(page)
        {
            case "dashboard":
                renderDashboard();
            break;

            case "karyawan":
                renderKaryawan();
            break;

            case "penilaian":
                renderPenilaian();
            break;

            case "kriteria":
                renderKriteria();
            break;

            case "ranking":
                renderRanking();
            break;
        }
    });
}

function setActiveMenu(page)
{
    document
        .querySelectorAll(".sidebar button")
        .forEach(btn => {btn.classList.remove("active-menu");});
    const activeBtn =
        document.getElementById("menu-" + page);
    if(activeBtn){activeBtn.classList.add("active-menu");}
}