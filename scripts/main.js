/* global Chart, CERTA_TIPO_BREAKDOWN, CERTA_OPENDAY_ROWS, CERTA_SERVICOS_ROWS, CERTA_RECURSOS_ROWS */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function darker(hex, factor = 0.82) {
  const h = String(hex || '').replace('#','').trim();
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const nr = Math.max(0, Math.floor(r*factor));
  const ng = Math.max(0, Math.floor(g*factor));
  const nb = Math.max(0, Math.floor(b*factor));
  return `rgb(${nr}, ${ng}, ${nb})`;
}

function buildKpis() {
  const total = (CERTA_TIPO_BREAKDOWN.servicos.total || 0)
    + (CERTA_TIPO_BREAKDOWN.recursoTA.total || 0)
    + (CERTA_TIPO_BREAKDOWN.openDay.total || 0);

  const centros = (CERTA_TIPO_BREAKDOWN.servicos.centros || 0)
    + (CERTA_TIPO_BREAKDOWN.recursoTA.centros || 0)
    + (CERTA_TIPO_BREAKDOWN.openDay.centros || 0);

  const regioes = (CERTA_TIPO_BREAKDOWN.servicos.regioes || 0)
    + (CERTA_TIPO_BREAKDOWN.recursoTA.regioes || 0)
    + (CERTA_TIPO_BREAKDOWN.openDay.regioes || 0);

  // Municípios: união de municípios encontrados nas listas (sem contar vazios)
  const muniSet = new Set();
  const addMunis = (rows) => rows.forEach(r => {
    const m = String(r.municipio || '').trim();
    if (m) muniSet.add(m);
  });
  addMunis(CERTA_OPENDAY_ROWS);
  addMunis(CERTA_SERVICOS_ROWS);
  addMunis(CERTA_RECURSOS_ROWS);

  setText('kpiTotal', total);
  setText('kpiCentros', centros);
  setText('kpiRegioes', regioes);
  setText('kpiMunicipios', muniSet.size);
}

function makeChart(ctx, cfg) {
  // eslint-disable-next-line no-new
  return new Chart(ctx, cfg);
}

function buildChartTipo() {
  const labels = [
    CERTA_TIPO_BREAKDOWN.servicos.label,
    CERTA_TIPO_BREAKDOWN.recursoTA.label,
    CERTA_TIPO_BREAKDOWN.openDay.label
  ];

  const centros = [
    CERTA_TIPO_BREAKDOWN.servicos.centros,
    CERTA_TIPO_BREAKDOWN.recursoTA.centros,
    CERTA_TIPO_BREAKDOWN.openDay.centros
  ];
  const regioes = [
    CERTA_TIPO_BREAKDOWN.servicos.regioes,
    CERTA_TIPO_BREAKDOWN.recursoTA.regioes,
    CERTA_TIPO_BREAKDOWN.openDay.regioes
  ];

  const colors = [
    CERTA_TIPO_BREAKDOWN.servicos.color,
    CERTA_TIPO_BREAKDOWN.recursoTA.color,
    CERTA_TIPO_BREAKDOWN.openDay.color
  ];

  const ctx = document.getElementById('chartTipo').getContext('2d');
  makeChart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Centros FCEE',
          data: centros,
          backgroundColor: colors,
          borderColor: colors.map(c => darker(c, 0.78)),
          borderWidth: 1,
          borderRadius: 8,
          stack: 'stack1'
        },
        {
          label: 'Diversas Regiões',
          data: regioes,
          backgroundColor: colors.map(c => darker(c, 0.58)),
          borderColor: colors.map(c => darker(c, 0.50)),
          borderWidth: 1,
          borderRadius: 8,
          stack: 'stack1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: 'rgba(255,255,255,.82)' } },
        tooltip: {
          callbacks: {
            footer: (items) => {
              const i = items?.[0]?.dataIndex ?? 0;
              const tot = (centros[i] || 0) + (regioes[i] || 0);
              return `Total: ${tot}`;
            }
          }
        }
      },
      scales: {
        x: { stacked: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } },
        y: { stacked: true, beginAtZero: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } }
      }
    }
  });
}

function buildChartGeral() {
  const centros = (CERTA_TIPO_BREAKDOWN.servicos.centros || 0)
    + (CERTA_TIPO_BREAKDOWN.recursoTA.centros || 0)
    + (CERTA_TIPO_BREAKDOWN.openDay.centros || 0);

  const regioes = (CERTA_TIPO_BREAKDOWN.servicos.regioes || 0)
    + (CERTA_TIPO_BREAKDOWN.recursoTA.regioes || 0)
    + (CERTA_TIPO_BREAKDOWN.openDay.regioes || 0);

  const ctx = document.getElementById('chartGeral').getContext('2d');
  makeChart(ctx, {
    type: 'bar',
    data: {
      labels: ['Consolidado'],
      datasets: [
        {
          label: 'Centros FCEE',
          data: [centros],
          backgroundColor: '#005caa',
          borderColor: darker('#005caa', 0.78),
          borderWidth: 1,
          borderRadius: 10,
          stack: 's'
        },
        {
          label: 'Diversas Regiões',
          data: [regioes],
          backgroundColor: darker('#005caa', 0.60),
          borderColor: darker('#005caa', 0.50),
          borderWidth: 1,
          borderRadius: 10,
          stack: 's'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: 'rgba(255,255,255,.82)' } } },
      scales: {
        x: { stacked: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } },
        y: { stacked: true, beginAtZero: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } }
      }
    }
  });
}

