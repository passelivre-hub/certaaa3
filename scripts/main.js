/* global Chart, CERTA_TIPO_BREAKDOWN, getCertaSummary, fmtInt, fmtPct */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function darker(hex, factor = 0.82) {
  const h = String(hex || '').replace('#','').trim();
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const rr = Math.max(0, Math.min(255, Math.round(r * factor)));
  const gg = Math.max(0, Math.min(255, Math.round(g * factor)));
  const bb = Math.max(0, Math.min(255, Math.round(b * factor)));
  return '#' + [rr,gg,bb].map(v => v.toString(16).padStart(2,'0')).join('');
}

function lighter(hex, mix = 0.55) {
  const h = String(hex || '').replace('#','').trim();
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const rr = Math.round(r + (255 - r) * mix);
  const gg = Math.round(g + (255 - g) * mix);
  const bb = Math.round(b + (255 - b) * mix);
  return '#' + [rr,gg,bb].map(v => v.toString(16).padStart(2,'0')).join('');
}

function buildCharts() {
  const { items, total, centros, regioes, share } = getCertaSummary();

  setText('kpi-total', fmtInt(total));
  setText('kpi-centros', fmtInt(centros));
  setText('kpi-regioes', fmtInt(regioes));
  setText('kpi-share', fmtPct(share));

  // Destaques (sem citar nomes de pessoas)
  const byType = [...items].sort((a,b) => (b.total||0) - (a.total||0));
  const top = byType[0];
  const topShare = top.total ? (top.centros/top.total) : 0;

  setText('callout-1', `${top.label} lidera o volume: ${fmtInt(top.total)} registros.`);
  setText('callout-2', `Concentração nos Centros FCEE: ${fmtPct(share)} do total (${fmtInt(centros)} de ${fmtInt(total)}).`);
  setText('callout-3', `${top.label}: ${fmtPct(topShare)} das ações nos Centros FCEE (${fmtInt(top.centros)}).`);

  const labels = items.map(d => d.label);
  const centrosVals = items.map(d => d.centros);
  const regioesVals = items.map(d => d.regioes);
  const totalsVals = items.map(d => d.total);

  const centrosColors = items.map(d => darker(d.color, 0.78));
  const regioesColors = items.map(d => lighter(d.color, 0.55));
  const totalColors = items.map(d => d.color);

  // 1) Stacked por tipo (Centros vs Regiões)
  new Chart(document.getElementById('tipoStackChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Centros FCEE', data: centrosVals, backgroundColor: centrosColors, borderRadius: 8 },
        { label: 'Diversas regiões', data: regioesVals, backgroundColor: regioesColors, borderRadius: 8 },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${fmtInt(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });

  // 2) Totais por tipo
  new Chart(document.getElementById('tipoTotalChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Total', data: totalsVals, backgroundColor: totalColors, borderRadius: 10 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });

  // 3) Percentual nos Centros por tipo
  const pctVals = items.map(d => d.total ? Math.round((d.centros / d.total) * 1000) / 10 : 0);
  new Chart(document.getElementById('percentChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: '% Centros FCEE', data: pctVals, backgroundColor: totalColors, borderRadius: 10 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y.toLocaleString('pt-BR')}%` } }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (v) => `${v}%` }
        }
      }
    }
  });

  // 4) Donut Centros vs Regiões
  new Chart(document.getElementById('origemDonut'), {
    type: 'doughnut',
    data: {
      labels: ['Centros FCEE', 'Diversas regiões'],
      datasets: [{
        data: [centros, regioes],
        backgroundColor: [darker('#005caa', 0.85), lighter('#005caa', 0.55)],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${fmtInt(ctx.parsed)}`
          }
        }
      },
      cutout: '62%'
    }
  });
}

document.addEventListener('DOMContentLoaded', buildCharts);
