fetch("/api/players")
  .then(res => res.json())
  .then(players => {
    const list = document.getElementById("players");
    players.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ${p.role}`;
      list.appendChild(li);
    });
  });
