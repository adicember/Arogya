# Arogya Design System and UI Spec

Arogya is a PCOS **screening** tool: a survey and an ultrasound upload, a likelihood result, then a next step (a nearby doctor and a report to take along). It is never a diagnosis.

The UI should feel **warm, calm and trustworthy**: not clinical-cold, not childish-pink, and never alarming. Rose carries the brand, sage teal carries reassurance, and warm neutrals keep long forms easy to read.

Source of truth for scope: the PRD "Arogya PCOS Screening Platform" (Oct 18, 2026). This file turns it into UI decisions. Parts 1 to 3 are the visual system; parts 4 to 9 are the screens, flows and states.

---

# Part 1. Design principles

1. **Never block screening behind login.** Guest mode is the default path.
2. **One main action per screen.** Secondary actions are visually quieter.
3. **Mobile first.** Designed at 360px, on slow connections. Test every screen at 360px.
4. **Calm, not alarming.** No red for results. Elevated results use a warm berry tone with a clear next step, not an alert.
5. **Likelihood, not diagnosis.** The disclaimer sits on every result screen, not only the footer.
6. **Privacy is visible.** Consent, delete and "what we store" are always one tap away.

---

# Part 2. Visual foundations

## 2.1 Color

### Brand: Rose (evolved from the existing `#862949` and `#E7A3AC`)
| Token | Hex | Use |
|---|---|---|
| rose-50 | `#FDF3F5` | Page tint, hero background |
| rose-100 | `#FAE3E8` | Card tint, selected row |
| rose-200 | `#F3C6CF` | Borders on tinted surfaces |
| rose-300 | `#E7A3AC` | Decorative, illustrations (old `pcosPink`) |
| rose-400 | `#D97C8C` | Hover accents |
| rose-500 | `#C45570` | Links, icons, focus |
| rose-600 | `#A83A5A` | Primary button hover |
| rose-700 | `#862949` | **Primary button / brand** (old `customPink`) |
| rose-800 | `#6A203A` | Pressed, headings on tint |
| rose-900 | `#4A1628` | Footer, darkest accent |

### Secondary: Sage (calm, reassuring, "healthy")
| Token | Hex | Use |
|---|---|---|
| sage-50 | `#F1F8F6` | Info panels |
| sage-100 | `#DCEEE9` | Tags, chips |
| sage-300 | `#8CC3B8` | Illustration |
| sage-500 | `#3F8F82` | Secondary buttons, icons |
| sage-700 | `#2B6A60` | Secondary text, hover |

### Neutrals (warm, not pure gray)
| Token | Hex | Use |
|---|---|---|
| ink-900 | `#2A1F24` | Body text, headings |
| ink-700 | `#4F4249` | Secondary text |
| ink-500 | `#7A6B73` | Placeholder, captions (4.6:1 on white) |
| ink-300 | `#CFC5CA` | Input borders |
| ink-200 | `#E7E0E3` | Dividers |
| ink-100 | `#F5F1F3` | Subtle surfaces |
| paper | `#FFFBFC` | App background |
| white | `#FFFFFF` | Cards, inputs |

### Result levels (no red)
The PRD forbids alarm colors for results. The three likelihood levels use a calm sage-to-berry progression, always with an icon and a label, never color alone.

| Level | Fg | Bg | Border | Icon | Label |
|---|---|---|---|---|---|
| Low likelihood | `#2B6A60` | `#E4F3EF` | `#8CC3B8` | check-circle | "Lower likelihood" |
| Moderate likelihood | `#7A5200` | `#FFF3D6` | `#E8C77A` | info | "Moderate likelihood" |
| High likelihood | `#862949` | `#FAE3E8` | `#E7A3AC` | heart-pulse | "Higher likelihood" |

Use "Higher" and "Lower" in labels rather than "High risk" and "Low risk".

### Status colors (forms and system, not results)
| Meaning | Fg | Bg |
|---|---|---|
| Success | `#2B6A60` | `#E4F3EF` |
| Warning (poor quality, not an ultrasound) | `#7A5200` | `#FFF3D6` |
| Error (field validation, model or network error) | `#9B2C3A` | `#FDECEE` |
| Info | `#3A5A9B` | `#E8EEFA` |

Field errors use the Error fg with an icon and text. The Error color never appears on a likelihood result.

