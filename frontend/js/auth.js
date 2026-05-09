console.log("AUTH JS LOADED");
const API = "http://localhost:5000/api/auth";


// REGISTER
const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit", async(e)=>{

        e.preventDefault();

        const username = document.getElementById("username").value;

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;


        const res = await fetch(`${API}/register`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                email,
                password
            })

        });

        const data = await res.json();

        alert(data.message);

        window.location.href = "login.html";

    });

}



// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", async(e)=>{

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;

        const password = document.getElementById("loginPassword").value;


        const res = await fetch(`${API}/login`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        alert(data.message);

        // Save token
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "dashboard.html";

    });

}