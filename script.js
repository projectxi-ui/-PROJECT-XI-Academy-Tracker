```javascript
/* =========================================
   ACADEMY PLAYER TRACKER
   script.js
========================================= */


/* =========================================
   PLAYER DATA
========================================= */

let player = JSON.parse(
    localStorage.getItem("academyPlayer")
) || {
    name: "Player",
    position: "Winger",
    number: 7
};


/* =========================================
   MATCH DATA
========================================= */

let matches = JSON.parse(
    localStorage.getItem("academyMatches")
) || [];


/* =========================================
   TRAINING DATA
========================================= */

let training = JSON.parse(
    localStorage.getItem("academyTraining")
) || {};


const trainingItems = [
    {
        name: "Ball Control",
        type: "Technical"
    },
    {
        name: "Passing",
        type: "Technical"
    },
    {
        name: "Shooting",
        type: "Technical"
    },
    {
        name: "Dribbling",
        type: "Technical"
    },
    {
        name: "Speed & Agility",
        type: "Physical"
    },
    {
        name: "Strength",
        type: "Physical"
    },
    {
        name: "Fitness",
        type: "Physical"
    },
    {
        name: "Recovery",
        type: "Recovery"
    }
];


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(page) {

    document.querySelectorAll(".page").forEach(function(element) {
        element.classList.remove("active");
    });


    const target = document.getElementById(page);

    if (target) {
        target.classList.add("active");
    }


    document.querySelectorAll(
        ".nav-item, .mobile-nav button"
    ).forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.page === page) {
            button.classList.add("active");
        }

    });


    updateAll();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   PROFILE
========================================= */

function updateProfile() {

    const name = player.name || "Player";


    document.getElementById(
        "headerName"
    ).textContent = name;


    document.getElementById(
        "welcomeName"
    ).textContent = name;


    document.getElementById(
        "avatar"
    ).textContent =
        name.charAt(0).toUpperCase();
}


/* =========================================
   OPEN PROFILE
========================================= */

function openProfile() {

    document.getElementById(
        "playerNameInput"
    ).value = player.name;


    document.getElementById(
        "playerPosition"
    ).value = player.position;


    document.getElementById(
        "playerNumber"
    ).value = player.number;


    document.getElementById(
        "profileModal"
    ).classList.add("show");
}


/* =========================================
   CLOSE PROFILE
========================================= */

function closeProfile() {

    document.getElementById(
        "profileModal"
    ).classList.remove("show");
}


/* =========================================
   SAVE PROFILE
========================================= */

document.getElementById(
    "profileForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        player.name =
            document.getElementById(
                "playerNameInput"
            ).value.trim() || "Player";


        player.position =
            document.getElementById(
                "playerPosition"
            ).value;


        player.number =
            Number(
                document.getElementById(
                    "playerNumber"
                ).value
            ) || 7;


        localStorage.setItem(
            "academyPlayer",
            JSON.stringify(player)
        );


        updateProfile();

        closeProfile();

        updateAll();
    }
);


/* =========================================
   MATCH MODAL
========================================= */

function openMatchModal() {

    document.getElementById(
        "matchDate"
    ).value =
        new Date()
            .toISOString()
            .split("T")[0];


    document.getElementById(
        "matchModal"
    ).classList.add("show");
}


function closeMatchModal() {

    document.getElementById(
        "matchModal"
    ).classList.remove("show");
}


/* =========================================
   SAVE MATCH
========================================= */

document.getElementById(
    "matchForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const teamScore =
            Number(
                document.getElementById(
                    "teamScore"
                ).value
            );


        const opponentScore =
            Number(
                document.getElementById(
                    "opponentScore"
                ).value
            );


        let result = "D";


        if (teamScore > opponentScore) {
            result = "W";
        }


        if (teamScore < opponentScore) {
            result = "L";
        }


        const match = {

            id: Date.now(),

            date:
                document.getElementById(
                    "matchDate"
                ).value,

            opponent:
                document.getElementById(
                    "opponent"
                ).value,

            teamScore:
                teamScore,

            opponentScore:
                opponentScore,

            result:
                result,

            minutes:
                Number(
                    document.getElementById(
                        "minutes"
                    ).value
                ),

            goals:
                Number(
                    document.getElementById(
                        "goals"
                    ).value
                ),

            assists:
                Number(
                    document.getElementById(
                        "assists"
                    ).value
                ),

            rating:
                Number(
                    document.getElementById(
                        "rating"
                    ).value
                ),

            position:
                document.getElementById(
                    "position"
                ).value,

            notes:
                document.getElementById(
                    "notes"
                ).value

        };


        matches.unshift(match);


        localStorage.setItem(
            "academyMatches",
            JSON.stringify(matches)
        );


        document.getElementById(
            "matchForm"
        ).reset();


        closeMatchModal();


        updateAll();


        showPage("matches");
    }
);


/* =========================================
   RESULT CLASS
========================================= */

function resultClass(result) {

    if (result === "W") {
        return "win";
    }


    if (result === "L") {
        return "loss";
    }


    return "draw";
}


/* =========================================
   RESULT TEXT
========================================= */

function resultText(result) {

    if (result === "W") {
        return "WIN";
    }


    if (result === "L") {
        return "LOSS";
    }


    return "DRAW";
}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date) {

    if (!date) {
        return "";
    }


    const d =
        new Date(date + "T00:00:00");


    return d.toLocaleDateString(
        undefined,
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================
   RENDER MATCH TABLE
========================================= */

function renderMatches() {

    const table =
        document.getElementById(
            "matchTable"
        );


    if (matches.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    No matches recorded yet.<br><br>
                    Click <strong>+ Add Match</strong>
                    to record your first game.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML =
        matches.map(function(match) {

            return `

                <tr>

                    <td>
                        ${formatDate(match.date)}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                match.opponent
                            )}
                        </strong>
                    </td>

                    <td>

                        <span class="result
                            ${resultClass(match.result)}">

                            ${resultText(match.result)}

                        </span>

                        &nbsp;

                        ${match.teamScore}
                        -
                        ${match.opponentScore}

                    </td>

                    <td>
                        ${match.minutes}'
                    </td>

                    <td>
                        ⚽ ${match.goals}
                    </td>

                    <td>
                        🅰️ ${match.assists}
                    </td>

                    <td>
                        <strong>
                            ${Number(match.rating).toFixed(1)}
                        </strong>
                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================
   DASHBOARD MATCHES
