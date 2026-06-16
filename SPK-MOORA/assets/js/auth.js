function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (

        username === APP_CONFIG.admin.username &&
        password === APP_CONFIG.admin.password

    ) {

        document.getElementById("loginPage")
            .style.display = "none";

        document.getElementById("app")
            .style.display = "flex";

        loadPage("dashboard");

    }

    else {

        alert(
            "Username atau Password Salah!"
        );

    }

}

function logout() {

    document.getElementById("app")
        .style.display = "none";

    document.getElementById("loginPage")
        .style.display = "block";

}