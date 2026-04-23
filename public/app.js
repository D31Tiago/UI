const modules = [
  { name: 'Basisdaten', status: 'abgeschlossen', ctas: ['Bearbeiten'] },
  { name: 'Belegtypen', status: 'in Bearbeitung', ctas: ['Konfigurieren', 'Bearbeiten'] },
  { name: 'Rechte', status: 'offen', ctas: ['Starten'] },
  { name: 'Module', status: 'gesperrt', ctas: ['Starten'] }
];

const statusClass = {
  offen: 'offen',
  'in Bearbeitung': 'in-bearbeitung',
  abgeschlossen: 'abgeschlossen',
  gesperrt: 'gesperrt'
};

const grid = document.getElementById('moduleGrid');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

const completed = modules.filter((m) => m.status === 'abgeschlossen').length;
const progressPercent = Math.round((completed / modules.length) * 100);

progressFill.style.width = `${progressPercent}%`;
progressText.textContent = `${completed} von ${modules.length} Modulen abgeschlossen (${progressPercent}%)`;

modules.forEach((module) => {
  const card = document.createElement('article');
  card.className = 'card';

  const ctas = module.ctas
    .map((label, idx) => {
      const disabled = module.status === 'gesperrt';
      const cls = idx === 0 ? 'primary' : '';
      return `<button class="${cls}" ${disabled ? 'disabled' : ''}>${label}</button>`;
    })
    .join('');

  card.innerHTML = `
    <span class="status ${statusClass[module.status]}">${module.status}</span>
    <h3>${module.name}</h3>
    <div class="cta-row">${ctas}</div>
  `;
  grid.appendChild(card);
});