========================================= */

function renderDashboardMatches() {

    const box =
        document.getElementById(
            "dashboardMatches"
        );


    if (matches.length === 0) {

        box.innerHTML = `
            <div class="empty">
                No matches yet.
            </div>
        `;

        return;
    }


    box.innerHTML =
        matches.slice(0, 3)
        .map(function(match) {

            return `

                <div class="match-card">

                    <div class="match-top">

                        <span>
                            ${formatDate(match.date)}
                        </span>

                        <span class="result
                            ${resultClass(match.result)}">

                            ${resultText(match.result)}

                        </span>

                    </div>


                    <div class="match-teams">

                        <div class="team">

                            <div class="team-badge">
                                🛡️
                            </div>

                            <strong>
                                MY TEAM
                            </strong>

                        </div>


                        <div class="score">

                            ${match.teamScore}
                            -
                            ${match.opponentScore}

                        </div>


                        <div class="team">

                            <div class="team-badge">
                                ⚽
                            </div>

                            <strong>
                                ${escapeHTML(
                                    match.opponent
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            `;

        }).join("");
}


/* =========================================
   CALCULATE STATS
========================================= */

function calculateStats() {

    const totalMatches =
        matches.length;


    const goals =
        matches.reduce(
            function(total, match) {
                return total + match.goals;
            },
            0
        );


    const assists =
        matches.reduce(
            function(total, match) {
                return total + match.assists;
            },
            0
        );


    const minutes =
        matches.reduce(
            function(total, match) {
                return total + match.minutes;
            },
            0
        );


    const wins =
        matches.filter(
            function(match) {
                return match.result === "W";
            }
        ).length;


    const draws =
        matches.filter(
            function(match) {
                return match.result === "D";
            }
        ).length;


    const losses =
        matches.filter(
            function(match) {
                return match.result === "L";
            }
        ).length;


    let rating = 0;


    if (matches.length > 0) {

        rating =
            matches.reduce(
                function(total, match) {
                    return total + match.rating;
                },
                0
            ) / matches.length;
    }


    return {

        totalMatches,
        goals,
        assists,
        minutes,
        wins,
        draws,
        losses,
        rating

    };
}


