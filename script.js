// 🎵 Handle form submission
document.getElementById("song-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const songs = [
    document.getElementById("song1").value.trim(),
    document.getElementById("song2").value.trim(),
    document.getElementById("song3").value.trim(),
    document.getElementById("song4").value.trim(),
    document.getElementById("song5").value.trim()
  ].filter(song => song.length > 0);

  const recommendations = await generateRecommendations(songs);
  displayRecommendations(recommendations);
});

// 🔗 Connect to your Wolfram API
async function generateRecommendations(userSongs) {
  const apiUrl = "https://www.wolframcloud.com/obj/megcmor/Published/music-recommender";
  const query = userSongs.map(song => "songs=" + encodeURIComponent(song)).join("&");

  try {
    const response = await fetch(`${apiUrl}?${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Wolfram API:", error);
    return ["(Sorry, we couldn't fetch recommendations right now.)"];
  }
}

// 🧠 GenderMag toggle
document.getElementById("info-btn").addEventListener("click", function () {
  const infoBox = document.getElementById("info-box");
  infoBox.classList.toggle("hidden");
});

// 🎯 Render recommendations
function displayRecommendations(list) {
  const resultsBox = document.getElementById("results");
  const ul = document.getElementById("recommendation-list");
  ul.innerHTML = "";

  list.forEach(song => {
    const li = document.createElement("li");
    li.textContent = song;
    ul.appendChild(li);
  });

  resultsBox.classList.remove("hidden");
}
