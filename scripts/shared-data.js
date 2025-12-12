// Dados fixos para apresentação (GitHub Pages)
// Ajuste somente os números abaixo, se necessário.

const CERTA_TIPO_BREAKDOWN = {
  // Observação: "Serviços" foi informado como 68 (40 centros, 28 regiões).
  // Se você precisar usar 66, altere o total e ajuste o breakdown coerentemente.
  servicos:   { label: 'Serviços',      total: 68,  centros: 40,  regioes: 28,  color: '#c60c2f' }, // vermelho GovSC
  recursoTA:  { label: 'Recursos de TA', total: 222, centros: 205, regioes: 17,  color: '#f28c28' }, // laranja
  openDay:    { label: 'Open Day',      total: 46,  centros: 35,  regioes: 11,  color: '#005caa' }, // azul
};

function getCertaSummary() {
  const items = Object.values(CERTA_TIPO_BREAKDOWN);
  const total = items.reduce((s, d) => s + (d.total || 0), 0);
  const centros = items.reduce((s, d) => s + (d.centros || 0), 0);
  const regioes = items.reduce((s, d) => s + (d.regioes || 0), 0);
  const share = total > 0 ? (centros / total) : 0;
  return { items, total, centros, regioes, share };
}

// Helpers de formatação
function fmtInt(n){ return Number(n || 0).toLocaleString('pt-BR'); }
function fmtPct(x){ return (Math.round((x || 0) * 1000) / 10).toLocaleString('pt-BR') + '%'; }
