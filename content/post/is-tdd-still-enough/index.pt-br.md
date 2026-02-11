---
title: "TDD Ainda é Suficiente? Como a AI Transformou Meu Workflow de Testes"
date: 2026-02-11T00:00:00+01:00
description: "Uma reflexão prática sobre Test-Driven Development (TDD), integração com sistemas distribuídos e como AI-assisted testing está mudando o delivery pipeline de equipes modernas de software."
draft: false
tags:
  - tdd
  - test-driven development
  - ai-assisted development
  - testes automatizados
  - engenharia de software
  - arquitetura de software
  - clean code
  - produtividade para desenvolvedores
  - testing strategy
categories:
  - Engenharia de Software
  - Arquitetura de Software
---

## Eu Achava que TDD Era o Nível Máximo de Disciplina

Escreva um teste que falhe. <br />
Faça ele passar. <br />
Refatore.  

Repita.

Por muito tempo, isso foi quase um mantra pra mim.

Lá no começo da minha carreira como software engineer, começamos a adotar **Test-Driven Development (TDD)**. E aquilo virou meu mundo de cabeça pra baixo.

Antes disso, o fluxo era simples:

- Implementa a feature.
- Testa manualmente end-to-end.
- Corrige o que quebrar.

Quase sempre feito pela mesma pessoa.

Quando o TDD entrou em cena, parecia contraintuitivo. Escrever um test antes de ter o código? Soava estranho. Eu mal conseguia imaginar a API sem antes implementá-la.

Então eu fazia o que muita gente faz no começo: dava uma “adiantada”. Escrevia um pouco de código… depois criava o test.

E claro, eu deixava passar coisa.

Edge cases. <br />
Fluxos alternativos. <br />
Estados inesperados.

E como nem sempre tinha alguém dedicado a testar, adivinha onde esses buracos apareciam?

Em produção.

Ali eu entendi uma coisa importante:

Teste manual não é uma maneira segura de fazer deploy.

---

## O Poder Real do RED → GREEN → REFACTOR

Com o tempo, comecei a enxergar o TDD de verdade.

{{< imgproc
light="img/rgr-pattern-light.svg"
dark="img/rgr-pattern-dark.svg"
alt="Ciclo RED → GREEN → REFACTOR"
>}}

- **RED**: Faça um teste que falhe.
- **GREEN**: Escrever o mínimo de código para fazer passar.
- **REFACTOR**: Melhorar o design sem mudar o comportamento.

O segredo nunca foi só testar.

Era sobre **feedback loops rápidos**.

Eu reorganizei completamente meu delivery pipeline em torno disso.

{{< imgproc
light="img/dev-pipeline-light.svg"
dark="img/dev-pipeline-dark.svg"
alt="Pipeline de desenvolvimento baseado em TDD"
>}}

Meu fluxo ficou mais ou menos assim:

1. Receber a user story.
2. Extrair os requisitos.
3. Desenhar test cases baseados nesses requisitos.
4. Implementar com os tests rodando automaticamente.
5. Refatorar com segurança.
6. Fazer o deploy com confiança.

Quando tudo estava green, eu fazia o envio com alta confiança.

E por anos isso funcionou muito bem.

---

## O Problema que Ninguém Fala: TDD Assume Clareza

Aqui está o ponto que pouca gente comenta:

**TDD depende de clareza.**

Ele assume que:

- A user story tem constraints reais.
- Existem acceptance criteria.
- O problema está bem definido.

Mas a realidade mudou.

Hoje é comum receber algo assim:

```plain
Sendo o sistema A
Eu quero receber a lista de entidades de forma paginada do sistema B
Assim eu posso renderizar os dados na UI
```

E acabou.

Sem edge cases. <br />
Sem definições de fim. <br />
Sem critérios de aceitação claros.

Refinar virou mensagem no Slack. <br />
Contexto virou thread assíncrona. <br />
Ambiguidade virou padrão.

Então antes de começar o ciclo RED, eu precisei adicionar um novo passo:

**REFINE**.

