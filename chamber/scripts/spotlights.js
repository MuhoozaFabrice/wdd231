async function loadSpotlights() {
    const container = document.querySelector("#spotlights");
    if (!container) return;
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Could not load member data.");
        const members = await response.json();
        const eligible = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        const selected = [...eligible].sort(() => Math.random() - 0.5).slice(0, 3);

        container.innerHTML = selected.map(member => `
            <article class="spotlight-card">
                <img src="images/${member.image}" alt="${member.name} logo" width="120" height="70">
                <h3>${member.name}</h3>
                <p class="membership">${member.membershipLevel === 3 ? "Gold Member" : "Silver Member"}</p>
                <p>${member.address}</p>
                <p><a href="tel:${member.phone.replace(/\s/g,"")}">${member.phone}</a></p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit website</a></p>
            </article>`).join("");
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Member spotlights could not be loaded.</p>";
    }
}
loadSpotlights();