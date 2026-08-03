"use strict";

const CAPS = [
  ["01", "OBJECT-CENTRIC ONTOLOGY", "A typed, field-configurable schema for every object: entities, relationships, sources, events. No locked-in models, no rigid tables.", "ontology"],
  ["02", "ENTITY RESOLUTION", "Score and merge duplicates with a full inversion snapshot. Unmerge safely. Identity stays one object, not ten rows.", "resolution"],
  ["03", "FACETED SEARCH", "Cross-cut every type by facets, classification and geography. List, or pivot straight to the map.", "search"],
  ["04", "GEO + TEMPORAL REPLAY", "Coordinates live in metadata. Pattern-of-life replay across time. Scrub the slider and follow the trail.", "geo"],
  ["05", "CROSS-OBJECT TIMELINE", "Every write, alert and merge lands on one event stream. Every object answers against the same timeline.", "timeline"],
  ["06", "AUTOMATED WORKFLOW", "TASTUR rule engine fires on events as fire-and-forget, never blocking a response. Alerts land before the shift changes.", "workflow"],
  ["07", "PZZ3 REASONING AGENT", "A tool-using agent that reads your graph, scores entities and drafts intel, with every write behind a permission round-trip.", "agent"],
  ["08", "RISK ASSESSMENT", "Two-wave LLM intel center. Deterministic extraction, verified flags, confidence you can brief.", "risk"],
  ["09", "CASES + REPORTS", "Group evidence into cases, ship scoped report runs to CSV or HTML, schedule the recurring ones.", "reports"],
  ["10", "COLLABORATION", "Org-wide team log, entity notes, subscriptions and notifications. The picture gets built by more than one desk.", "collab"],
  ["11", "PROJECTS + PBAC", "Everything hangs off projects. Read-gated at the query, writes above your clearance refused.", "security"],
  ["12", "FULL AUDIT", "Every action recorded, every export redacted, secrets at rest under AES-256-GCM.", "security"]
];

function capHtml(c) {
  return (
    '<div class="pb-card reveal-up">' +
    '<div class="pb-card-top">' +
    '<span class="pb-num">' + c[0] + " / " + c[4] + "</span>" +
    "</div>" +
    '<div class="pb-card-title">' + c[1] + "</div>" +
    '<div class="pb-card-desc">' + c[2] + "</div>" +
    "</div>"
  );
}

document.getElementById("capGrid").innerHTML = CAPS.map(capHtml).join("");

const hd = document.querySelector(".hd");
const hero = document.getElementById("hero");
let heroBottom = 0;
function measureHero() { heroBottom = hero.offsetTop + hero.offsetHeight; }
function navOnScroll() { hd.classList.toggle("visible", window.scrollY > heroBottom); }
measureHero();
navOnScroll();
window.addEventListener("scroll", navOnScroll, { passive: true });
window.addEventListener("resize", measureHero);

const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up").forEach(function (el) {
  io.observe(el);
});

const spCount = document.getElementById("spCount");
const TARGET = 21000000;
const cio = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / 1800, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      spCount.textContent = Math.round(TARGET * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cio.unobserve(e.target);
  });
}, { threshold: 0.4 });
cio.observe(spCount);

const modal = document.getElementById("modal");
document.querySelectorAll(".js-modal").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.hidden = false;
  });
});
modal.addEventListener("click", function (e) {
  if (e.target.closest("[data-close]")) modal.hidden = true;
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") modal.hidden = true;
});
