fetch("standings.json")
    .then(response => response.json())
    .then(data => {
        const trackSelector = document.getElementById("trackSelector");
        const trackTable = document.querySelector("#trackTable tbody");

        let trackCounts = {}; // Object to track duplicate tracks

        // Populate dropdown with track names
        data.races.forEach((race, index) => {
            let trackName = race.track;

            // If the track has appeared before, add a number
            if (trackCounts[trackName]) {
                trackCounts[trackName]++;
                trackName += ` (${trackCounts[trackName]})`;
            } else {
                trackCounts[trackName] = 1;
            }

            let option = document.createElement("option");
            option.value = index;
            option.textContent = trackName;
            trackSelector.appendChild(option);
        });

        // Function to display standings for a selected track
        function displayTrack(trackIndex) {
            const race = data.races[trackIndex];

            // Display track name
            document.getElementById("trackInfo").textContent = `Track: ${race.track}`;

            // Update standings table
            trackTable.innerHTML = "";
            race.standings.forEach((player, index) => {
                trackTable.innerHTML += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.points}</td></tr>`;
            });
        }

        // Set default to first track
        displayTrack(0);

        // Update standings on track selection
        trackSelector.addEventListener("change", (e) => displayTrack(e.target.value));
    });

