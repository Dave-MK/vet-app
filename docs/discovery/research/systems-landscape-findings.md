# Research Appendix B — Vet-Tech Systems Landscape Findings

> Raw research output gathered 2026-07-19 for the Andale practice-operations platform concept.
> Legend: **Verified** = confirmed with cited source · **Inference** = labelled deduction · **Gap** = not publicly documented.

---

## 0. Practice identity (baseline facts)

**Verified:**
- Andale Veterinary Centre, Ditchfield Road, **Widnes**, Cheshire, WA8 8RF (Liverpool city region / Merseyside–Cheshire border — not Liverpool proper). Phone 0151 423 1388, email customer@andalevets.co.uk. Source: <https://www.andalevets.co.uk/>
- Site footer states registered company: **Inspiring Vet Care Limited, company no. 07746795** — IVC Evidensia's main UK trading entity.
- Independent ownership tracker confirms: "Andale Vets: owned by IVC Evidensia (private equity backed)", ownership disclosed on the practice's own site per CMA transparency rules. Source: <https://whoownsyourvet.co.uk/practices/north-west/andale-vets-wa88rf/>
- Practice managing director John Dinsdale (since 1984) is also **Country Medical Director UK at IVC Evidensia**. Source: <https://theorg.com/org/ivc-evidensia/org-chart/john-dinsdale>

**Conclusion (high confidence): Andale is an IVC Evidensia practice.** Its tech stack is corporate-standard IVC UK, centrally procured and controlled.

## 1. Pet Health Club

**Verified:**
- "Pet Health Club" is an **IVC Evidensia brand**, provided by Inspiring Vet Care Limited. Sources: <https://www.pethealthclub.com/uk/phc-terms-of-sale> · <https://ivc.co.uk/pet-health-club>
- Subscription preventative-care plan, explicitly **not insurance**. Essential: vaccinations, 6-monthly health checks, parasite protection. Plus: Essential + unlimited vet consultations + 24/7 online vet + larger discounts. Sources: <https://www.pethealthclub.com/uk/our-plans/dog-plan> · /cat-plan
- The 24/7 online vet telehealth in PHC Plus (and Essential Cat) is operated by **PawSquad**.
- Membership administered by owners via **My Vet Account**; PHC member shop (shop.thepethealthclub.co.uk) with ≥10% product discounts.

## 2. MyVetAccount

**Verified:**
- myvetaccount.co.uk is a pet-owner portal: manage pets, book appointments, view Pet Health Club membership. Multi-tenant URLs (`?groupId=G1418`, `?siteId=1249`) serving many practices.
- IVC Evidensia UK publishes the consumer app "**My Family Vets**", Android package `com.ivcevidensia.omnivet.consumerapp`. Source: <https://play.google.com/store/apps/details?id=com.ivcevidensia.omnivet.consumerapp>

**Inference (high confidence):** MyVetAccount is IVC's in-house client portal (web counterpart to My Family Vets; internal platform name "Omnivet"). **No public API identified.**
- IVC operates an online payment page at <https://www.ivcinternational.co.uk/> ("IVCE Payments"). Andale's exact payment endpoint unconfirmed.

## 3. Vetstoria

