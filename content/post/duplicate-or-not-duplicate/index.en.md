---
title: "Duplicate or Not Duplicate? The Rule of Three in Software Architecture"
date: 2026-01-16T00:00:00+01:00
description: "A real-world lesson on duplication vs abstraction, event-driven systems, and why the Rule of Three can save you from over-engineering."
draft: false
tags: [ "software architecture", "refactoring", "rule of three", "over-engineering", "code design" ]
categories: ["Architecture", "Refactoring"]
---
## Context: A Greenfield, Event-Driven System

For the last 6 months, I've been working on a greenfield project. We use an architectural pattern inspired by a mix of [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/). Also, we use [vertical slice architecture](https://medium.com/design-microservices-architecture-with-patterns/the-problem-with-clean-architecture-vertical-slices-111537c0ffcb) to split domain features in our codebase. That said, we were creating an orchestrator for receiving events about an entity creation and update. Since we have an event-driven system, all the communication is asynchronous.

## The Reconciliation Problem

Asynchronous communication usually means we will have events out-of-order in some moment. It is not an *if* question, but a *when* question. The solution was to create a reconcile component that will increment the data according to the events. Regardless of the order, we should save the data as we receive it. To accomplish this goal, some questions came to my mind:

- Which type of distributed lock system should we implement?
- What data do we receive from each event?
- How can we guarantee that the last state will be stored?
- Should this component be shared or local to each entity?

## The Temptation of Abstraction

I've been solving problems from the last 2 decades professionally. One thing I’ve noticed is how developers tend to create abstractions based on their past experience. It sounds fancy and you feel like you are the best developer in the world. However, it leads us to an over-engineering scenario most of the times. I know because I did this a lot over the years. Every time I want to show off, I created the most abstract code ever.

In the last 5 years, I just want to deliver the best code for the moment of the project. Which means, I don't want to complicate the code so much. If keeping some duplication leaves room for maintainability and reduces cognitive load, that’s acceptable to me. But I'm still facing the dilema when duplicate or not. See, the reconcile component is one component that brought this dilema for me, and here is the why:

- We have many entities that can use this component.
- At the current moment only one of the four main entities was requiring this component.
- Not making it generic now, can lead to a new effort in the future.

## Choosing Abstraction Too Early

These are some of the things passing into my mind. So I decided to challenge some AI friends about this specific topic. Since I need the context of the project for doing that, I use the private and curated accounts from the company. I challenged the 3 main model, Claude, ChatGPT, and Gemini with agent mode on. I always ask them to explain the solution and generate a RFC (Request for Comments) document comparing solution and giving me the pros and cons of each scenario.

They did a pretty well job, all of them suggested the same approach. Create a generic component to fit all entities. Beyond that, they pointed to use a local and distributed lock system. Reading all the three RFCs, I thought it was an interesting approach. I discussed with the team, and started to implementing it.

## When Abstraction Went Too Far

After 2 days working at the code, I was not convinced by that solution. Abstraction is a design decision with a trade-off. Like the dark and light sides of the Force, abstraction and concrete code are constantly fighting for balance.

{{< imgproc src="img/light_vs_dark.png" alt="Concrete Code VS Abstract Code. AI generated." size="800x" >}}

In my case, the force was unbalanced. The abstraction was making the code so complex that it was very hard to test, and follow during the development. The Red/Green/Refactor pattern was always red, the color was not changing at all. So, Friday after I simple close my computer and started the weekend. 

## A Lesson from Sandi Metz

Saturday morning, I come across the Sandi Metz's book [99 Bottles of OOP](https://sandimetz.com/99bottles) and it clarified my mind for the issue I was facing at work.

Concrete code brings a clear comprehension over what is going on. Abstract code allows us to easily change the behavior. As developers, we must to find that balance. A good code must be easy to test, needs to provide comprehension of the paths, and also be easy to change the behavior. My scenario was not achieving any of these points.

While reading Sandi Metz’s book, I crossed with the following quote:

{{< quote author="Sandi Metz">}}
It is cheaper to manage temporary duplication than to recover from incorrect abstractions.
{{< /quote >}}

## The Rule of Three, Revisited

This made me pause and reflect. A few minutes later, I remembered the Rule of Three, a refactoring principle popularized by [Martin Fowler](https://martinfowler.com/) in [*Refactoring*](https://martinfowler.com/books/refactoring.html). The rule is simple: the first time you solve a problem, you just solve it. The second time, you may tolerate duplication. The third time, you refactor.

While Fowler gave me a concrete refactoring rule, [Sandi Metz](https://sandimetz.com/) helped me understand why premature abstraction is so dangerous in practice.

At that moment, the decision became clear. Fowler’s Rule of Three gave me permission to keep duplication, and Metz’s warning reminded me that the cost of a wrong abstraction would be far higher than a temporary one.

Monday morning, the first thing was delete my old branch and create a new one. I focused only in the entity presenting the reconciliation problem, and at the end of the day I merged the solution and deployed.

## Final Takeaway

My takeaway from this experience is simple: write the best code for the moment your product is in. If duplication exists but improves clarity, let it live. If the third duplication appears, refactor with confidence. Abstraction is not a virtue by default — it’s a responsibility. And like all responsibilities, timing matters.