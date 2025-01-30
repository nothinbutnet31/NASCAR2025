fetch("standings.json")
    .then(response => response.json())
    .then(data => {
        const weekSelector = document.getElementById("weekSelector");
        const weeklyTable = document.querySelector("#weeklyTable tbody");
        const overallTable = document.querySelector("#overallTable tbody");

        let overallPoints = {};

        // Populate dropdown with weeks
        data.weeks.forEach(week => {
            let option = document.createElement("option");
            option.value = week.week;
            option.textContent = `Week ${week.week}`;
            weekSelector.appendChild(option);

            week.standings.forEach(player => {
                overallPoints[player.name] = (overallPoints[player.name] || 0) + player.points;
            });
        });

        // Function to display weekly standings
        function displayWeek(weekNumber) {
            const week = data.weeks.find(w => w.week == weekNumber);
            weeklyTable.innerHTML = "";
            week.standings.forEach((player, index) => {
                weeklyTable.innerHTML += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.points}</td></tr>`;
            });
        }

        // Display overall standings
        let sortedOverall = Object.entries(overallPoints).sort((a, b) => b[1] - a[1]);
        sortedOverall.forEach(([name, points], index) => {
            overallTable.innerHTML += `<tr><td>${index + 1}</td><td>${name}</td><td>${points}</td></tr>`;
        });

        // Update standings on week selection
        weekSelector.addEventListener("change", (e) => displayWeek(e.target.value));

        // Default to first week
        displayWeek(data.weeks[0].week);
    });