/* =========================================
   RENDER STATS
========================================= */

function renderStats() {

    const stats =
        calculateStats();


    document.getElementById(
        "dashMatches"
    ).textContent =
        stats.totalMatches;


    document.getElementById(
        "dashGoals"
    ).textContent =
        stats.goals;


    document.getElementById(
        "dashAssists"
    ).textContent =
        stats.assists;


    document.getElementById(
        "dashMinutes"
    ).textContent =
        stats.minutes;


    document.getElementById(
        "statMatches"
    ).textContent =
        stats.totalMatches;


    document.getElementById(
        "statGoals"
    ).textContent =
        stats.goals;


    document.getElementById(
        "statAssists"
    ).textContent =
        stats.assists;


    document.getElementById(
        "statMinutes"
    ).textContent =
        stats.minutes;


    document.getElementById(
        "statWins"
    ).textContent =
        stats.wins;


    document.getElementById(
        "statDraws"
    ).textContent =
        stats.draws;


    document.getElementById(
        "statLosses"
    ).textContent =
        stats.losses;


    document.getElementById(
        "statRating"
    ).textContent =
        stats.rating.toFixed(1);
}


/* =========================================
   TODAY KEY
========================================= */

function getTodayKey() {

    return new Date()
        .toISOString()
        .split("T")[0];
}


/* =========================================
   RENDER TRAINING
========================================= */

function renderTraining() {

    const today =
        getTodayKey();


    if (!training[today]) {
        training[today] = {};
    }


    const list =
        document.getElementById(
            "trainingList"
        );


    list.innerHTML =
        trainingItems
        .map(function(item, index) {

            const done =
                training[today][index] === true;


            return `

                <div class="training-item">

                    <div class="training-left">

                        <div
                            class="check ${done ? "done" : ""}"
                            onclick="toggleTraining(${index})"
                        >

                            ${done ? "✓" : ""}

                        </div>


                        <div>

                            <div class="training-name">
                                ${item.name}
                            </div>

                            <div class="training-type">
                                ${item.type}
                            </div>

                        </div>

                    </div>


                    <span>
                        ${done ? "Completed" : "Pending"}
                    </span>

                </div>

            `;

        }).join("");


    document.getElementById(
        "trainingDate"
    ).textContent =
        formatDate(today);


    renderDashboardTraining();
}


/* =========================================
   DASHBOARD TRAINING
========================================= */

function renderDashboardTraining() {

    const today =
        getTodayKey();


    const todayData =
        training[today] || {};


    const completed =
        trainingItems.filter(
            function(_, index) {
                return todayData[index] === true;
            }
        ).length;


    const percentage =
        (completed / trainingItems.length) * 100;


    document.getElementById(
        "dashboardTraining"
    ).innerHTML = `

        <div class="progress-box">

            <div class="progress-label">

                <span>
                    Today's session
                </span>

                <strong>
                    ${completed}/${trainingItems.length}
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percentage}%"
                ></div>

            </div>

        </div>


        <p style="
            color:var(--muted);
            font-size:13px;
        ">

            ${
                completed === trainingItems.length

                ? "🔥 Training complete! Great work."

                : "Keep going. Complete today's session."
            }

        </p>

    `;
}


/* =========================================
   TOGGLE TRAINING
========================================= */

function toggleTraining(index) {

    const today =
        getTodayKey();


    if (!training[today]) {
        training[today] = {};
    }


    training[today][index] =
        !training[today][index];


    localStorage.setItem(
        "academyTraining",
        JSON.stringify(training)
    );


    updateAll();
}


/* =========================================
   RESET TRAINING
========================================= */