Perguntar.
Desafiar suposições.
Extrair constraints na conversa.

O pipeline deixou de ser apenas:

***RED → GREEN → REFACTOR***

E virou:

***REFINE → RED → GREEN → REFACTOR***

TDD continuava funcionando.

Mas exigia muito mais protagonismo técnico.

---

## Quando o Sistema requer integração mais intensa

Alguns anos depois, outro desafio apareceu.

Os sistemas começaram a ficar cada vez mais distribuídos e integration-heavy.

Em um dos projetos, eu estava integrando:

- BigQuery
- KMS
- Cloud Storage
- Cloud SQL
- Uma API de provedor de pagamento externo

O fluxo envolvia:

- Upload de até 10 arquivos individualmente.
- Coleta de file IDs.
- Uma request final agregando tudo.
- Isso já não era só lógica de domínio.

Era orquestração entre boundaries.

Configurei emuladores locais, Docker containers e WireMock stubs, tudo baseado na documentação do provedor. Até aí, ok.

Depois fizemos deploy com feature flag em staging para testar com integração real.

E foi aí que o ritmo mudou.

Para ganhar velocidade, o ciclo virou:

***Deploy → Test → Fix → Redeploy → Repeat***.

Em três dias, a feature estava pronta.

Funcionando.

Mas nem todos os fluxos estavam cobertos por testes.

Por quê?

Porque simular certos error paths era caro demais. Mockar algumas falhas de integração exigia um esforço desproporcional.

O custo parecia maior que o risco.

Então eu fiz um trade-off.

E aceitei deixar algumas partes sem cobertura.

---

## AI não Substituiu o TDD — Ela Amplificou

Com AI integrada na IDE, o jogo mudou de novo.

Usei GitHub Copilot em agent mode com Claude Sonnet 4.5.

Pedi para ele:

- Analisar o codebase.
- Identificar lacunas de test coverage.
- Sugerir novos test cases.
- Gerar um relatório explicando o raciocínio.

Em cerca de 10 minutos, eu tinha uma análise estruturada.

Depois pedi para gerar os testes faltantes.

Em mais 15 minutos, boa parte da base estava pronta.

Não foi perfeito.

Ele não entendeu nosso Test Builder pattern interno. Precisei ajustar alguns arquivos manualmente.

Mas o trabalho repetitivo estava feito.

AI não substituiu o TDD.

Ela reduziu o custo de expandir a cobertura.

Ela tornou mais barato fechar os blind spots.

---

## O que realmente mudou?

Antes, TDD era minha filosofia inteira de delivery.

Hoje, ele é parte de um sistema maior.

Em sistemas complexos, o pipeline se parece mais com isso:

1. Refine o problema.
2. Explore o comportamento real.
3. Ship com feature flag.
4. Observe o sistema em ambiente real.
5. Use AI para detectar gaps.
6. Fortaleça o test suite.
7. Refactor com segurança.

AI encurta os ciclos de feedback.

Ela não toma decisões por você.

Ela não entende sua arquitetura profundamente (ainda). Ela não assume incidentes em produção.

Mas ela acelera o fortalecimento do sistema.

---

## Então... TDD Ainda é Suficiente?

Sim.

E não.

TDD continua sendo extremamente poderoso para:

- Lógica do domínio core.
- Comportamento determinístico.
- Regras de negócio bem definidas.

Mas sistemas modernos são:

- Distribuídos.
- Inttegração intensa.
- Rapidamente evoluindo.
- Frequentemente ambíguos.

O delivery pipeline precisa evoluir junto.

A skill mais importante hoje não é “escrever tests primeiro”.

É desenhar um workflow que:

- Maximiza feedback.
- Reduz pontos cegos.
- Se adapta às ferramentas.
- Usa AI de forma estratégica.

Para mim, TDD não é mais o destino final.

É a fundação.

E AI é o novo amplificador.

A pergunta deixou de ser:

“Devo usar TDD?”

E passou a ser:

“Como eu evoluo meu delivery pipeline com as ferramentas que existem hoje?”