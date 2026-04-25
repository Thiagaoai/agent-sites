-- Memória persistente do Agente Dev
-- Schema: agente_dev (per CLAUDE.md memory protocol)
-- Projeto Supabase: xhdcsryudsvzzyfhuabv (agente-sites @ DockplusAI)

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS agente_dev;

CREATE TABLE IF NOT EXISTS agente_dev.clientes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          TEXT NOT NULL UNIQUE,
  setor         TEXT,
  contatos      JSONB,
  notas         TEXT,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agente_dev.projetos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id    UUID REFERENCES agente_dev.clientes(id) ON DELETE SET NULL,
  nome          TEXT NOT NULL,
  tipo          TEXT NOT NULL,
  stack         JSONB,
  brand_kit     JSONB,
  repo_url      TEXT,
  deploy_url    TEXT,
  status        TEXT NOT NULL DEFAULT 'ativo',
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agente_dev.sessoes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id          UUID REFERENCES agente_dev.projetos(id) ON DELETE CASCADE,
  agente              TEXT NOT NULL DEFAULT 'dev',
  iniciada_em         TIMESTAMPTZ NOT NULL DEFAULT now(),
  encerrada_em        TIMESTAMPTZ,
  resumo              TEXT,
  arquivos_modificados TEXT[],
  proximos_passos     TEXT,
  tokens_usados       INTEGER
);

CREATE TABLE IF NOT EXISTS agente_dev.decisoes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id  UUID REFERENCES agente_dev.projetos(id) ON DELETE CASCADE,
  sessao_id   UUID REFERENCES agente_dev.sessoes(id)  ON DELETE SET NULL,
  tipo        TEXT NOT NULL,
  decisao     TEXT NOT NULL,
  contexto    TEXT,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agente_dev.entregas (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id        UUID REFERENCES agente_dev.projetos(id) ON DELETE CASCADE,
  sessao_id         UUID REFERENCES agente_dev.sessoes(id)  ON DELETE SET NULL,
  titulo            TEXT NOT NULL,
  descricao         TEXT,
  url_preview       TEXT,
  url_producao      TEXT,
  lighthouse_scores JSONB,
  screenshots       JSONB,
  entregue_em       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agente_dev.padroes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria   TEXT NOT NULL,
  titulo      TEXT NOT NULL,
  descricao   TEXT NOT NULL,
  contexto    TEXT,
  tags        TEXT[],
  uso_count   INTEGER NOT NULL DEFAULT 0,
  ultimo_uso  TIMESTAMPTZ,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projetos_cliente     ON agente_dev.projetos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_projetos_status      ON agente_dev.projetos(status);
CREATE INDEX IF NOT EXISTS idx_sessoes_projeto      ON agente_dev.sessoes(projeto_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_iniciada     ON agente_dev.sessoes(iniciada_em DESC);
CREATE INDEX IF NOT EXISTS idx_decisoes_projeto     ON agente_dev.decisoes(projeto_id);
CREATE INDEX IF NOT EXISTS idx_entregas_projeto     ON agente_dev.entregas(projeto_id);
CREATE INDEX IF NOT EXISTS idx_padroes_categoria    ON agente_dev.padroes(categoria);
CREATE INDEX IF NOT EXISTS idx_padroes_tags         ON agente_dev.padroes USING gin(tags);

CREATE OR REPLACE FUNCTION agente_dev.tg_touch_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_clientes ON agente_dev.clientes;
CREATE TRIGGER touch_clientes
  BEFORE UPDATE ON agente_dev.clientes
  FOR EACH ROW EXECUTE FUNCTION agente_dev.tg_touch_atualizado_em();

DROP TRIGGER IF EXISTS touch_projetos ON agente_dev.projetos;
CREATE TRIGGER touch_projetos
  BEFORE UPDATE ON agente_dev.projetos
  FOR EACH ROW EXECUTE FUNCTION agente_dev.tg_touch_atualizado_em();

GRANT USAGE ON SCHEMA agente_dev TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA agente_dev TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA agente_dev TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA agente_dev TO service_role;

ALTER TABLE agente_dev.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agente_dev.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE agente_dev.sessoes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE agente_dev.decisoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agente_dev.entregas ENABLE ROW LEVEL SECURITY;
ALTER TABLE agente_dev.padroes  ENABLE ROW LEVEL SECURITY;