### Gradients
- Hero: `linear-gradient(135deg, #FDF3F5 0%, #FAE3E8 55%, #F1F8F6 100%)`
- Primary CTA (optional): `linear-gradient(135deg, #A83A5A, #862949)`

### Contrast
- `ink-900` on `paper`: 15:1. White on `rose-700`: 8.9:1.
- `rose-300` is decoration only, never text on white (2.1:1).

## 2.2 Typography

| Role | Font | Fallback |
|---|---|---|
| Display and headings | **Fraunces** (soft serif, warm and human) | Georgia, serif |
| UI, body, forms | **Plus Jakarta Sans** (friendly, legible at small sizes) | system-ui, sans-serif |

This replaces Poppins and Ephesis. The script font hurts legibility in a medical product.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Style | Size mobile / desktop | Line height | Weight | Font |
|---|---|---|---|---|
| Display | 34 / 56px | 1.1 | 600 | Fraunces |
| H1 | 28 / 44px | 1.15 | 600 | Fraunces |
| H2 | 24 / 32px | 1.25 | 600 | Fraunces |
| H3 | 20 / 22px | 1.3 | 600 | Plus Jakarta |
| Body L | 18px | 1.6 | 400 | Plus Jakarta |
| Body | 16px | 1.6 | 400 | Plus Jakarta |
| Small / helper | 14px | 1.5 | 400 | Plus Jakarta |
| Label | 14px | 1.4 | 600 | Plus Jakarta |
| Caption | 12px | 1.4 | 500 | Plus Jakarta |

Inputs are never below 16px (stops iOS zoom on focus). Max line length 65ch. Leave room for Nepali (Devanagari) later: use a stack ending in `"Noto Sans Devanagari"` and avoid fixed-height text containers.

## 2.3 Spacing and layout

