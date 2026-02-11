---
title: "Is TDD Still Enough? How AI Changed My Testing Workflow"
date: 2026-02-11T00:00:00+01:00
description: "How my TDD workflow evolved from classic RED → GREEN → REFACTOR to AI-assisted testing — and what it means for modern engineering teams."
draft: false
tags:
  - test-driven development
  - tdd
  - ai-assisted development
  - developer productivity
  - software architecture
  - clean code
  - engineering culture
  - testing strategy
categories:
  - Engineering Practices
  - Software Architecture

---
## I Used to Believe TDD Was the Final Form of Discipline

Write a failing test.<br />
Make it pass.<br />
Refactor.

Repeat.

For a long time, this was my religion.

Back in my earliest days as a software engineer, we started adopting Test-Driven Development. It was radically different from what we were used to. Before that, development looked like this:

Implement the feature. <br />
Manually test it end-to-end. <br />
Fix what breaks.

Usually by the same person.

Changing that mindset was not easy. Writing a test before seeing the code felt unnatural. I couldn’t imagine the API without first implementing it. So I cheated. I wrote some code. Then I wrote the test.

And I missed things.

Edge cases. <br />
Alternate flows. <br />
Unexpected states. <br />

And since we didn’t always have someone dedicated to testing, guess where those gaps surfaced?

Production.

That was my first real lesson: manual testing is not a safety net.

---

## Discovering the RED → GREEN → REFACTOR Cycle

Over time, I started to truly understand the discipline behind the *RED → GREEN → REFACTOR* cycle. 

{{< imgproc
light="img/rgr-pattern-light.svg"
dark="img/rgr-pattern-dark.svg"
alt="RED → GREEN → REFACTOR pattern"
>}}

- RED: Write a failing test.
- GREEN: Write the minimum code to make it pass.
- REFACTOR: Improve the design without breaking behavior.

It wasn’t just about testing.
It was about feedback loops.

I redesigned my personal delivery pipeline around this idea.

{{< imgproc
light="img/dev-pipeline-light.svg"
dark="img/dev-pipeline-dark.svg"
alt="Pipeline for development"
>}}

1. Receive the user story.
2. Extract constraints.
3. Design test cases from those constraints.
4. Implement with tests auto-running.
5. Refactor confidently.
6. Deploy.

When everything was green, I shipped with high confidence.

And for years, this worked beautifully.

---

## The Hidden Assumption of TDD

TDD assumes something very important:

**Clarity**.

It assumes that user stories contain real constraints. <br/>
It assumes acceptance criteria exist. <br/>
It assumes the problem is well-defined.

But the reality changed.

Ten years ago, stories often came with detailed scenarios. Today, they often look like this:

```plain
As System A
I want to retrieve a list of entities paginated from System B
So that I can render the data in the UI
```

That’s it.

No edge cases. <br/>
No constraints. <br/>
No definition of done.

Refinement became a Slack message. <br/>
Context became asynchronous. <br/>
Ambiguity became normal.

So before starting the next RED cycle, I had to introduce a new step:

**REFINE**.

Ask questions. <br/>
Clarify assumptions. <br/>
Extract constraints manually.

The new pipeline wasn’t just:

***RED → GREEN → REFACTOR***

It became:

***REFINE → RED → GREEN → REFACTOR***

TDD still worked — but it required more proactive thinking.

---

## Then Came Complex Integrations

Five years ago, something else changed.

The systems I was building became more integration-heavy.

One example: a workflow integrating multiple cloud services — BigQuery, KMS, Cloud Storage, Cloud SQL — plus an external payment provider API that required:

- Uploading up to 10 files individually.
- Collecting file IDs.
- Sending a final request with the aggregated payload.

This was no longer a pure domain problem. It was orchestration across boundaries.

I set up local emulators, Docker containers, and WireMock stubs based on provider documentation. That part was manageable.

Then we deployed behind a feature flag in staging to validate the “real” integration.

And here is where things changed.

To move fast, we iterated directly in integration:

- Deploy.
- Test.
- Fix.
- Redeploy.
- Repeat.

After three days, the feature was done. It worked.

But not all flows were covered by tests.

Why?

Because mocking certain error paths was expensive. Simulating some integration failures required disproportionate effort.

The cost of writing those tests felt higher than the perceived risk.

So I made a trade-off.

And I left some paths uncovered.

---

## Enter AI: Not Replacing TDD, But Amplifying It

Now we have AI models and agents embedded in our IDEs.

In this case, I used GitHub Copilot in agent mode with Claude Sonnet 4.5.

Instead of manually auditing my test coverage, I asked the agent to:

- Analyze the codebase.
- Identify missing test cases.
- Improve coverage.
- Produce a Markdown report explaining the reasoning.

It took about 10 minutes.

The result?

A structured analysis of uncovered branches, missing edge cases, and improvement suggestions.

Then I asked it to generate the missing tests.

Fifteen minutes later, I had a base implementation for most of them.

It wasn’t perfect.

The agent didn’t understand our internal Test Builder pattern. Some adjustments were necessary. About 10 files required manual tweaks.

But the heavy lifting — the boring, repetitive part — was done.

AI didn’t replace TDD.

It amplified the part I was least motivated to do.

---

## What Actually Changed?

TDD used to be my full delivery philosophy.

Now, it’s one component in a larger system.

In complex systems, the pipeline looks more like this:

1. Refine the problem.
2. Explore integration behavior.
3. Ship behind flags.
4. Observe real interactions.
5. Use AI to detect blind spots.
6. Strengthen the test suite.
7. Refactor safely.

AI compresses feedback loops.

It reduces the cost of expanding coverage. It makes post-integration hardening significantly cheaper.

But it doesn’t replace judgment.

It doesn’t understand your architecture decisions. <br/>
It doesn’t feel the trade-offs. <br/>
It doesn’t own production incidents.

You do.

---

## Is TDD Still Enough?

Yes.

And no.

TDD is still powerful for:

- Core domain logic.
- Deterministic behavior.
- Well-defined constraints.

But modern systems are:

- Distributed.
- Integration-heavy.
- Rapidly evolving.
- Often ambiguously specified.

The delivery pipeline must evolve too.

The real skill today is not “writing tests first.”

It’s designing a workflow that:

- Maximizes feedback.
- Minimizes blind spots.
- Adapts to changing tools.
- Uses AI intentionally — not blindly.

For me, TDD is no longer the end.

It’s the foundation.

And AI is the new amplifier.

The question is no longer:

“Should I use TDD?”

The better question is:

“How do I evolve my delivery pipeline with the tools I have today?”