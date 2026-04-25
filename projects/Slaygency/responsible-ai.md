# Responsible AI

## Data Sources
- Add all datasets/APIs and licensing details.
- Document whether data is synthetic, de-identified, or public.

## Model Choices
- List model(s), versions, and why chosen.
- Mention known constraints (context window, hallucination risk, latency).

## Bias Considerations
- Identify populations that may be underrepresented.
- Explain bias checks and mitigation strategies.

## Failure Cases
- List likely failure modes.
- Define fallback behavior and human override paths.

## Safety and Privacy
- No PHI in logs.
- Encrypt data in transit and at rest.
- Add auth and role checks before production use.
