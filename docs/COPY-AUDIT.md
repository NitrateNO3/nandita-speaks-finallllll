# Copy audit: current site vs Page Copy for Developer

Source of truth: *nanditaspeaks.in: Page Copy for Developer* (Version 1, one tab: Home, Speaking, About, each with search setup, copy, JSON-LD, alt text and checklist). Read in full on 25 Nov 2026. The Website Brief was also re-read in full; its second tab ("Home page") is empty.

The Page Copy does **not** yet cover Silent Screams, Blog, Contact, Privacy Policy or the 404 page ("More pages will be added to this document as they are finished").

Status in the design preview (`design/`): every item below is corrected. The live React code in `src/` is unchanged until design approval.

## Home `/`

| Item | Current site (`src/pages/Home.jsx`) | Page Copy | Preview |
|---|---|---|---|
| Intro, 2nd sentence | "…not gone to plan — an entrepreneur and the author of Silent Screams" | "…not gone to plan. I am also an entrepreneur and the author of Silent Screams." | Fixed |
| Supporting line | missing | "Women-focused keynotes and motivational talks" | Added |
| Hero extras | "Currently booking 2026 · in person & online", "Speaker · Author · Entrepreneur", Scroll cue | not in copy; booking/format unconfirmed | Removed |
| Showreel / "Watch" block | "See Nandita on stage. A two-minute reel" | not in copy; no footage supplied | Removed |
| H2 | "Why I speak" (label) + "I have had to rebuild more than once." | "Why I speak to women about self-belief" | Fixed |
| Why I speak, para 2 | "I separated after 18 years." … no About link sentence | "I have had to rebuild more than once. I separated after 18 years of marriage. … You can read the full story on my About page." (inline link) | Fixed |
| Pull quote | "A small next step is still a step." under "In her words" | belongs to About › What I believe; needs approval | Removed from Home |
| Themes intro | "Five themes, drawn from a real life." + "Each one comes from…" | H2 "What I speak about", no intro | Fixed |
| Signature talks on Home | three talks + "Enquire about this talk" | not on Home; talk titles not approved | Removed |
| Testimonials ("Praise") | three quotes attributed to organisers | none supplied; PRD forbids invented testimonials | Removed |
| H2 audiences | "Two rooms. One honest conversation." | "Who can invite me to speak", H3 "Women's communities and events" / "Companies and teams" | Fixed |
| Audience link text | "Explore" | "Talks for women's events" / "Sessions for companies and teams" | Fixed |
| Chemotherapy, para 1 | ends "…doing what needs to be done." | adds "Other people cope in other ways, and that is fine." | Fixed |
| Chemotherapy [ADD] | – | "one short, light line in Nandita's own words" | Pending marker (preview only) |
| Where I have spoken | missing | H2 + "I have spoken at sessions for cancer patients." (only this sentence until verified items) | Added |
| Book H2 | "My book" + "Putting the unsaid into words." | "My book, Silent Screams" | Fixed |
| Book link | "Find it on Amazon →" | "About the book Silent Screams" → /silent-screams/ | Fixed |
| How to invite (3 steps) | "Three steps to a date in the diary." | not in copy | Removed |
| From the blog | preview cards | hide until 3 posts published | Hidden in public view |
| FAQ | matches | 5 questions; 4 more only when confirmed | Matches |
| Closing band | – | H2 "Invite Nandita to speak" + "Planning an event… what you have in mind." | Fixed |
| Title / meta | match | match | OK (move to server-rendered head) |

## Speaking `/speaking/`

| Item | Current site | Page Copy | Preview |
|---|---|---|---|
| H1 | "Keynotes & talks for women" | "Keynotes and Talks for Women's Events" | Fixed |
| Intro | "…setbacks — told honestly, with a few questions…" | "…setbacks. My talks come from my own experience, told honestly, with a few questions for the audience to take home." | Fixed |
| Women block | "…slowly lost confidence." | "…slowly lost confidence in themselves." + [CONFIRM event types] | Fixed, confirm marker |
| Companies block | split in two paragraphs | one paragraph | Fixed |
| Theme descriptions | Home versions | longer Speaking versions (5 new texts, incl. "It is my own experience and not financial advice.") | Fixed |
| Talks H2 | "Three starting points…" | "Talk ideas for your event" + "Each talk can be a keynote or a shorter session. [CONFIRM lengths]" | Fixed; whole section hidden until Nandita approves titles |
| Talks closing line | – | "Any of these can be shaped to your audience and event…" [CONFIRM] | Added, pending marker |
| Session details | – | hidden until every detail confirmed | Hidden |
| Bio | "press bio" label | H2 "Bio for your event programme" + "Please use this short bio…" | Fixed; needs Nandita's approval; photo link hidden |
| Where I have spoken | missing | same sentence as Home | Added |
| FAQ | matches | 4 questions; extras only when confirmed | Matches |
| Closing | – | "Tell me the date, the audience and what you have in mind." [reply time] [speaker PDF] | Fixed, pending markers |
| Schema | Person/other | `Service` JSON-LD as supplied | To build |

## About `/about/`

| Item | Current site | Page Copy | Preview |
|---|---|---|---|
| H1 | "About Nandita." | "About Nandita Thakur" | Fixed |
| Intro | "…the author of Silent Screams. I speak… — because I have had to…" | "…because I have had to do it more than once." (no dash) | Fixed |
| Quick facts | "the facts —" cards | H2 "Quick facts" list (Name, Known for, Author of, Also, Speaks at, Based in) | Fixed; "Based in" hidden; business names pending |
| My story | matches 5 paragraphs | matches; [ADD optional line] | Matches; pending marker |
| What I do now › Speaking | shorter sentence | "…about self-belief, having an identity of your own, building independence, living through uncertainty and finding enjoyment again." | Fixed |
| Speaking link | "Invite me to speak" | "Invite me to speak at your event" → /speaking/ | Fixed |
| Writing | one sentence | adds "Writing it is part of why I can speak openly about hard experiences today." | Fixed |
| Business | matches | [ADD: what Anthem is] | Pending marker |
| What I believe | matches | matches; Nandita approves each line | Matches; approval note |
| FAQ › Silent Screams | matches | [ADD one-line description] | Pending marker |
| "Tap a card to flip it over" flip cards | – | accordion with H3 questions | Replaced by accordion |
| Closing band | "want the whole story? it's in my book →" | H2 "Invite Nandita to speak" + standard line | Fixed |

## Pages without supplied copy

| Page | Current site text not in any client document | Preview |
|---|---|---|
| Silent Screams | "The book moves through the themes I keep returning to…", "What runs through it", "Bring Silent Screams home.", "Available as an eBook on Amazon India." | Removed. Uses only approved sentences; description, synopsis and buy link pending/hidden |
| Blog | "Notes between the talks.", "Short, honest writing…", sample post titles, "Say hello — I'll let you know when the journal opens." | Removed. Intro pending; layout-only cards |
| Contact | "hello@nanditaspeaks.in" (unconfirmed address), "Send it off", "opens your email, already filled in", "Hit send and I'll be in touch." | Removed. Reuses approved Home/FAQ sentences; email hidden; label "Send Enquiry" per Brief |
| Privacy Policy | page does not exist | Layout only; text to be supplied |
| 404 | unknown routes render Home | New page; functional wording for approval |