Base unit **4px** (Tailwind's default scale).

| Context | Value |
|---|---|
| Page gutter | 16px mobile, 24px tablet, 32px desktop |
| Container | 1152px max (`max-w-6xl`); forms and results 640px; hospital finder 1152px |
| Section padding | 48px mobile, 96px desktop |
| Card padding | 16px mobile, 24px desktop |
| Field gap | 20px |
| Label to input | 6px |
| Button | 12px 20px (md), 16px 28px (lg), min height 44px |

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Design at 360px first.

## 2.4 Shape, elevation, motion

| Token | Value | Use |
|---|---|---|
| radius-sm | 8px | Inputs, chips |
| radius-md | 12px | Buttons |
| radius-lg | 20px | Cards |
| radius-xl | 28px | Hero images, modals |
| radius-full | 9999px | Badges, avatars |

Shadows are soft and rose-tinted, never black:
- `shadow-card`: `0 1px 2px rgba(74,22,40,.06), 0 8px 24px rgba(74,22,40,.08)`
- `shadow-pop`: `0 12px 40px rgba(74,22,40,.16)`
- Focus ring: `0 0 0 3px rgba(196,85,112,.35)`

Motion: 150ms for hover and press, 250ms for panels and step changes, `ease-out`. Honor `prefers-reduced-motion`.

## 2.5 Iconography and imagery
- `react-icons`, one set only (Feather), stroke style, 20px in UI, 24px in features.
- Illustrations: flat, soft rose and sage shapes. No clinical stock photos.
- Compress and prune `src/assets`: many large images are unused.

---

# Part 3. Components

**Buttons** (44px min height)
- Primary: bg `rose-700`, white text, hover `rose-600`, active `rose-800`. One per screen.
- Secondary: white bg, 1.5px `rose-700` border and text, hover `rose-50`.
- Ghost: `rose-700` text, hover `rose-50`.
- Destructive (delete image, account): white bg, `#9B2C3A` text and border, always behind a confirm dialog.
- Disabled: bg `ink-200`, text `ink-500`.

**Inputs and selects**: 48px high, white, 1px `ink-300` border, radius-sm, 16px text. Hover border `ink-500`; focus `rose-500` plus focus ring. Label above (14px, 600), helper below (14px, `ink-500`). Error: border and message in Error fg with icon. Every input has a real `<label>`.

**Choice card** (Yes/No and multi-choice): large tap target, radio hidden, selected state = `rose-50` bg, 2px `rose-700` border, check icon.

**Progress bar** (survey): track `ink-200`, fill `rose-700`, text "Step 2 of 5".

**Dropzone**: 2px dashed `rose-300`, `rose-50` bg, radius-lg, upload icon in `rose-500`. States: idle, drag-over (`rose-100`, solid `rose-500` border), uploading (progress), selected (preview), error.

**Result card**: level badge (icon and label), headline, explanation, key factors or confidence, disclaimer block, next-step actions. See Part 5.

**Disclaimer block**: `ink-100` bg, small info icon, 14px text: "This is a screening tool, not a medical diagnosis." Appears on every result screen and in the PDF. Not collapsible.

**Urgent-care note**: single line beneath the disclaimer: "For severe pain or heavy bleeding, seek urgent care." Info style.

**Consent checkbox**: unticked by default, plain-language text, link to privacy policy, 44px target.

**Save prompt** (guest, after result): `sage-50` card: "Want to keep this result? Create a free account to save it." Primary "Save result", ghost "No thanks".

**Toast**: bottom on mobile, top-right on desktop, 4s auto-dismiss, `aria-live="polite"`.

**Confirm dialog** (destructive): modal radius-xl, names exactly what will be deleted, buttons "Cancel" (secondary, default focus) and "Delete" (destructive).

**Navbar**: paper bg, 1px `ink-200` bottom border. Logo left. Links: Home, Survey, Ultrasound, Find a doctor. Right: "Log in" (secondary) for guests, avatar menu (Profile, History, Settings, Log out) when signed in. Mobile: hamburger opening a full-width sheet with 44px rows. Active link `rose-700` with underline.

**Footer**: `rose-900` bg, `rose-100` text. Contains privacy policy, terms, "How this works", and the disclaimer strip.

---

# Part 4. Users and key scenarios

| User | Situation | Needs | Primary path |
|---|---|---|---|
| Curious guest | Has symptoms, no account | Quick survey, clear result, no sign-up wall | Home, Survey, Result |
| Ultrasound holder | Has a scan image | Upload, get a likelihood, understand it | Home, Upload, Result |
| Returning user | Screened before | History by date, report download | Profile, Result detail |
| Care seeker | Elevated result | Nearby gynecologist or endocrinologist, report to show | Result, Hospital finder, PDF |
| Privacy-conscious | Worried about sensitive data | Clear consent, delete image, delete account | Settings |

Main persona: a woman aged roughly 15 to 40, probably on a phone with a slow connection. Plain language, short forms, light pages.

---

# Part 5. Screens

Ten screens. Each lists purpose, layout, and every state to design.

## 5.0 Sitemap and access

| Route | Screen | Access |
|---|---|---|
| `/` | 1 Home | Public |
| `/survey` | 2 Survey | Public (guest OK) |
| `/survey/result` | 3 Survey result | Public |
| `/ultrasound` | 4 Ultrasound upload | Public |
| `/ultrasound/result` | 5 Ultrasound result | Public |
| `/login`, `/signup` | 6 Sign up and login | Public |
| `/profile` | 7 Profile and history | Signed in |
| `/profile/results/:id` | 8 Result detail | Signed in |
| `/find-care` | 9 Hospital finder | Public |
| `/settings` | 10 Privacy and settings | Signed in (policy page is public) |
| `/about-pcos`, `/how-it-works`, `/privacy`, `/terms` | Content pages | Public |

Existing routes (`/SurveyForm`, `/UltrasoundImage`, `/AboutPCOS`, `/login`, `/signup`) map onto these; rename them to lowercase and keep redirects.

## 5.1 Home
- **Purpose:** explain Arogya and start a screening in one tap.
- **Layout:** hero with short intro, two equal-weight actions (**Start survey**, **Upload ultrasound**), "Log in" in the navbar. Below: what PCOS is (short, links to About PCOS), how it works in 3 steps, disclaimer strip.
- **Trust chips:** "No sign-up needed", "Private", "About 5 minutes".
- **States:** Guest (default); Signed in (hero shows "Welcome back", adds "See my history" link, login button replaced by avatar).

## 5.2 Survey
- **Purpose:** collect the inputs the existing model expects.
- **Layout:** one question group per step, progress bar, Back and Next. Sticky bottom action bar on mobile. Yes/No questions as choice cards, numbers with a numeric keyboard.
- **Steps (current model inputs; confirm against the model, see Open Questions):**

| Step | Title | Fields |
|---|---|---|
| 1 | About you | `age`, `weight`, `height`, `blood_group` |
| 2 | Your periods | `reg_periods`, `period_months`, `period_days` |
| 3 | Symptoms | `gained_weight`, `excessive_hair_growth`, `skin_darkening`, `hair_loss`, `pimples`, `mood_swings` |
| 4 | Lifestyle | `eat_fast_food`, `reg_exercise` |
| 5 | Review | All answers with Edit links, then **See my result** |

- **States:** validation errors (inline, under the field, Next disabled until valid); partly filled (draft kept in session, restored on return); submitting (button spinner, no double-submit); error ("Something went wrong. Your data was not saved. Please try again.", answers kept).
- Ranges: age 10 to 60, weight 25 to 200 kg, height 120 to 210 cm.

## 5.3 Survey result
- **Purpose:** show likelihood.
- **Layout:** level badge, headline, plain explanation, **top factors** (3 to 5 chips, e.g. "Irregular periods", "Excess hair growth"), disclaimer block, urgent-care note, next steps.
- **Copy by level:**
  - Low: "Your answers suggest a lower likelihood of PCOS. If you still have symptoms, see a doctor."
  - Moderate: "Some features are commonly seen with PCOS. A doctor can check this properly."
  - High: "Several features match PCOS patterns. We recommend booking a check-up." Shows **Find a doctor** as the primary button.
- **Actions:** Primary depends on level (High: Find a doctor; Low/Moderate: Add an ultrasound). Secondary: Download report (signed in) or Save result (guest). Ghost: Retake survey.
- **States:** guest (shows the save prompt); signed in (auto-saved, "Saved" toast); loading; error.
- **Note:** the survey backend currently returns only 0 or 1. Mapping that to low/moderate/high, and listing top factors, needs the survey model to return a score and feature contributions (FR5). Until then, design for three levels but ship two.

## 5.4 Ultrasound upload
- **Purpose:** take the scan image.
- **Layout:** dropzone (drag and drop, **Choose file**, **Take photo** on mobile), accepted formats "JPG or PNG, up to 10 MB", a "Tips for a good image" expander (clear, uncropped, scan of the ovaries, good light) with an example thumbnail, **consent checkbox** ("Save this image to my account so I can see it later." Unticked, and only enabled for signed-in users; guests see "Sign in to save images"), then **Analyse image**.
- **Privacy line:** "If you don't tick the box, your image is scored and then discarded."
- **States:**

| State | UI |
|---|---|
| Empty | Dropzone idle |
| Drag over | Highlighted dropzone |
| Selected | Preview, filename, size, Remove, Analyse enabled |
| Uploading / analysing | Dimmed preview, indeterminate progress, "Checking your image...", then "Analysing..." |
| Wrong file type | Inline warning: "Please upload a JPG or PNG." |
| Too large | Inline warning: "That file is over 10 MB. Try a smaller copy." |

## 5.5 Ultrasound result
- **Purpose:** show likelihood with confidence.
- **Layout:** image preview thumbnail, level badge, **confidence level** next to it ("Confidence: Medium"), plain meaning, disclaimer block, urgent-care note, **Find a doctor** button.
- **Confidence display:** show a three-step label (Low, Medium, High) with a small meter, plus an info tooltip: "How sure the model is about this image. It is not a medical certainty." Derive the label from the model score (the backend currently returns a raw percentage; decide the thresholds and what "confidence" means for a negative result before building).
- **States and copy:**

| State | Score shown? | Copy |
|---|---|---|
| Loading | No | Progress, "Analysing... usually under 5 seconds" |
| Success | Yes | Level copy as in 5.3, plus confidence |
| Not an ultrasound | No | "This does not look like an ultrasound image. Please upload a clear scan." + Try another image |
| Poor quality | No | "The image is too blurry or dark to score. Try a clearer copy." + tips + Try another image |
| Model or network error | No | "Something went wrong. Your data was not saved. Please try again." + Retry |

- **Backend gap:** today `/predict` returns only "valid ultrasound" or a binary result. The poor-quality state and a low/moderate/high level need the backend to return them (FR7, FR8).
- **Actions:** Find a doctor (primary when High; otherwise secondary), Save result (guest) or auto-saved (signed in), Download report, Check another image (ghost).

## 5.6 Sign up and login
- **Purpose:** create or access an account (managed auth, FR1, FR2).
- **Layout:** card with tabs Log in / Sign up. Email, password (show/hide), **Continue with Google**, "Forgot password?". Signup shows rules inline and a short consent line linking to the privacy policy and terms. No name, phone or address (minimal data).
- **States:**

| State | UI |
|---|---|
| Wrong password | Banner: "That email and password don't match." |
| Existing email | Under email: "An account with this email already exists. Log in instead." |
| Verifying email | Confirmation screen: "Check your inbox", Resend, Change email |
| Forgot password | Email field, "Send reset link", then confirmation |
| Loading | Button spinner |

- **Guest-to-account (FR3):** when reached from a result's Save prompt, show it as a **modal over the result**, and after success save that result to the new account and return to it ("Saved to your profile" toast). Do not lose the result.

## 5.7 Profile and history
- **Purpose:** see saved screenings, newest first (FR10, FR11).
- **Layout:** header (email, link to Settings), filter tabs **All / Survey / Ultrasound**, list of result cards (date, type icon, level badge, thumbnail for ultrasound if image kept), each with Open and a menu (Download report, Delete).
- **States:** Empty ("No saved results yet" + Start survey / Upload ultrasound); Long list (paginate or infinite scroll, sticky filters); Loading skeletons.
- **Trend (nice to have):** a simple timeline of levels over time for returning users ("how they change over time").

## 5.8 Result detail
- **Purpose:** revisit one result.
- **Layout:** date, type, level badge, confidence (ultrasound), image (signed, short-lived link), survey answers (survey), disclaimer, **Download report**, **Find a doctor**, Delete menu.
- **States:** Image deleted (placeholder "Image deleted by you on [date]", result remains); Image link expired (silently refresh); Loading; Not found.

## 5.9 Hospital finder
- **Purpose:** find care nearby (FR13 to FR15).
- **Layout:** top: a permission prompt card with a short reason ("We use your location only to search. We don't store it.") and **Use my location**, plus a **city or area** search box always visible. Below: filter chips (Gynecologist, Endocrinologist, Hospital), a list/map toggle on mobile (side by side on desktop). Each result: name, type, distance, phone (tap to call), **Directions** (opens maps). A marker for hand-verified Nepal clinics (small "Verified" badge).
- **States:**

| State | UI |
|---|---|
| Permission prompt | Explain, then browser prompt |
| Permission denied | "No problem. Type your city or area instead." Search box focused |
| Loading | Skeleton list |
| No results | "We couldn't find clinics nearby. Try a larger area." + city search |
| Offline | "You're offline. Connect to search for clinics." |
| Error | Retry |

- Reached from a High result (primary) and from the navbar.

## 5.10 Privacy and settings
- **Purpose:** control data.
- **Layout:** sections: **Consent** (current status, version and date, **Withdraw** toggle), **Your data** (Delete all my images, Delete all my results), **Delete account**, **Privacy policy** and **How this works** links.
- **States:** confirm dialogs for each delete, naming exactly what is removed and the time frame (account deletion within 30 days at most); success toast; withdrawn state ("We won't store new images or results").
- **Delete flows:** single image (from Result detail), single result (from list or detail), account (Settings). All use the confirm dialog (Part 3).

## 5.11 Content pages
- **About PCOS:** what it is, symptoms, causes (Genetics, Hormonal, Insulin; existing images map to these), when to see a doctor, FAQ. Public, ends with the Start survey CTA.
- **How this works:** plain-language model explanation: training data, test set size, sensitivity and specificity (must be published before launch), limitations.
- **Privacy policy and Terms:** plain language, linked from signup, upload consent, footer.

---

# Part 6. Flows

## 6.1 Guest screening (default, never blocked)
```
Home ─► Start survey ─► steps 1-4 ─► Review ─► Survey result
  │                                              │ guest: save prompt
  └─► Upload ultrasound ─► Analyse ─► Ultrasound result
                                          │
            ┌─────────────────────────────┼───────────────────────┐
            ▼                             ▼                       ▼
   Find a doctor (Screen 9)     Save result ─► Sign up modal    Check another / retake
                                      │
                                      ▼
                         Saved to account, back on the result
```

## 6.2 Care seeker
```
High result ─► Find a doctor ─► location or city ─► list/map ─► Call or Directions
        └─► Download report (PDF) to show the doctor
```

## 6.3 Returning user
```
Log in ─► Profile (history, filters) ─► Result detail ─► Download report / Delete
```

## 6.4 Privacy
```
Settings ─► Consent (withdraw) / Delete images / Delete results / Delete account ─► Confirm ─► Done toast
```

Rules:
- Guest data is held in session state only and discarded when the session ends, unless the guest signs up and saves.
- Login or signup from a result **returns to that result**, with the result carried through the auth step.
- Route guards apply only to Profile, Result detail and Settings. Remove them from Survey, Ultrasound and About PCOS.

---

# Part 7. Content and result wording (UI rules)

Required wording:

| Situation | Screen text |
|---|---|
| Low | "Your answers suggest a lower likelihood of PCOS. If you still have symptoms, see a doctor." |
| Moderate | "Some features are commonly seen with PCOS. A doctor can check this properly." |
| High | "Several features match PCOS patterns. We recommend booking a check-up." (+ Find a doctor) |
| Not an ultrasound | "This does not look like an ultrasound image. Please upload a clear scan." (no score) |
| Poor quality | "The image is too blurry or dark to score. Try a clearer copy." (no score) |
| Error | "Something went wrong. Your data was not saved. Please try again." |

Rules:
- Never write "diagnosis", "you have PCOS" or "you do not have PCOS". Always "likelihood", "suggests", "may".
- A low result still says a doctor can be consulted.
- Show confidence beside every ultrasound result.
- "This is a screening tool, not a medical diagnosis" on every result screen and in the PDF.
- Add the urgent-care line (severe pain or heavy bleeding) on result screens.
- Short sentences, second person, no jargon without a one-line explanation. Written so it can be translated to Nepali later.

---

# Part 8. Global states, responsive, accessibility, performance

## 8.1 Global states
| State | Pattern |
|---|---|
| Loading | Button spinner, indeterminate bar, skeleton cards |
| Validation error | Inline under the field, icon and text |
| Server or model error | Card or banner with Retry; inputs and image preserved |
| Success | Toast, 4s |
| Offline | Banner "You're offline"; queued actions explained, not silently lost |
| Session expired | Prompt to log in; pending result preserved |

No `alert()` anywhere.

## 8.2 Responsive
- **Mobile 360 to 639:** single column, full-width buttons, sticky bottom action bar in the survey and upload, list/map toggle in the finder, hamburger nav.
- **Tablet 640 to 1023:** centered 640px column, two-column cards.
- **Desktop 1024+:** two-column hero, finder shows list and map side by side, profile list with a detail pane.

## 8.3 Accessibility
- WCAG AA contrast; 16px minimum body text; labels on all inputs.
- Visible focus ring on every interactive element; 44px touch targets.
- Dropzone operable by keyboard (Enter or Space opens the file picker).
- `aria-live="polite"` for analysing, result and toasts; errors linked with `aria-describedby`.
- Never rely on color alone for result levels (icon and label always).
- Respect `prefers-reduced-motion`.

## 8.4 Performance targets (from the PRD)
- Survey result in under 2 seconds; ultrasound result in under 5 seconds on a typical mobile connection.
- Lazy-load route pages and below-the-fold sections; compress and convert images to WebP; client-side check of file type and size before upload.
- Usable on current Chrome and Safari, mobile and laptop, down to 360px.

## 8.5 Privacy in the UI
- Consent: unticked by default, plain language, version and date recorded, withdrawable in Settings.
- Minimal data: signup asks only email (and Google).
- Location used for search only, not stored; say so on the prompt.
- Images shown via short-lived signed links; never render a permanent public URL.
- Guest results are not stored; say so ("Not saved unless you create an account").

---

# Part 9. Scope, build order and open questions

## 9.1 Scope
| Feature | Phase |
|---|---|
| Home, About PCOS | MVP |
| Survey with likelihood | MVP |
| Ultrasound with likelihood | MVP |
| Guest use | MVP |
| Sign up, login, logout (email and Google) | MVP |
| Saved results and history | MVP |
| Profile, delete image, delete account | MVP |
| Hospital finder with city fallback | MVP |
| PDF report | MVP |
| Combined survey and ultrasound summary | Later |
| Cycle and symptom tracker | Later |
| Nepali language | Later |
| Doctor booking, reminders to re-screen | Later |
| Using user images to retrain | Only with a separate opt-in |
| Diagnosis or treatment advice | Out of scope |

## 9.2 UI build order (matches PRD phases)
1. **Design and guest flow:** tokens in Tailwind, components (Part 3), screens 1 to 5, disclaimers, image check states.
2. **Accounts:** screen 6, protected routes for Profile and Settings, guest-to-account save modal.
3. **Storage and history:** screens 7 and 8, consent checkbox wired.
4. **Hospital finder:** screen 9.
5. **Report and deletion:** PDF download, confirm dialogs, screen 10.
6. **Launch checks:** privacy policy, consent text, "How this works" page, test at 360px on a slow connection.

Start with phase 1: design tokens, then Home, Survey, Survey result, Upload and Ultrasound result.

## 9.3 Open questions that affect UI
- **Survey model inputs:** exact fields and units (what is `period_months`?), and whether it can return a score and top factors.
- **Ultrasound model output:** poor-quality detection, level thresholds, what "confidence" means for a negative result.
- **Auth and storage provider:** Firebase or Supabase affects the sign-in and email-verification screens.
- **Hospital data:** Google Places or OpenStreetMap, and who verifies the Nepal list (the "Verified" badge depends on it).
- **Languages:** English only at launch, or Nepali from the start (affects font stack and text-length tolerance).
- **Age limit:** under 18 handling and consent wording.
- **Legal:** need for a medical-device disclaimer or review before launch.
- **Success metrics:** instrument screening start/finish, guest save, hospital-finder opens from elevated results.

---

# Appendix A. Tailwind tokens

`tailwind.config.js` and `src/index.css` on disk currently contain only the original `pcosPink` and `customPink` colors, so the tokens above are not defined yet. Paste this to apply them (keeps the legacy names).

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        pcosPink: "#E7A3AC",
        customPink: "#862949",
        rose: { 50:"#FDF3F5",100:"#FAE3E8",200:"#F3C6CF",300:"#E7A3AC",400:"#D97C8C",500:"#C45570",600:"#A83A5A",700:"#862949",800:"#6A203A",900:"#4A1628" },
        sage: { 50:"#F1F8F6",100:"#DCEEE9",300:"#8CC3B8",500:"#3F8F82",700:"#2B6A60" },
        ink: { 100:"#F5F1F3",200:"#E7E0E3",300:"#CFC5CA",500:"#7A6B73",700:"#4F4249",900:"#2A1F24" },
        paper: "#FFFBFC",
        level: {
          lowFg:"#2B6A60", lowBg:"#E4F3EF", lowBorder:"#8CC3B8",
          midFg:"#7A5200", midBg:"#FFF3D6", midBorder:"#E8C77A",
          highFg:"#862949", highBg:"#FAE3E8", highBorder:"#E7A3AC",
        },
        status: { errorFg:"#9B2C3A", errorBg:"#FDECEE", infoFg:"#3A5A9B", infoBg:"#E8EEFA" },
      },
      fontFamily: {
        display: ["Fraunces","Georgia","serif"],
        sans: ["Plus Jakarta Sans","Noto Sans Devanagari","system-ui","sans-serif"],
      },
      borderRadius: { sm:"8px", md:"12px", lg:"20px", xl:"28px" },
      boxShadow: {
        card:"0 1px 2px rgba(74,22,40,.06), 0 8px 24px rgba(74,22,40,.08)",
        pop:"0 12px 40px rgba(74,22,40,.16)",
        focus:"0 0 0 3px rgba(196,85,112,.35)",
      },
      backgroundImage: {
        hero:"linear-gradient(135deg,#FDF3F5 0%,#FAE3E8 55%,#F1F8F6 100%)",
      },
      maxWidth: { form: "640px" },
    },
  },
  plugins: [],
};
```

Also remove the Tailwind 2.2.19 CDN `<link>` from `index.html`. It conflicts with the built Tailwind 3 and ignores this config.
