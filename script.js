fetch("standings.json")
    .then(response => response.json())
    .then(data => {
        const trackSelector = document.getElementById("trackSelector");
        const trackTable = document.querySelector("#trackTable tbody");
        const trackInfo = document.getElementById("trackInfo");
        const overallTable = document.querySelector("#overallTable tbody");

        let overallStandings = {};

        // Populate dropdown with track names
        data.races.forEach((race, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = race.track;
            trackSelector.appendChild(option);

            // Build overall standings
            race.standings.forEach(player => {
                if (!overallStandings[player.name]) {
                    overallStandings[player.name] = 0;
                }
                overallStandings[player.name] += player.points;
            });
        });

        // Function to display standings for a selected track
        function displayTrack(trackIndex) {
            const race = data.races[trackIndex];

            // Display track name
            trackInfo.textContent = `Track: ${race.track}`;

            // Clear and update standings table
            trackTable.innerHTML = "";
            race.standings.forEach((player, index) => {
                trackTable.innerHTML += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.points}</td></tr>`;
            });
        }

        // Function to display overall standings
        function displayOverallStandings() {
            // Convert object to sorted array
            let sortedStandings = Object.entries(overallStandings)
                .map(([name, points]) => ({ name, points }))
                .sort((a, b) => b.points - a.points);

            // Clear and update overall standings table
            overallTable.innerHTML = "";
            sortedStandings.forEach((player, index) => {
                overallTable.innerHTML += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.points}</td></tr>`;
            });
        }

        // Set default to first track
        displayTrack(0);
        displayOverallStandings();

        // Update standings when a track is selected
        trackSelector.addEventListener("change", (e) => displayTrack(e.target.value));
    })
    .catch(error => console.error("Error loading JSON:", error));

