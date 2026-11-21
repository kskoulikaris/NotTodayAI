const content = document.getElementById("content");

let excuseIndex = 0;
let selectedCategory = "";

const achievements = [
    "Master Procrastinator",
    "Certified Tomorrow-Starter",
    "Olympic Excuse Maker",
    "Director of Delay Operations",
    "Chief Executive of 'Later'",
    "Professional Time Waster",
    "Doctor of Doing Nothing",
    "The Sofa Whisperer"
];

const endings = [
    "Maybe next year.",
    "Future you is not impressed.",
    "The sofa wins again.",
    "Another resolution successfully avoided.",
    "Productivity remains undefeated.",
    "Nothing was accomplished, and that's okay.",
	"Your procrastination skills continue to improve.",
	"Congratulations on achieving absolutely nothing.",
	"The future has been successfully postponed.",
	"At least the excuses were excellent.",
	"The council has approved your procrastination licence."
];

function getMood(percentage) {

    if (percentage <= 17)
        return "😐 Still considering it";

    if (percentage <= 33)
        return "🤔 Having second thoughts";

    if (percentage <= 50)
        return "😴 Maybe tomorrow";

    if (percentage <= 67)
        return "🛋️ The sofa is winning";

    if (percentage <= 83)
        return "🍕 Fully distracted";

    return "💀 Beyond saving";
}

function showCategories() {

    let html = `
        <h2>Choose Your Excuse Category</h2>
        <div class="category-grid">
    `;

    for (let category in data) {

        html += `
            <div
                class="category-card"
                onclick="showResolutions('${category}')"
            >
                ${category}
            </div>
        `;
    }

    html += "</div>";

    content.innerHTML = html;
}

function showResolutions(category) {

    selectedCategory = category;

    let html = `<h2>${category}</h2>`;

    data[category].resolutions.forEach(resolution => {

        html += `
            <button onclick="startExcuses('${resolution}')">
                ${resolution}
            </button>
        `;
    });

    html += `
        <br><br>
        <button onclick="showCategories()">
            ⬅ Back
        </button>
    `;

    content.innerHTML = html;
}

function startExcuses(resolution) {

    excuseIndex = 0;

    showExcuse(resolution);
}

function showExcuse(resolution) {

    const excuses = data[selectedCategory].excuses;

    if (excuseIndex >= excuses.length) {

        const randomAchievement =
            achievements[
                Math.floor(Math.random() * achievements.length)
            ];

        const randomEnding =
            endings[
                Math.floor(Math.random() * endings.length)
            ];

        content.innerHTML = `
            <h2>💀 You've been 100% demotivated!</h2>

            <p>
                Resolution abandoned:
                <br>
                <strong>${resolution}</strong>
            </p>

            <p>
                Achievement unlocked:
                <br>
                <strong>${randomAchievement}</strong>
            </p>

            <p>
                ${randomEnding}
            </p>

            <button onclick="showCategories()">
                Start Again
            </button>
        `;

        return;
    }

    const percentage = Math.round(
        ((excuseIndex + 1) / excuses.length) * 100
    );

    content.innerHTML = `
        <h2>${resolution}</h2>

        <h3>
            Motivation Remaining:
            ${100 - percentage}%
        </h3>

        <p>
            ${getMood(percentage)}
        </p>

        <div class="meter-container">
            <div
                class="meter-fill"
                style="width:${percentage}%">
            </div>
        </div>

        <div class="excuse-box">
            ${excuses[excuseIndex]}
        </div>

        <button onclick="nextExcuse('${resolution}')">
            Give me another excuse
        </button>
    `;
}

function nextExcuse(resolution) {

    excuseIndex++;

    showExcuse(resolution);
}

showCategories();