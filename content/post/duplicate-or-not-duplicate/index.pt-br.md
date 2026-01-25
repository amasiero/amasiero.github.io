---
title: "Duplicar ou Não Duplicar? A Regra dos Três na Arquitetura de Software"
date: 2026-01-16T00:00:00+01:00
description: "Uma lição do mundo real sobre duplicação vs abstração, sistemas orientados a eventos e por que a Regra dos Três pode salvar você do over-engineering."
draft: false
tags: [ "arquitetura de software", "refatoração", "regra dos três", "over-engineering", "design de código" ]
categories: ["Arquitetura", "Refatoração"]
---
## Contexto: Um Sistema do Zero Orientado a Eventos

Nos últimos 6 meses, tenho trabalhado em um projeto greenfield. Utilizamos um padrão arquitetural inspirado em uma combinação de [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) e [arquitetura hexagonal](https://alistair.cockburn.us/hexagonal-architecture/). Além disso, adotamos a [arquitetura de fatias verticais (vertical slice architecture)](https://medium.com/design-microservices-architecture-with-patterns/the-problem-with-clean-architecture-vertical-slices-111537c0ffcb) para dividir as funcionalidades de domínio em nossa base de código. Dito isso, estávamos criando um orquestrador para receber eventos de criação e atualização de entidades. Como temos um sistema orientado a eventos, toda a comunicação é assíncrona.

## O Problema de Reconciliação

Comunicação assíncrona geralmente significa que, em algum momento, teremos eventos fora de ordem. Não é uma questão de *se*, mas de *quando*. A solução foi criar um componente de reconciliação que incrementa os dados de acordo com os eventos recebidos. Independentemente da ordem, devemos persistir os dados conforme eles chegam. Para atingir esse objetivo, algumas perguntas vieram à minha mente:

- Que tipo de sistema de lock distribuído devemos implementar?
- Quais dados recebemos em cada evento?
- Como podemos garantir que o último estado será persistido?
- Esse componente deve ser compartilhado ou local para cada entidade?

## A Tentação da Abstração

Venho resolvendo problemas profissionalmente há mais de duas décadas. Uma coisa que notei ao longo do tempo é como desenvolvedores tendem a criar abstrações baseadas em suas experiências passadas. Isso soa sofisticado e faz você se sentir o melhor desenvolvedor do mundo. No entanto, na maioria das vezes, isso nos leva a cenários de over-engineering. Eu sei disso porque fiz isso muitas vezes ao longo dos anos. Sempre que queria me exibir, criava o código mais abstrato possível.

Nos últimos 5 anos, meu objetivo tem sido entregar o melhor código possível para o momento atual do projeto. Isso significa não complicar o código além do necessário. Se manter um pouco de duplicação deixa espaço para manutenção e reduz a carga cognitiva, isso é aceitável para mim. Ainda assim, continuo enfrentando o dilema entre duplicar ou não. O componente de reconciliação foi exatamente o ponto onde esse dilema ficou claro para mim, e aqui está o porquê:

- Temos várias entidades que poderiam usar esse componente.
- No momento, apenas uma das quatro principais entidades precisava dele.
- Não torná-lo genérico agora pode gerar um esforço adicional no futuro.

## Escolhendo a Abstração Cedo Demais

Esses eram alguns dos pensamentos que estavam passando pela minha cabeça. Então decidi desafiar alguns amigos de IA sobre esse tema específico. Como eu precisava do contexto completo do projeto, utilizei contas privadas e curadas da empresa. Desafiei os três principais modelos — Claude, ChatGPT e Gemini — todos com modo agente ativado. Sempre pedi que explicassem a solução e gerassem um documento de RFC (Request for Comments) comparando as abordagens e apresentando os prós e contras de cada cenário.

Eles fizeram um bom trabalho. Todos sugeriram a mesma abordagem: criar um componente genérico que atendesse todas as entidades. Além disso, apontaram o uso de sistemas de lock locais e distribuídos. Após ler os três RFCs, achei a proposta interessante. Discuti com o time e comecei a implementá-la.

## Quando a Abstração Foi Longe Demais

Depois de dois dias trabalhando no código, não fiquei convencido daquela solução. Abstração é uma decisão de design que sempre envolve trade-offs. Assim como os lados sombrio e luminoso da Força, abstração e código concreto estão constantemente lutando por equilíbrio.

{{< imgproc src="img/light_vs_dark.png" alt="Código Concreto vs Código Abstrato. Gerado por IA." size="800x" >}}

No meu caso, a Força estava desequilibrada. A abstração estava tornando o código tão complexo que ficava muito difícil de testar e de acompanhar durante o desenvolvimento. O padrão Red/Green/Refactor estava sempre no vermelho — a cor simplesmente não mudava. Então, na sexta-feira, eu simplesmente fechei o computador e comecei o fim de semana.

## Uma Lição de Sandi Metz

Na manhã de sábado, me deparei com o livro da Sandi Metz, [99 Bottles of OOP](https://sandimetz.com/99bottles), e ele clareou completamente minha mente sobre o problema que eu estava enfrentando no trabalho.

Código concreto traz uma compreensão clara do que está acontecendo. Código abstrato nos permite mudar comportamentos com mais facilidade. Como desenvolvedores, precisamos encontrar esse equilíbrio. Um bom código deve ser fácil de testar, precisa deixar claros os caminhos de execução e também deve permitir mudanças de comportamento. No meu cenário, nenhum desses pontos estava sendo atendido.

Durante a leitura do livro da Sandi Metz, encontrei a seguinte citação:

{{< quote author="Sandi Metz">}}
É mais barato gerenciar duplicações temporárias do que se recuperar de abstrações incorretas.
{{< /quote >}}

## A Regra dos Três, Revisitada

Isso me fez parar e refletir. Alguns minutos depois, lembrei da Regra dos Três, um princípio de refatoração popularizado por [Martin Fowler](https://martinfowler.com/) em [*Refactoring*](https://martinfowler.com/books/refactoring.html). A regra é simples: na primeira vez que você resolve um problema, você simplesmente resolve. Na segunda vez, você pode tolerar duplicação. Na terceira vez, você refatora.

Enquanto Fowler me deu uma regra concreta de refatoração, [Sandi Metz](https://sandimetz.com/) me ajudou a entender por que a abstração prematura é tão perigosa na prática.

Naquele momento, a decisão ficou clara. A Regra dos Três de Fowler me deu permissão para manter a duplicação, e o alerta de Metz me lembrou que o custo de uma abstração errada seria muito maior do que o de uma duplicação temporária.

Na segunda-feira de manhã, a primeira coisa que fiz foi deletar meu branch antigo e criar um novo. Foquei apenas na entidade que apresentava o problema de reconciliação e, ao final do dia, fiz o merge da solução e a coloquei em produção.

## Conclusão Final

Minha principal lição com essa experiência é simples: escreva o melhor código possível para o momento em que seu produto se encontra. Se a duplicação existir e melhorar a clareza, deixe-a viver. Se a terceira duplicação aparecer, refatore com confiança. Abstração não é uma virtude por padrão — é uma responsabilidade. E, como toda responsabilidade, o tempo certo importa.
