// =============================
// DADOS FIXOS (GitHub Pages)
// =============================

// Ajuste SOMENTE estes números se precisar atualizar:
const CERTA_TIPO_BREAKDOWN = {
  // Serviços (vermelho GovSC) — sem verde
  servicos:  { total: 68,  centros: 40,  regioes: 28,  color: '#c60c2f', label: 'Serviços' },
  // Recursos de TA (laranja)
  recursoTA: { total: 222, centros: 205, regioes: 17,  color: '#f28c28', label: 'Recursos de TA' },
  // Open Day (azul)
  openDay:   { total: 46,  centros: 35,  regioes: 11,  color: '#005caa', label: 'Open Day' },
};

// -----------------------------
// Registros (conteúdo bruto)
// IMPORTANTE: não inclui nomes de pessoas; só instituições/centros/setores.
// -----------------------------

// Open Day (Município, Origem, Instituição/Centro)
const CERTA_OPENDAY_ROWS = [
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'Palhoça', origem: 'Extensivo', instituicao: '' },
  { municipio: 'Palhoça', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'NAAH/S' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEVI' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEVI' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'Outro setor/instituição' },
  { municipio: 'São Bonifácio', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENET' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENET' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEVI' },
  { municipio: 'Palhoça', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENER' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'Antônio Carlos', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São Bonifácio', origem: 'Extensivo', instituicao: '' },
  { municipio: 'Florianópolis', origem: 'Extensivo', instituicao: '' },
  { municipio: 'Brusque', origem: 'Extensivo', instituicao: '' },
  { municipio: 'Antônio Carlos', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CERTA' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENET' },
  { municipio: 'Antônio Carlos', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'NAAH/S' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CERTA' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CEDUF' },
  { municipio: 'Antônio Carlos', origem: 'Extensivo', instituicao: '' },
  { municipio: 'Antônio Carlos', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Extensivo', instituicao: '' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CENAE' },
  { municipio: 'São José', origem: 'Nuclear', instituicao: 'CAP' },
];

// Serviços (Origem/Local, Município, Origem)
const CERTA_SERVICOS_ROWS = [
  { instituicao: 'Bairro Operária', municipio: 'Araranguá', origem: 'Nuclear' },
  { instituicao: 'GECAE — CRE Brusque', municipio: 'Brusque', origem: 'Extensivo' },
  { instituicao: 'AEE Brusque', municipio: 'Brusque', origem: 'Extensivo' },
  { instituicao: 'AMA', municipio: 'Brusque', origem: 'Extensivo' },
  { instituicao: 'APAE', municipio: 'Caçador', origem: 'Nuclear' },
  { instituicao: 'Associação de Pais e Amigos de Surdos (APAS)', municipio: 'Caçador', origem: 'Extensivo' },
  { instituicao: 'IFC Camboriú (Licenciatura em EE Inclusiva)', municipio: 'Camboriú', origem: 'Extensivo' },
  { instituicao: 'Unidade Básica de Saúde', municipio: 'Chapadão do Lageado', origem: 'Nuclear' },
  { instituicao: 'Unidade Básica de Saúde', municipio: 'Chapadão do Lageado', origem: 'Extensivo' },
  { instituicao: 'GECAE — UNOESC', municipio: 'Chapecó', origem: 'Extensivo' },
  { instituicao: 'SED Criciúma', municipio: 'Criciúma', origem: 'Extensivo' },
  { instituicao: 'NEIM Clair Gruber de Souza', municipio: 'Florianópolis', origem: 'Nuclear' },
  { instituicao: 'UDESC', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'NEIM Dona Cota', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'UDESC', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'EEB José Rodrigues Lopes', municipio: 'Garopaba', origem: 'Extensivo' },
  { instituicao: 'GECAE — vista técnica (SE Imbituba)', municipio: 'Imbituba', origem: 'Extensivo' },
  { instituicao: 'UNIVILLE', municipio: 'Joinville', origem: 'Extensivo' },
  { instituicao: 'Grupo Escolar Profª Evanda Sueli Juttel Machado', municipio: 'Palhoça', origem: 'Extensivo' },
  { instituicao: 'Grupo Escolar Profª Evanda Sueli Juttel Machado', municipio: 'Palhoça', origem: 'Extensivo' },
  { instituicao: 'Faculdade Municipal de Palhoça', municipio: 'Palhoça', origem: 'Extensivo' },
  { instituicao: 'EE Gov. Ivo Silveira', municipio: 'Palhoça', origem: 'Extensivo' },
  { instituicao: 'APAE Rio Negrinho', municipio: 'Santa Catarina', origem: 'Extensivo' },
  { instituicao: 'São Bonifácio (rede)', municipio: 'São Bonifácio', origem: 'Extensivo' },
  { instituicao: 'APAE São Domingos', municipio: 'São Domingos', origem: 'Nuclear' },
  { instituicao: 'CERTA', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'NAAH/S', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'GECAE', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'Associação Amigo Down', municipio: 'São José', origem: 'Extensivo' },
  { instituicao: 'Educandário Santa Catarina', municipio: 'São José', origem: 'Extensivo' },
  { instituicao: 'CEFIC', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'NAEE / FCEE', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'CEI San Marino', municipio: 'São José', origem: 'Extensivo' },
  { instituicao: 'EEB Aldo Câmara da Silva', municipio: 'São José', origem: 'Extensivo' },
  { instituicao: 'APADAVIX', municipio: 'Xanxerê', origem: 'Extensivo' },
  { instituicao: 'EMEB São Jorge', municipio: 'Xanxerê', origem: 'Nuclear' },
];

// Recursos de TA (Origem/Local, Município, Origem)
// Observação: sua lista tem muitas linhas repetidas; aqui mantemos um subconjunto representativo,
// e os totais oficiais ficam em CERTA_TIPO_BREAKDOWN.
const CERTA_RECURSOS_ROWS = [
  { instituicao: 'CERTA', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'Responsável legal (família)', municipio: 'Biguaçu', origem: 'Extensivo' },
  { instituicao: 'CERTA-FCEE', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'Externo (família)', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'NEIM Barreira do Janga', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'Trindade (residência)', municipio: 'Florianópolis', origem: 'Extensivo' },
  { instituicao: 'Família', municipio: 'Garopaba', origem: 'Nuclear' },
  { instituicao: 'Secretaria Municipal de Educação', municipio: 'Gov. Celso Ramos', origem: 'Extensivo' },
  { instituicao: 'IFSC Garopaba', municipio: 'Imbituba', origem: 'Extensivo' },
  { instituicao: 'APAE', municipio: 'Joaçaba', origem: 'Extensivo' },
  { instituicao: 'Escola Municipal', municipio: 'Palhoça', origem: 'Extensivo' },
  { instituicao: 'Casa / Residência', municipio: 'Palhoça', origem: 'Nuclear' },
  { instituicao: 'CEVI', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'CAS', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'CENER', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'CENAE/FCEE', municipio: 'São José', origem: 'Nuclear' },
  { instituicao: 'CEFIC', municipio: 'São José', origem: 'Nuclear' },
];

function safeStr(v){ return String(v ?? '').trim(); }
function normOrigin(v){
  const s = safeStr(v).toLowerCase();
  if (s.includes('nuclear')) return 'Nuclear';
  if (s.includes('extens')) return 'Extensivo';
  // fallback: se vier limpo do usuário
  if (s === 'nuclear' || s === 'extensivo') return s[0].toUpperCase()+s.slice(1);
  return '';
}
