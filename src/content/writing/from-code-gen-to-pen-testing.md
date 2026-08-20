---
title: From code-gen to pen testing: what happened when we pointed an LLM at our dev environment
date: 2026-08-20
tags: [ai, security, llm]
excerpt: An external audit gave us a relatively clean bill of health. Out of curiosity I pointed an uncensored model at our staging environment anyway, effectively saying "hack my own software." It found things we'd missed.
draft: false
location: Christchurch, NZ
---

As much as we developers hate to admit it, every single one of us will write vulnerable code at some point in our careers, opening up our APIs, databases, or web apps to potential attackers.

This issue has become even more noticeable in the era of AI-assisted coding. Early on, many developers, including myself, placed blind trust in these models, assuming the generated code would always be safe and secure.

Today, AI is improving quickly. Leading AI companies and open-source creators have made these models significantly smarter. We find ourselves in a great era of tooling, with code assistants and AI tools built directly into our day-to-day workflow. Most developers don't even open an integrated development environment (IDE) anymore, going directly to coding harnesses such as Claude Code or Codex.

As AI security becomes a bigger topic, safety guardrails are being looked at closely. At the same time, the open-source community continues to build uncensored model variants. These models operate with fewer restrictions by design, which means they won't automatically refuse requests to help with security research or testing.

Recently, an external security firm completed an audit across our internal tools and gave us a relatively clean bill of health. Out of curiosity, I decided to run an experiment: I pointed an uncensored, cloud-hosted and open-weight model at our dev customer management platform with a prompt to look for weak spots. Effectively saying: "Hack my own software."

To my surprise, the model flagged several security gaps and misconfigurations that had completely flown under the radar, affecting both human-written and AI-assisted code.

## What the AI surfaced

During the automated pass on our staging and API surfaces, the model mapped out several key findings across different severity levels.

### High severity — unauthenticated API key exposure

An unauthenticated key retrieval endpoint allowed access to tenant API keys, potentially allowing anonymous visitors to authenticate against internal routes.

**Fix:** Enforced strict authentication and rotated our staging keys.

### Medium severity — account lifecycle and session flaws

- **User enumeration:** Response codes on password reset routes gave away whether an email was registered or not.
- **Session cookie settings:** Cookies were missing `HttpOnly`, `Secure`, and `SameSite` flags, increasing the risk of session theft.
- **Public API specs:** The Swagger documentation endpoint (`swagger.json`) was publicly visible without requiring a login.
- **Missing rate limits:** Login endpoints lacked backoff mechanisms or request limits to block brute-force attempts.

### What we got right

It's not all bad news. The scan confirmed that CORS origins were locked down, unauthorised requests reliably returned `401`, and sensitive source files (`.env`, `.git`) were properly protected behind Cloudflare.

Seeing these issues pop up on a staging environment that had just passed an external audit was a bit of a shock. We immediately patched the key exposure endpoint, updated the cookie flags, and locked down the Swagger docs. But the bigger takeaway was how easily these small details had slipped through human reviews and automated build checks in the first place.

## Uncensored models as defensive tools

Uncensored models often carry a bad reputation because removing safety rules can allow misuse. But for developers trying to protect their own sites, these models have a very practical use: proactive security testing.

Mainstream tools like ChatGPT or Claude can be overly cautious. If you ask them to test your website for security holes, they will often decline the prompt because they assume you are trying to hack someone.

By running this open, uncensored model, we avoid those roadblocks. We can safely ask the AI to think like an attacker against our own dev sites. It acts like an extra team member that never sleeps, checking endpoints, testing login screens, and spotting weak spots before a real attacker finds them.

## Why AI complements, but doesn't replace, security discipline

Finding these vulnerabilities was an eye-opener, but it also reinforced a fundamental truth: security is not a one-and-done checkbox. A clean report from an audit company didn't guarantee zero bugs, just as running a single AI scan doesn't make our systems completely bulletproof.

Relying on AI to write code means we need to put the same effort into reviewing it. That means:

- **Automated security pipelines:** Adding security scans and model-assisted checks into CI/CD pipelines so code is checked on every commit.
- **Human code reviews:** Understanding why a route was left open or why rate-limiting was missed. AI can flag the issue, but a developer still needs to design the right fix.
- **Regular audits:** Pairing AI testing with external penetration testing to catch deeper business-logic flaws and compliance gaps.

## Looking ahead: the next phase of secure development

As developers, we are shipping more code faster than ever before. But moving fast cannot come at the expense of security. AI-generated code will still make human-like mistakes, like forgotten auth checks, noisy error messages, and missing security headers.

The solution isn't to stop using AI coding assistants. Instead, we should turn the technology back onto our own codebases as a defensive tool. By using flexible, self-hosted models to continuously inspect and test our applications, we can make sure our security standards keep pace with how fast we build.
