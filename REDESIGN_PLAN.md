# TheMobifixx — Redesign, revision 3

## Audit of revision 2 (rendered at 320–1440 px)
| Problem | Where | Why it reads as generic or AI-made |
|---|---|---|
| The same "rounded card + icon in a pale-blue square" block is used 5 times | Device tiles, services, how it works, why us, coverage | This is the single most recognisable AI-template pattern. Every section looks the same. |
| Every section repeats one formula: H2, grey subtitle, grid of cards | Whole home page | No hierarchy. Nothing tells the eye what matters. |
| The hero is a text column, four boxed stats and a dotted carousel side by side | Home | Boxed stat counters are a template trope, and they compete with the call-to-action buttons. |
| Too many sections (12), several of them thin | Home | Coverage, the CTA band and reviews each take a full screen on mobile but say little. |
| The footer repeats the map and runs 3 tall columns | Footer | Heavy, and the contact facts are hard to scan. |
| Icons are used as decoration | Service options, repair issues, promises | They add noise without adding meaning. |

## Constraint
The reference relies on commissioned photography. Real assets available here: 5 brand banners, 7 technician portraits, 8 workshop videos and phone product images. There is nothing for laptops, tablets or watches, so the layouts are built around the real people and workshop, not stock photos.

## Design system
- **Colour:** white, surface `#f4f6fb`, navy `#010818` (the logo background), brand blue `#2f49e6`, WhatsApp green on WhatsApp actions only.
- **Type:** Plus Jakarta Sans only. Sizes:

  | Element | Mobile | Desktop |
  |---|---|---|
  | H1 | 32/1.1, weight 800 | 56 |
  | H2 | 26/1.2, weight 800 | 40 |
  | H3 | 18/1.3, weight 700 | 18/1.3, weight 700 |
  | Body | 16/1.6 | 16/1.6 |
  | Small | 14 | 14 |

- **Grid:** 16 px gutters on mobile, 24 px from tablet up, max width 1200 px. Sections use `py-14` on mobile and `py-24` on desktop.
- **Buttons:** 48 px tall, 12 px radius, bold. Primary is blue, WhatsApp is green, secondary is outlined.
- **One pattern per job, never repeated:**

  | Pattern | Used once, for |
  |---|---|
  | Tiles | Devices |
  | Divided list | Services |
  | Numbered row | How it works |
  | Photo + checklist | Why us |
  | Chips | Common problems |
  | Swipe rows | Videos, people |
  | Accordion + contact panel | FAQ and contact |

## Home (11 sections → 8)
1. **Hero (navy, full bleed):** the brand banner sits edge to edge (it is navy too), with the H1, one sentence and WhatsApp + Call buttons. The facts become a slim strip underneath, not boxes.
2. **What can we repair?** Six plain device tiles, with no icon squares and no cards, plus "or pick the problem" chips.
3. **Services:** a heading column next to a divided list of 8 services with arrows.
4. **How it works:** 4 big numerals with a connecting line, no icons.
5. **Why TheMobifixx:** the founder's real photo next to a 6-point checklist.
6. **Inside the workshop:** a swipe row of real videos.
7. **Technicians:** a photo strip.
8. **FAQ + contact:** accordion on the left, a navy contact panel on the right with phone, WhatsApp, hours, address and areas covered. The review form folds in as one slim row above it.

## Footer
Four short columns: Brand · Services · Company (including policies) · Visit us (address, phone, email, hours). The disclaimer and copyright sit below. The map moves to the Contact page only.

## Inner pages
Remove the decorative icon squares (service options, repair issues). Lists become divided rows; the issue checklist keeps checkbox cards because they are the interaction itself.
