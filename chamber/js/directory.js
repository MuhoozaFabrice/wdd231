const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        displayMembers(data);
    } catch (error) {
        membersContainer.innerHTML =
            "<p>Sorry, the member directory could not be loaded.</p>";

        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        let membershipLevel;

        if (member.membership === 3) {
            membershipLevel = "Gold Member";
        } else if (member.membership === 2) {
            membershipLevel = "Silver Member";
        } else {
            membershipLevel = "Member";
        }

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} business logo"
                loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>${member.description}</p>

            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer">
                Visit Website
            </a>

            <span class="membership">
                ${membershipLevel}
            </span>
        `;

        membersContainer.appendChild(card);
    });
}

/* GRID VIEW */

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");
});

/* LIST VIEW */

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");
});

/* MOBILE NAVIGATION */

menuButton.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

/* FOOTER YEAR */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

/* LAST MODIFIED */

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

/* LOAD MEMBERS */

getMembers();