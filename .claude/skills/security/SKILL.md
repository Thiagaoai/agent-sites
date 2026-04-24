---
name: security
description: Pre-deploy security review for authentication, user data handling, RLS, input sanitization, headers, and secrets management.
---

# SKILL: security | Priority: 7
Source: AutomatEasy internal — built for AutomatEasy agent suite

## IDENTITY
Security is the defensive review skill for the AutomatEasy agent suite. It ensures that every piece of code handling authentication, user data, or deployment meets baseline security standards. It acts as a mandatory gate before any code reaches production.

## WHEN TO USE
Trigger this skill when:
- Writing or modifying authentication or authorization logic
- Building forms that collect user data (emails, passwords, payment info, PII)
- Configuring or interacting with a database that stores user data
- Preparing any code for deployment (pre-deploy checklist)
- Setting up environment variables, API keys, or secrets
- Implementing Row-Level Security (RLS) policies in Supabase or similar

Do NOT trigger for:
- Pure frontend styling with no data handling
- Static content pages with no forms or auth
- Local-only scripts that never touch user data or external services

## OPERATION MODES
### /quick
- Run the pre-deploy checklist only; flag any failing items without detailed remediation.
### /standard (default)
- Full checklist review plus specific remediation instructions for each failing item. Verify environment variable configuration and basic header setup.
### /deep
- Everything in /standard plus: dependency vulnerability scan (npm audit / pip audit), OWASP Top 10 review against the codebase, CSP header configuration, rate-limiting review, and CORS policy audit.

## WHAT IT DOES
Performs a structured security review across code, configuration, and infrastructure to catch common vulnerabilities before they reach production. Focuses on secrets management, input validation, access control, and transport security.

## EMBEDDED KNOWLEDGE
- **Secrets**: API keys, database credentials, and tokens must NEVER appear in source code. Use environment variables via the hosting provider's dashboard (Vercel, Netlify, etc.) or a secrets manager.
- **RLS (Row-Level Security)**: In Supabase, every table containing user data must have RLS enabled with appropriate policies. Tables without RLS are publicly readable by default.
- **Input sanitization**: All user inputs must be validated and sanitized server-side. Client-side validation is UX, not security.
- **Security headers**: Minimum set includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Referrer-Policy`, and `Content-Security-Policy`.
- **HTTPS**: All production traffic must be served over HTTPS. Redirect HTTP to HTTPS.
- **Auth tokens**: Use short-lived JWTs, store refresh tokens in httpOnly cookies, never in localStorage.
- **CORS**: Restrict allowed origins to known domains; never use wildcard (`*`) in production.

## DECISION TREE
IF code contains hardcoded secrets (API keys, passwords, tokens)
  → BLOCK deployment; move secrets to environment variables immediately
IF database tables lack RLS policies
  → BLOCK deployment; add RLS policies for all user-data tables
IF user inputs are not sanitized server-side
  → Flag as high priority; add server-side validation
IF security headers are missing
  → Flag as medium priority; provide header configuration
IF HTTPS is not enforced
  → BLOCK deployment; configure HTTPS redirect
IF dependencies have known vulnerabilities
  → Flag with severity; update or patch affected packages

## STEP-BY-STEP PROTOCOL
1. Scan source code for hardcoded secrets (API keys, passwords, connection strings).
2. Verify all secrets are stored as environment variables in the hosting provider.
3. Check that RLS is enabled on all database tables containing user data.
4. Review all user input endpoints for server-side validation and sanitization.
5. Verify security headers are configured in the server or hosting platform.
6. Confirm HTTPS is enforced with HTTP-to-HTTPS redirect.
7. Check authentication flow: token storage, expiration, refresh mechanism.
8. Review CORS configuration for overly permissive origins.
9. (Deep mode) Run dependency audit and review against OWASP Top 10.
10. Compile findings into a pass/fail checklist with remediation steps for failures.

## INTERDEPENDENCIES
Run BEFORE:
- Any deployment or publish action
Run AFTER:
- frontend-design (review UI code before deploy)
- systematic-debugging (ensure fixes don't introduce vulnerabilities)

## FAILURE MODES
| Failure | Detection | Fix |
|---|---|---|
| Hardcoded secret in source code | Grep for API key patterns, tokens, passwords in codebase | Move to environment variables; rotate compromised keys |
| RLS not enabled on user-data table | Query Supabase pg_tables or dashboard for RLS status | Enable RLS and add appropriate SELECT/INSERT/UPDATE/DELETE policies |
| Unsanitized user input | Code review of form handlers and API endpoints | Add server-side validation library (zod, joi, etc.) |
| Missing security headers | Response header inspection via browser devtools or curl | Add headers in middleware, server config, or hosting platform settings |
| HTTPS not enforced | Access site via HTTP and check for redirect | Configure force-HTTPS in hosting provider or server config |
| Vulnerable dependency | npm audit / pip audit reports critical CVE | Update package to patched version or find alternative |

## OUTPUT CHECKLIST
- [ ] No secrets in source code
- [ ] RLS active on all relevant database tables
- [ ] All user inputs sanitized server-side
- [ ] Security headers configured
- [ ] Environment variables set in hosting provider dashboard
- [ ] HTTPS enforced with redirect
- [ ] Auth tokens stored securely (httpOnly cookies, not localStorage)
- [ ] CORS restricted to known origins

## PROHIBITED
- NEVER commit API keys, passwords, or tokens to source code or version control
- NEVER deploy without RLS on user-data tables
- NEVER rely solely on client-side validation for security
- NEVER use wildcard CORS origins in production
- NEVER store sensitive tokens in localStorage
- NEVER skip the pre-deploy checklist