**Verified:**
- Real-time online booking synced directly with the PMS (live availability, write-back, conflict checking); 10,000+ clinics. Source: <https://www.vetstoria.com/>
- Integrates with 30+ PMS incl. Merlin, Voyager (MWI), RoboVet, RxWorks, Vision VPM (Covetrus), IDEXX Animana, Cornerstone, Neo, Teleos, VetIT. Source: <https://www.vetstoria.com/integrations/>
- **IVC Evidensia UK is a named Vetstoria enterprise customer** (case study: 14% of new-client appointments online; 42% of online bookings outside office hours). Source: <https://www.vetstoria.com/ivc-evidensia-uk-and-vetstoria/>
- Owned by **Petvisor** (PetDesk, Vetstoria, WhiskerCloud, Kontak; Apax-backed; "Petvisor Hub" enterprise platform 2025). Source: <https://www.apax.com/partnerships/petvisor/>
- APIs: partner-program-gated (<https://www.vetstoria.com/partners/>), no public self-serve API.

**Inference:** Andale's online booking is almost certainly Vetstoria under the IVC UK enterprise deal.

## 4. UK practice-management systems

**Verified landscape:**
- **Merlin** — cloud PMS from **MWI Animal Health** (Cencora), runs on the "Vetspace" cloud. Source: <https://www.mwiah.co.uk/merlin> *(Correction: Merlin is MWI, not Covetrus.)*
- **Voyager** — also MWI.
- **RoboVet, RxWorks, Vision VPM** — Covetrus. **Provet Cloud** — powers CVS Group. **Teleos** — largest independent UK supplier. **ezyVet, Neo, Animana, Cornerstone** — IDEXX.

**IVC's PMS — verified:**
- IVC UK is standardising on **Merlin (MWI, cloud)** — MWI case study of IVC migrating Scarsdale Veterinary Group to Merlin, quoting IVC's senior project manager on a unified group-wide PMS. Source: <https://www.mwiah.co.uk/insights/case-study-merlin-and-scarsdale-veterinary-group>
- Dedicated IVC Merlin tenant observed: `https://live4-ivc.vetspace.cloud/merlin/login`.

**API story (MWI):**
- MWI is "API First": developer portal **<https://mwiah.dev/>** documents 11 APIs (Account, Billing, Calendar, Clinical, Communication, Contact, Formulary, Inventory, Location, Patient, Reminder) under the "Veterinary Integration Platform (VIP)"; MWI Appstore ~20 integrated apps; onboarding via professionalservices@mwiah.co.uk (vetted partnership, not self-serve). Source: <https://www.mwiah.co.uk/insights/enterprise-cloud-apis-and-partnerships>
- Covetrus Connect and IDEXX run equivalent gated partner programs.

**Inference (medium-high):** Andale most likely runs **Merlin on the IVC Vetspace tenant** (or Voyager pending migration). The relevant API surface is MWI VIP — gated by MWI partnership AND IVC corporate approval.

## 5. Lab integrations

**Verified:**
- **VetXML Consortium** (vetxml.co.uk, est. 2006) defines UK schemas for insurance eClaims, Lab Reports (order + result into the PMS record), Microchip Registration. **VetEnvoy** is the transport hub (free to practices, >75% UK penetration claimed). Source: <http://www.vetxml.co.uk/en/vetenvoy/>
- **IDEXX VetConnect PLUS**: results platform for IDEXX Reference Laboratories and in-house VetLab Station analysers, PMS-integrated. Source: <https://software.idexx.co.uk/integration-vetconnect-plus/>
- **Axiom Veterinary Laboratories**: results direct into the PMS where integrated, else via Milab Online. Source: <https://axiomvetlab.com/faqs/>
- MWI Appstore lists IDEXX, Antech, Milab, Abaxis lab integrations into Merlin/Voyager.
- NationWide Laboratories / Finn Pathologists: **gap** — no detailed public integration docs found.

## 6. Vets Now (out-of-hours)

**Verified:**
- **Vets Now is part of IVC Evidensia** (operating independently under its own board). Source: <https://ivcevidensia.com/news/vets-now-joins-ivc-group/> — Andale's OOH provider is intra-group.
- Handover mechanics per Vets Now's pages: case notes transferred back to the daytime practice, "automatically sent through to your day practice the following morning"; discharge/transfer includes full clinical history to owner and daytime practice; morning phone/in-person handover for hospitalised cases. Sources: <https://www.vets-now.com/customer-support/general-enquiries/> · <https://www.vets-now.com/out-of-hours-clinics-2/>

**Gap:** No public evidence of real-time PMS-to-PMS integration day↔OOH; the documented flow is report-based next-morning transfer. Internal IVC Merlin↔Vets Now sharing: unknown, plausible future-state.

## 7. AI vet scribes (build-vs-buy context)

**Verified products and pricing:**
- **VetRec** (vetrec.io): UK pricing **£75/vet/month annual** (£119 monthly); unlimited visits; nurse/front-desk seats free; 30+ templates; "PiMS transfer"; claims GDPR compliance, ICO registration, SOC 2 Type II, no training on customer data. Source: <https://vetrec.io/uk/pricing>
- **ScribbleVet**: ~$150/DVM/month. **Scribenote**: free tier + Pro ~$79/mo. **HappyDoc**: ~$119/mo flat. Also Talkatoo, CoVet, VetSkribe, Digitail "Tails AI" (embedded in Digitail PMS). Market range $40–$450/mo. Source: <https://www.vetsoftwarehub.com/article/veterinary-ai-scribe-pricing-comparison-2026>
- **IDEXX Vello** is client engagement, NOT a scribe; UK availability unconfirmed.

**Safety/accuracy (verified commentary):**
- Documented failure modes: drug name/dose hallucination (highest-stakes — can flow into a dispensed prescription), critical omissions, speaker misattribution; "wrong but plausible" content is the dangerous class; mandatory human review is the standard mitigation. Source: <https://www.vetsoftwarehub.com/article/veterinary-ai-scribe-accuracy-in-2026-buyers-guide>
- Frontiers in Veterinary Science 2026 audit: poor published validation across commercial veterinary AI. Source: <https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2026.1761038/full>

**Build-vs-buy inference:** the scribe market is crowded, cheap (~£75–£120/vet/mo) and GDPR-positioned. Differentiation must come from workflow/PMS depth, not transcription.

## 8. Insurance claims

**Verified:**
- **VetEnvoy eClaims** (VetXML schema, since 2008): direct PMS→insurer submission with status updates back into the PMS; free to practices; >75% adoption claimed. Source: <https://www.vetenvoy.com/uk/content/Services/eClaims.aspx>
- **Major disruption (late 2025/2026): VetEnvoy is becoming "Petios" under Allianz**; non-Allianz insurers (Markerstudy brands, Agria, Policy Expert) are losing access — their claims revert to portals/manual routes. Source: <https://www.postonline.co.uk/technology/7959435/pet-insurers-under-fire-for-blindsiding-vets-with-vetenvoy-halt>
- Allianz owns Petplan (largest UK pet insurer). UK pet-insurance payouts topped £1bn (ABI). Source: <https://www.abi.org.uk/news/news-articles/2025/5/insurance-payouts-for-pawly-pets-top-1-billion-for-third-year-in-a-row/>

**Inference:** UK digital claims rails are fragmenting — any claims-touching workflow must handle multiple channels.

## 9. Integration reality check (third-party layer on a corporate practice's PMS)

**Verified building blocks:** MWI VIP APIs documented but partnership-gated; Covetrus Connect and IDEXX same model; Vetstoria partner-gated; VetXML/VetEnvoy is the only quasi-open industry rail (transport now Allianz-controlled); IVC runs a single-tenant corporate Merlin estate with centrally negotiated group deals.

**Realistic barriers (labelled inference, grounded above):**
1. **Double gatekeeping:** a third-party layer needs (a) MWI VIP partner status AND (b) IVC group-level approval — individual IVC practices cannot unilaterally connect apps to the corporate Merlin tenant.
2. **Data-controller complexity:** the controller of Andale's client/clinical data is Inspiring Vet Care Limited — GDPR processing agreements sign at IVC corporate level, not practice level. Source: <https://ivcevidensia.co.uk/privacy-notice>
3. **Strategic conflict:** MWI and IVC both build client-facing tools (MWI Pet/Swift; IVC Omnivet/My Family Vets/MyVetAccount) — a third-party workflow layer competes with the owner's own roadmap.
4. **Middleware options:** VetXML/VetEnvoy (narrow, fragmenting), MWI VIP (best fit for Merlin, gated), Covetrus Connect (irrelevant if on Merlin). Direct DB extraction (SAVSNET/VetCompass style) is research-only.
5. **Practical path (inference):** either (a) become an MWI VIP partner and sell to IVC centrally, or (b) sit entirely outside the PMS (audio/scribe/consent-based client-side data) with manual/RPA-style export — which is what most AI scribes do today.

## Key corrections to initial assumptions

- Merlin/Voyager are **MWI Animal Health (Cencora)**, not Covetrus. RoboVet/RxWorks/Vision are Covetrus.
- Andale is in **Widnes** (WA8 8RF), not Liverpool itself.
- **Vets Now is IVC-owned** — the OOH provider is intra-group.
- IDEXX Vello is client engagement, not an AI scribe; UK availability unconfirmed.

## Unresolved gaps

- MyVetAccount's operator not directly confirmed on-page (SPA unfetchable) — inferred IVC/Omnivet, high confidence.
- Whether Andale specifically is on Merlin vs Voyager: unverified (estate migrating to Merlin).
- Vets Now inbound (day→OOH) data flow and internal IVC record sharing: no public documentation.
- NationWide/Finn Pathologists integration specifics: not found.
- Exact payment portal behind Andale's "Pay my bill": unconfirmed (candidate: IVCE Payments).
