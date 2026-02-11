---
title: "XXXXX"
date: 2026-02-11T00:00:00+01:00
description: ""
draft: true
tags: [ "software engineering", "tdd", "quality assurance", "code design" ]
categories: ["Software Engineering", "Quality Assurance"]
---
Back in my earliest days as a software engineer, we started using TDD (Test-Driven Development). It was different from the workflow we were used to, which generally involves a single person performing end-to-end testing. I can tell you how hard it is, in the first moment, to change the way of coding.

Usually, during coding, you review a feature to ensure the requirements align with the system flow. So, code first, then test it. TDD came to invert it, driven by automated tests. Now, you code the test first, then your actual code.

At first, to change this mindset was complicated. I couldn't create a test unless I saw my code first. The result: I always missed some flow in this process, and, as history shows, we didn’t have someone dedicated to testing it and pointing out what I missed (most of the time). Yeap! That’s right, we got the error in prod.

As I passed the time, I understood the *RED → GREEN → REFACTOR* pattern. I was able to draw a new workflow for delivering my code, increasing the quality of my development.

{{< imgproc
light="img/rgr-pattern-light.svg"
dark="img/rgr-pattern-dark.svg"
alt="RED → GREEN → REFACTOR pattern"
size="800x"
>}}