function aggregateByMunicipio() {
  const add = (map, municipio, delta) => {
    const key = String(municipio || '').trim();
    if (!key) return;
    map[key] = (map[key] || 0) + (delta || 0);
  };

  const map = {};
  // Para listas: conta 1 por linha (indicativo), mas respeita totais oficiais nos KPIs/gráfico principal.
  // Aqui é “volume de registros” apenas para ranking de municípios.
  CERTA_OPENDAY_ROWS.forEach(r => add(map, r.municipio, 1));
  CERTA_SERVICOS_ROWS.forEach(r => add(map, r.municipio, 1));
  CERTA_RECURSOS_ROWS.forEach(r => add(map, r.municipio, 1));
  return map;
}

function buildChartMunicipios() {
  const map = aggregateByMunicipio();
  const entries = Object.entries(map)
    .sort((a,b) => (b[1]||0) - (a[1]||0))
    .slice(0, 10);

  const labels = entries.map(e => e[0]);
  const values = entries.map(e => e[1]);

  const ctx = document.getElementById('chartMunicipios').getContext('2d');
  makeChart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Registros',
          data: values,
          backgroundColor: '#f28c28',
          borderColor: darker('#f28c28', 0.78),
          borderWidth: 1,
          borderRadius: 10
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: 'rgba(255,255,255,.82)' } } },
      scales: {
        x: { ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } },
        y: { beginAtZero: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } }
      }
    }
  });
}

function countOrigins(rows) {
  let nuclear = 0, extensivo = 0;
  rows.forEach(r => {
    const o = String(r.origem || '').toLowerCase();
    if (o.includes('nuclear')) nuclear += 1;
    else if (o.includes('extens')) extensivo += 1;
  });
  return { nuclear, extensivo };
}

function buildChartOrigem() {
  const op = countOrigins(CERTA_OPENDAY_ROWS);
  const sv = countOrigins(CERTA_SERVICOS_ROWS);
  const rc = countOrigins(CERTA_RECURSOS_ROWS);

  const labels = ['Open Day', 'Serviços', 'Recursos de TA'];
  const nuclear = [op.nuclear, sv.nuclear, rc.nuclear];
  const extensivo = [op.extensivo, sv.extensivo, rc.extensivo];

  const ctx = document.getElementById('chartOrigem').getContext('2d');
  makeChart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Nuclear (FCEE)',
          data: nuclear,
          backgroundColor: '#005caa',
          borderColor: darker('#005caa', 0.78),
          borderWidth: 1,
          borderRadius: 8,
          stack: 'st'
        },
        {
          label: 'Extensivo (Rede/Parceiros)',
          data: extensivo,
          backgroundColor: darker('#005caa', 0.60),
          borderColor: darker('#005caa', 0.50),
          borderWidth: 1,
          borderRadius: 8,
          stack: 'st'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: 'rgba(255,255,255,.82)' } } },
      scales: {
        x: { stacked: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } },
        y: { stacked: true, beginAtZero: true, ticks: { color: 'rgba(255,255,255,.78)' }, grid: { color: 'rgba(255,255,255,.06)' } }
      }
    }
  });
}

function buildTopInstituicoesTable() {
  const map = new Map();

  function addRow(tipo, row) {
    const inst = String(row.instituicao || row.instituicaoOrigem || row.instituicaoCentro || row.instituicaoSetor || row.instituicao || '').trim();
    if (!inst) return;
    const key = inst;
    const prev = map.get(key) || { total: 0, tipos: {} };
    prev.total += 1;
    prev.tipos[tipo] = (prev.tipos[tipo] || 0) + 1;
    map.set(key, prev);
  }

  CERTA_OPENDAY_ROWS.forEach(r => addRow('Open Day', { instituicao: r.instituicao }));
  CERTA_SERVICOS_ROWS.forEach(r => addRow('Serviços', { instituicao: r.instituicao }));
  CERTA_RECURSOS_ROWS.forEach(r => addRow('Recursos de TA', { instituicao: r.instituicao }));

  const entries = Array.from(map.entries())
    .sort((a,b) => (b[1].total||0) - (a[1].total||0))
    .slice(0, 12);

  const tbody = document.querySelector('#tblTopInstituicoes tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  for (const [inst, info] of entries) {
    const topTipo = Object.entries(info.tipos).sort((a,b) => (b[1]||0) - (a[1]||0))[0]?.[0] || '';
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = `<span class="pill">${escapeHtml(inst)}</span>`;

    const td2 = document.createElement('td');
    td2.className = 'num';
    td2.textContent = String(info.total);

    const td3 = document.createElement('td');
    td3.className = 'num';
    td3.textContent = topTipo;

    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    tbody.appendChild(tr);
  }
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function init() {
  buildKpis();
  buildChartTipo();
  buildChartGeral();
  buildChartMunicipios();
  buildChartOrigem();
  buildTopInstituicoesTable();
}

document.addEventListener('DOMContentLoaded', init);