function resetTraining() {

    const today =
        getTodayKey();


    training[today] = {};


    localStorage.setItem(
        "academyTraining",
        JSON.stringify(training)
    );


    updateAll();
}


/* =========================================
   PROGRESS
========================================= */

function renderProgress() {

    const stats =
        calculateStats();


    setProgress(
        "matchesProgress",
        "matchesProgressText",
        stats.totalMatches,
        20
    );


    setProgress(
        "goalsProgress",
        "goalsProgressText",
        stats.goals,
        10
    );


    setProgress(
        "assistsProgress",
        "assistsProgressText",
        stats.assists,
        10
    );


    const totalDays =
        Object.keys(training).length;


    const completedDays =
        Object.values(training)
        .filter(function(day) {

            return trainingItems.every(
                function(_, index) {
                    return day[index] === true;
                }
            );

        }).length;


    let consistency = 0;


    if (totalDays > 0) {

        consistency =
            Math.round(
                (completedDays / totalDays) * 100
            );

    }


    document.getElementById(
        "trainingProgress"
    ).style.width =
        Math.min(
            consistency,
            100
        ) + "%";


    document.getElementById(
        "trainingProgressText"
    ).textContent =
        consistency + "%";
}


/* =========================================
   SET PROGRESS BAR
========================================= */

function setProgress(
    barId,
    textId,
    value,
    target
) {

    const percent =
        Math.min(
            (value / target) * 100,
            100
        );


    document.getElementById(
        barId
    ).style.width =
        percent + "%";


    document.getElementById(
        textId
    ).textContent =
        value + " / " + target;
}


/* =========================================
   ACHIEVEMENTS
========================================= */

function renderAchievements() {

    const stats =
        calculateStats();


    const achievements = [

        {
            icon: "👟",
            title: "First Match",
            description:
                "Play your first recorded match.",
            unlocked:
                stats.totalMatches >= 1
        },


        {
            icon: "⚽",
            title: "First Goal",
            description:
                "Score your first goal.",
            unlocked:
                stats.goals >= 1
        },


        {
            icon: "🅰️",
            title: "First Assist",
            description:
                "Record your first assist.",
            unlocked:
                stats.assists >= 1
        },


        {
            icon: "🎮",
            title: "10 Matches",
            description:
                "Reach 10 appearances.",
            unlocked:
                stats.totalMatches >= 10
        },


        {
            icon: "🔥",
            title: "10 Goals",
            description:
                "Score 10 goals.",
            unlocked:
                stats.goals >= 10
        },


        {
            icon: "🏆",
            title: "5 Wins",
            description:
                "Win five matches.",
            unlocked:
                stats.wins >= 5
        },


        {
            icon: "💯",
            title: "100 Minutes",
            description:
                "Play 100 minutes.",
            unlocked:
                stats.minutes >= 100
        },


        {
            icon: "⭐",
            title: "8+ Rating",
            description:
                "Record an average rating of 8.0+.",
            unlocked:
                stats.rating >= 8 &&
                stats.totalMatches > 0
        },


        {
            icon: "🏋️",
            title: "Training Day",
            description:
                "Complete an entire training session.",
            unlocked:
                Object.values(training).some(
                    function(day) {

                        return trainingItems.every(
                            function(_, index) {
                                return day[index] === true;
                            }
                        );

                    }
                )
        }

    ];


    document.getElementById(
        "achievementList"
    ).innerHTML =

        achievements
        .map(function(achievement) {

            return `

                <div class="achievement
                    ${achievement.unlocked ? "" : "locked"}">

                    <div class="achievement-icon">
                        ${achievement.icon}
                    </div>


                    <h3>

                        ${
                            achievement.unlocked
                            ? "✓ "
                            : ""
                        }

                        ${achievement.title}

                    </h3>


                    <p>
                        ${achievement.description}
                    </p>

                </div>

            `;

        }).join("");
}


/* =========================================
   UPDATE EVERYTHING
========================================= */

function updateAll() {

    updateProfile();

    renderMatches();

    renderDashboardMatches();

    renderStats();

    renderTraining();

    renderProgress();

    renderAchievements();
}


/* =========================================
   START APP
========================================= */

updateAll();
```
