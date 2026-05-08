const form = document.getElementById("capsuleForm");


console.log("Create JS Loaded");


form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    console.log("Form Submitted");


    const user =
        JSON.parse(localStorage.getItem("user"));

    console.log(user);


    const formData = new FormData();

    formData.append(
        "user_id",
        user.id
    );

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "message",
        document.getElementById("message").value
    );

    formData.append(
        "unlock_date",
        document.getElementById("unlock_date").value
    );

    formData.append(
        "visibility",
        document.getElementById("visibility").value
    );



    // FILE CHECK
    const mediaFile =
        document.getElementById("media").files[0];

    if(mediaFile){
        formData.append("media", mediaFile);
    }



    try{

        const res = await fetch(
            "http://localhost:5000/api/capsules/create",
            {
                method:"POST",
                body:formData
            }
        );

        const data = await res.json();

        console.log(data);

        alert(data.message);

        window.location.href = "dashboard.html";

    }
    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

});