require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase.from('memoria_temporaria_claude').select('*').limit(1);

  if (error) {
    console.log('Conexão OK, mas tabela ainda não existe neste projeto.');
    console.log('Erro:', error.message);
  } else {
    console.log('Conexão OK! Tabela encontrada.');
    console.log('Dados:', data);
  }
})();
