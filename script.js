fetch("standings.json")
    .then(response => response.json())
    .then(data => {
        const trackSelector = document.getElementById("trackSelector");
        const trackTable = document.querySelector("#trackTable tbody");
        const trackInfo = document.getElementById("trackInfo");

        // Populate dropdown with track names (including duplicates)
        data.races.forEach((race, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = race.track;  // No numbering, just track name
            trackSelector.appendChild(option);
        });

        // Function to display standings for a selected track
        function displayTrack(trackIndex) {
            const race = data.races[trackIndex];

            // Display track name
            trackInfo.textContent = `Track: ${race.track}`;

            // Clear table and update standings
            trackTable.innerHTML = "";
            race.standings.forEach((player, index) => {
                trackTable.innerHTML += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.points}</td></tr>`;
            });
        }

        // Set default to first track
        displayTrack(0);

        // Update standings when a track is selected
        trackSelector.addEventListener("change", (e) => displayTrack(e.target.value));
    })
    .catch(error => console.error("Error loading JSON:", error));


