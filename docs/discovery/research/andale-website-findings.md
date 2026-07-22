# Research Appendix C — Andale Vets Website Extraction

> Facts extracted from www.andalevets.co.uk on 2026-07-19. Content was embedded as JSON in server-rendered HTML; prices quoted verbatim. Items marked **NOT FOUND** were searched for and not present.

## Corrections to the project brief's premises

1. The practice is in **Widnes, Cheshire (WA8 8RF)** — Liverpool city region, not Liverpool. OOH provider is Vets Now Liverpool (Huyton, L36 3YD).
2. **Booking is NOT Vetstoria.** `/book-an-appointment` 302-redirects to `https://myvetaccount.co.uk/bookings/visited-before?siteId=1188` — IVC Evidensia's own My Vet Account portal.
3. The practice is **IVC Evidensia-owned**: footer registered company is Inspiring Vet Care Limited (no. 07746795, "The Chocolate Factory", Keynsham — IVC's UK head office), FCA ref FRN738010 for credit-related activities; the privacy notice is headed "Independent Vetcare Ltd". It is not independent.

## Team (as listed on /meet-the-team)

**Practice Management**
- Debbie Roden — Practice Director. Qualified as a veterinary nurse 2003 (Myerscough); 13 years RVN at a charity veterinary hospital; Head Nurse elsewhere 4 years; joined Andale as Head Nurse 2021; Practice Manager 2023.

**Vets (4)**
- Clare Crook — Senior Veterinary Surgeon. Joined June 2024; Liverpool 2004; 13 years charity hospital; interests: soft-tissue surgery, rabbit welfare, dog-friendly clinics, feline anxiety reduction, pain management.
- Gillian Tunney — Veterinary Surgeon. At Andale since 2005; Glasgow graduate; part-time.
- Matthew Houghton — Veterinary Surgeon. Nottingham 2017; returned to Andale Oct 2022.
- Alice Fitzpatrick — Graduate Veterinary Surgeon. Liverpool graduate "this year".

**Nursing (10)**
- Catherine Dixon — Head Registered Veterinary Nurse. In practice since 2002; joined 2022 after 15 years at a veterinary charity hospital; Head Nurse 2023; **clinical coach**.
- RVNs: Bronwyn Crowley-Green (2024; interests analgesia, Schedule 3, exotics), Caroline Rustage (since 1997; **responsible for stock ordering**), Charlotte Bate (2023), Helen Murray (25+ years), Joe Chadwick (joined 2022 as VCA→SVN; qualified Dec 2025), Michelle Sharrock (2018 student→qualified 2019), Rebecca Trimmer (since 2011; special interest **anaesthesia**).
- Lauren Wright — Student Veterinary Nurse (second year).

**Support (6)**
- Helen Evans — Veterinary Care Assistant (receptionist 2021 → VCA Dec 2024).
- Natalie Gillan — Head Receptionist (since 2000; "3 vets to the current 7 vets and 8 veterinary nurses").
- Receptionists: Danielle Shelbourne (2018), Sarah Greenwood, Stephanie Beattie (2018).
- Shari Coles — Client Care (at Andale since January 1994).

Headcount observed on site: ~21 named staff. One graduate vet, one student nurse, one VCA, one client-care person — several brief "role families" are single individuals.

## About / facilities

- "Trusted partner in pet care in Cheshire"; dogs, cats and exotic pets (rabbits, guinea pigs, ferrets, hamsters); wellness plans, nutrition, dental.
- Purpose-built building (date NOT FOUND); operating since at least 1994 (staff bios).
- Accreditation logos: Pet Health Club member; RCVS (logo "rcvs-approved.jpg"). **PSS tier NOT FOUND. ISFM Cat Friendly accreditation NOT FOUND.** "Rabbit Friendly" appears as a homepage feature tile, no accrediting body named.
- Wheelchair accessible; on-site parking. Google rating 4.7.
- Opening hours: Mon–Fri 08:00–18:30; Sat 09:00–12:00; Sun closed.

## Services & prices (columns: Full / PHC Essential / PHC Plus)

**Vet consultations**: Young Pet (≤12 months) £45 / £45 / Unlimited*; Consultation £67 / £67 / Unlimited*; Follow-up £64 / £64 / Unlimited*; **Written prescription £37** (all columns).

**Vaccinations** (Essential and Plus "Included"): Puppy course £70; Annual dog booster £76.50; Kennel cough £66 (£35 with other vaccination); Adult dog course £75.50; Kitten course £70; Annual cat booster £76.50; Adult cat course £75.50; Rabbit £100.87.

**Neutering** (Essential 10% off, Plus 20% off): Dog castrate £370 (<25kg) / £435 (>25kg) / £490 (>45kg); Bitch spay £475 (<25kg) / £525 (25–45kg) / £560 (>45kg); Cat spay £200; cat castrate £145; Rabbit spay £216; rabbit castrate £189.82.

**Nurse clinics** (Included on plans): Nail clipping £43.78; Anal-gland expression £43.78. **Microchip** £45 (Included on plans). **Dentistry** (10%/20% off): First stage £435; Comprehensive Oral Assessment £435. **Wellness screening** £95 (10%/20% off).

Disclaimer: "*Specialist, referral, or out-of-hours consultations are not included. Consultation fees associated with administering injections for chronic conditions are not included but discounted for PHC Plus members. Fair usage policy terms and conditions apply."

**Offers page**: puppy/kitten starter £99 ("worth over £200"); dental assessment + clean £349 until 15 August; 10% off PetAir travel; insurance offer — one month free and 20% off for PHC members.

**Pet Health Club** (IVC brand, ">800 practices"): Dog plans from £24.99 p/m, Cat from £22.99, Rabbit from £19.99. Essential: vaccinations, flea/worm/tick, health checks, 50% off 24/7 online vet. Plus: everything + unlimited consultations† + 24/7 online vet‡. Exact weight-band plan prices held in pethealthclub.com checkout (surgeryid=1188), NOT on the practice site.

## Booking, registration, prescriptions, payment

- **Booking**: My Vet Account portal (React SPA), siteId 1188. First step: "visited before?". Online appointment types loaded at runtime — NOT FOUND. Header "Login" → myvetaccount.co.uk/signin. "Book online 24/7" claimed.
- **Registration**: native site form (`/api/forms/AddRegistration`), species/breed lookup (`/api/search/GetBreed`), previous-practice question with consent text: "I consent to my pet's details to be transferred from my previous Vet to my new Veterinary practice."
- **Repeat prescriptions**: native form (`/api/forms/AddPrescriptionOrder`, reCAPTCHA). Fields: client contact details; pet name; medication details free text; current dose; multi-med support; collection at Widnes only; privacy checkbox. Confirmation: "We will review the request and will be in touch when you can collect your prescription." **"If your current prescription is 6 months old, we will need to re-examine your pet to make sure your prescription is still suitable for them."** No stated turnaround time.
- **Payment**: `/online-payment` — **Stripe** (live publishable key in page); fields: practice, invoice number ("Use pet's name if necessary"), reference number from correspondence, amount. Note the invoice-number hint implies loose invoice referencing.

## Emergency care

- In hours: call 0151 423 1388. Out of hours: **Vets Now Liverpool, 0151 480 2040, Woolfall Heath Ave, L36 3YD** — "available at all times when our clinic is closed".
- Emergency modal also offers **PawSquad** video vet ("Non-critical care only", ~08:00–23:00 daily).
- Critical-conditions list (site's own triage content): deep wounds/significant bleeding; swallowing objects/choking; toxins (raisins, rat poison, antifreeze); collapse/serious trauma (car accidents); breathing difficulties; seizures; inability to urinate (esp. male cats); severe vomiting/diarrhoea (≥5 episodes in 12h or blood); inability to stand/dragging legs; swollen abdomen or retching (esp. large dogs); eye problems; struggling to give birth (green/bloody/brown discharge).

## Third-party systems observed (URL evidence)

| System | Role | Evidence |
|---|---|---|
| My Vet Account (IVC "Omnivet") | Client portal + online booking | 302 redirect, siteId=1188 |
| IVC ClinicsView | Central CMS/data API for practice sites | api.clinicsview.ivcevidensia.io; Kentico-style fields |
| Pet Health Club | Health plan + shop | pethealthclub.com checkout surgeryid=1188 |
| Stripe | Online bill payment | pk_live key in bundle |
| Vets Now | OOH (intra-group) | /emergency-care |
| PawSquad | 24/7 video vet | pawsquad.com/vets-now link |
| OneTrust | Cookie consent + hosted privacy notice | privacyportalde-cdn.onetrust.com |
| Google | GTM ×2, Maps, reCAPTCHA, reviews | site bundle |
| Native forms API | Registration, repeat Rx, payment | /api/forms/* |

- Underlying PMS name: **NOT FOUND on the site**; the clinic is identified as externalSiteId 1188 across IVC systems. (See Appendix B: IVC UK is standardising on MWI Merlin.)
- "Get the App" footer section exists with empty store links (badges hidden) — consistent with IVC's "My Family Vets" app rollout.

## Privacy / data protection

- Data controller: **Independent Vetcare Ltd** (privacy notice heading). Notice body rendered client-side by OneTrust; full processor list NOT retrievable server-side.
- Policy pages: /privacy-notice, /terms-of-sale-for-veterinary-services, /terms-of-use, /cookie-policy, /complaints-policy.
