const user = JSON.parse(localStorage.getItem("user"));


// Redirect if not logged in
if(!user){
    window.location.href = "login.html";
}


const container = document.getElementById("capsules");


// LOGOUT
function logout(){

    localStorage.clear();

    window.location.href = "login.html";

}



// CONFETTI EFFECT
function createConfetti(){

    for(let i=0;i<80;i++){

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        confetti.innerHTML =
            ["💖","✨","🌸","💌","💕"]
            [Math.floor(Math.random()*5)];

        document.body.appendChild(confetti);

        setTimeout(()=>{
            confetti.remove();
        },5000);

    }

}



// FETCH CAPSULES
async function loadCapsules(){

    const res = await fetch(
        `http://localhost:5000/api/capsules/${user.id}`
    );

    const capsules = await res.json();

    container.innerHTML = "";


    capsules.forEach(capsule => {

        const unlockDate =
            new Date(capsule.unlock_date);

        const now =
            new Date();

        const unlocked =
            now >= unlockDate;


        // CONFETTI
        if(unlocked){
            createConfetti();
        }


        // COUNTDOWN
        const diff =
            unlockDate - now;

        const days =
            Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours =
            Math.floor(
                (diff % (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const card =
        `
        <div class="card ${unlocked ? 'opened' : 'closed'}">

            <div class="envelope-wrapper">

                <div class="envelope">

                    <div class="letter">

                        <h2>${capsule.title}</h2>

                        <p>
                            Visibility:
                            ${capsule.visibility}
                        </p>

                        ${
                            unlocked
                            ?
                            `<p class="unlocked">
                                💖 Memory Unlocked
                            </p>`
                            :
                            `<p class="locked">
                                🔒 Locked Memory
                            </p>

                            <p>
                                Unlocks in:
                                ${days} days ${hours} hours
                            </p>`
                        }

                        ${
                            unlocked
                            ?
                            `<p class="memory-message">
                                ${capsule.message}
                            </p>`
                            :
                            `<p>
                                This love letter opens on
                                ${unlockDate.toLocaleString()}
                            </p>`
                        }

                        ${
                            unlocked && capsule.media
                            ?
                            capsule.media.endsWith(".mp4")
                            ?
                            `
                            <video controls>
                                <source
                                src="http://localhost:5000/uploads/${capsule.media}">
                            </video>
                            `
                            :
                            `
                            <img
                            src="http://localhost:5000/uploads/${capsule.media}">
                            `
                            :
                            ""
                        }

                    </div>

                    <div class="flap"></div>

                </div>

            </div>

        </div>
        `;

        container.innerHTML += card;

    });

}


loadCapsules();