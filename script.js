"use strict";

const CAPS = [
  ["01", "OBJECT-CENTRIC ONTOLOGY", "Typed, field-configurable schema for every object. Live fallback + /ontology, no locked-in models.", "ontology"],
  ["02", "ENTITY RESOLUTION", "Score and merge duplicates with a full inversion snapshot. Unmerge safely, identity stays one object not ten rows.", "resolution"],
  ["03", "QSEARCH SPOTLIGHT", "One big spotlight replaces 21 cramped search boxes. Facets, threat chips, and entity pickers over the same /entities engine.", "search"],
  ["04", "FACETED SEARCH + GEO FILTERS", "Cross-cut by type, facet, tag, threat, project, bbox and radius (haversine). List or pivot straight to the map.", "search"],
  ["05", "LINK-ANALYSIS EXPLORER", "LOD graph: overview supernodes → drill → local BFS (depth 3) → bidirectional path. Cytoscape card nodes, 10k cap, clearance-gated.", "explorer"],
  ["06", "GLOBE + PATTERN-OF-LIFE", "Leaflet map with clusters, heat, trails, relations, radius & measure, locate, CSV export. Online OSM → offline mbtiles → grid. 500-track replay with scrub.", "geo"],
  ["07", "WORKFLOW 2.0 BUILDER", "Visual trigger → condition/fork → effect graphs with loop/join/subgraph/agent nodes. Checkpointed, pausable, undoable. Cron + event triggers.", "workflow"],
  ["08", "PZZ3m REASONING AGENT ZOR", "Tool-using agent with SSE streaming, reasoning tokens, permission round-trips (120s), transcript compaction, stop/resume/edit/undo.", "agent"],
  ["09", "RISK ASSESSMENT", "Two-wave LLM intel center: deterministic extraction (temp 0) then per-flag read-only verify. Budget-aware, 100-run history.", "risk"],
  ["10", "ALERTS + NEURAL PROPOSALS", "Alert engine fires async. Neural proposes a closed-enum resolution; human approves → workflow effect executes. Audited.", "alerts"],
  ["11", "WATCHLISTS + SCORING", "Named entity sets with triage view (needs-attention/high/critical), change feed, stats. Heuristic scoring bulk/single.", "watchlists"],
  ["12", "PIPELINES + INGEST", "Webhook / incremental / scheduled ETL. Watermark, 1 req/s Nominatim geocode, raw source kept in source_documents for provenance.", "pipelines"],
  ["13", "CASES + REPORTS", "Group evidence into cases. Scoped report templates → runs → CSV/HTML export + Neural executive narrative. Scheduler baked in.", "reports"],
  ["14", "TIMELINE + COLLAB", "One cross-object event stream (recordEvent). Team Log, entity notes, subscriptions. Every write lands on the same timeline.", "timeline"],
  ["15", "PROJECTS + PBAC + AUDIT", "Everything scoped to projects. Read-gated by clearanceGate (open→secret), writes above clearance refused. Full admin audit trail.", "security"],
  ["16", "PLUGINS", "Admin {manifest, code} rows → blob ES-module import (CSP-safe), allowlisted Madar sandbox, hook bus (entity:opened, tab:switched…). ~500 LOC.", "plugins"],
  ["17", "OFFLINE + AIR-GAPPED", "Offline mbtiles (tilemaker + Geofabrik) with online→mbtiles→grid fallback. Ed25519 license gate (seats, expiry, rollback detector). Factory reset.", "security"],
  ["18", "PORTABLE ORG (.PZM)", "Export/import the whole tenancy as one streaming .pzm session with chunked 50k rows, one TX, ID remap inside JSONB, secrets redacted.", "reports"],
  ["19", "SCALE ARCHITECTURE", "The entity store is partitioned by shard. Events and documents live in a columnar archive, traversal in an in-memory graph, and face vectors in a dedicated store, all rebuilt from Postgres, which stays the source of truth.", "scale"],
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
