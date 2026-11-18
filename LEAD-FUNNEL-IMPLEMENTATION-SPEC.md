# NextVisa Lead Funnel — Implementation Specification

## Core funnel
Organic/social visitor → destination landing page → consultation CTA → WhatsApp/Telegram or form → CRM lead → manager follow-up → consultation → service/payment → feedback.

## Page requirements
- Destination-specific heading and value proposition
- Short explanation of support scope; avoid approval guarantees
- Steps/process and clear deliverables
- Official-source links and date reviewed
- Frequently asked questions
- Visible primary CTA
- Trust evidence only if genuine and permissioned
- Responsive/mobile-first layout
- Localized copy and language switcher only when translations are reviewed

## Lead form fields (minimum)
- Name
- Contact method / phone
- Destination
- Travel month (approximate)
- Preferred contact channel
- Consent checkbox and privacy notice

Do not request passport, bank, or other sensitive documents at initial inquiry stage.

## Event tracking names
- `landing_view`
- `destination_select`
- `consultation_cta_click`
- `lead_form_start`
- `lead_form_submit`
- `whatsapp_click`
- `telegram_click`
- `consultation_booked`
- `service_paid`

## CRM lead properties
- Lead ID
- Created timestamp
- Source / campaign / landing page
- Destination
- Travel purpose
- Approximate travel date
- Contact preference
- Consent timestamp and notice version
- Owner
- Status
- Last contact timestamp
- Next action and due date

## Suggested statuses
NEW → CONTACTED → QUALIFIED → CONSULTATION → OFFER_SENT → PAID → IN_SERVICE → COMPLETED
Optional closure statuses: NOT_QUALIFIED, LOST, NO_RESPONSE, REFUNDED.

## Response service level
Set a realistic staffed response SLA (e.g., business-hours target) only after team capacity is confirmed. Automated acknowledgement should not pretend a human has responded.

## Launch acceptance checklist
- [ ] CTA opens correct official NextVisa channel
- [ ] Form validation and error messages work
- [ ] Consent is required and recorded
- [ ] Lead appears in CRM once (no duplicate submission)
- [ ] Manager notification is delivered
- [ ] Follow-up task is created
- [ ] Analytics events fire without exposing personal data
- [ ] Mobile keyboard/layout tested
- [ ] Privacy policy and service terms are accessible
