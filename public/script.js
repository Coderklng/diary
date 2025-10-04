const form = document.getElementById('entry-form');
const entriesDiv = document.getElementById('entries');
const moodChart = document.getElementById('mood-chart');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const mood = document.getElementById('mood').value;
  const entry = document.getElementById('entry').value;

  fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, mood, entry }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});

fetch('/api/entries')
  .then((res) => res.json())
  .then((entries) => {
    entries.forEach((entry) => {
      const entryHTML = `
        <p>Date: ${entry.date}</p>
        <p>Mood: ${entry.mood}</p>
        <p>Entry: ${entry.entry}</p>
      `;
      entriesDiv.innerHTML += entryHTML;
    });

    const moodData = {
      labels: entries.map((entry) => entry.date),
      datasets: [{
        label: 'Mood',
        data: entries.map((entry) => entry.mood === 'happy' ? 1 : entry.mood === 'sad' ? -1 : 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }],
    };

    const chart = new Chart(moodChart, {
      type: 'line',
      data: moodData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch((err) => console.error(err));