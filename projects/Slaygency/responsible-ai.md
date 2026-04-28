# Responsible AI

## Data Sources
- Health records are user-submitted via the platform (age, blood pressure, hemoglobin, symptoms).
- No real patient data is used during development — all test data is synthetic.
- AI model training data (if applicable) uses publicly available maternal health datasets.

## Model Choices
- **Primary**: External AI service (`AI_SERVICE_URL`) for preeclampsia risk prediction.
- **Fallback**: Rule-based heuristic engine in `riskService.js` using clinical thresholds (BP ≥ 140/90, Hb < 10, critical symptoms).
- **Design decision**: AI provides decision *support* only — never autonomous clinical decisions.
- **Known constraints**: AI latency (10s timeout), potential hallucination in explanations, limited to preeclampsia screening.

## Bias Considerations
- Populations underrepresented: rural communities, adolescent mothers, high-altitude regions.
- Mitigation: fallback heuristic uses universal clinical thresholds (WHO guidelines).
- The `rural` flag in the AI payload enables location-aware risk adjustment.
- Risk levels are always shown with explanations so clinicians can override.

## Failure Cases
- **AI service down**: Automatic fallback to rule-based heuristic (logged with `source: 'fallback'`).
- **AI returns invalid response**: Validated and rejected; fallback used instead.
- **Network timeout**: 10-second timeout with graceful degradation.
- **Human override**: Doctors can manually create/resolve alerts regardless of AI output.
- **Duplicate alerts**: System prevents duplicate active alerts for the same patient + record.

## Safety and Privacy
- No PHI in server logs (errors sanitized before logging).
- JWT-based authentication with role-based access control (Patient, Doctor, Admin).
- Passwords hashed with bcryptjs (10 rounds).
- Data encrypted in transit (HTTPS) — at-rest encryption is the database provider's responsibility.
- AI predictions are clearly labeled with `source` field ('ai' vs 'fallback').
- All risk assessments include explanations for clinical transparency.
