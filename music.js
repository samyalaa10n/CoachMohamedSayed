/* =====================================================================
   music.js — background music + mute button (load it last, after the other scripts)
   ===================================================================== */

/* ============ MUSIC CONFIG — edit only this block ============ */
const MUSIC = {
  src: "audio/intro.mp3", // path to your song (put the file in an "audio" folder)
  volume: 0.4,           // 0 → 1
  loop: true,
};
/* ============================================================= */

(function () {
  const KEY = "ms_music_muted";
  const store = {
    get() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } },
    set(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {} },
  };

  const a = new Audio(MUSIC.src);
  a.loop = MUSIC.loop;
  a.volume = MUSIC.volume;
  a.preload = "auto";
  let muted = store.get();
  a.muted = muted;

  /* ---- button + styles ---- */
  const st = document.createElement("style");
  st.textContent = `
  #mus{position:fixed;bottom:calc(20px + env(safe-area-inset-bottom,0px));inset-inline-start:20px;z-index:65;width:50px;height:50px;border-radius:50%;border:1px solid var(--ln);background:var(--card);cursor:pointer;display:grid;place-items:center;padding:0;transition:transform .25s,border-color .25s,box-shadow .25s}
  #mus:hover{transform:translateY(-3px);border-color:var(--ac);box-shadow:0 0 22px rgba(255,77,28,.3)}
  #mus:active{transform:scale(.94)}
  #mus .eq{display:flex;align-items:flex-end;gap:3px;height:18px}
  #mus .eq i{width:3px;background:var(--ac);border-radius:2px;height:30%;animation:eq 1s ease-in-out infinite}
  #mus .eq i:nth-child(2){animation-delay:.2s}#mus .eq i:nth-child(3){animation-delay:.4s}#mus .eq i:nth-child(4){animation-delay:.1s}
  @keyframes eq{50%{height:100%}}
  #mus svg{display:none;width:22px;height:22px;fill:none;stroke:var(--mut);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  #mus.off .eq{display:none}#mus.off svg{display:block}
  #mus.hint{animation:mh 2s ease-in-out infinite}
  @keyframes mh{50%{box-shadow:0 0 0 8px rgba(255,77,28,.18)}}`;
  document.head.appendChild(st);

  const b = document.createElement("button");
  b.id = "mus";
  b.type = "button";
  b.innerHTML =
    '<span class="eq"><i></i><i></i><i></i><i></i></span>' +
    '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  document.body.appendChild(b);

  let locked = false; // browser blocked sound: playing silently until the first tap

  function ui() {
    const ar = document.documentElement.lang === "ar";
    const audible = !a.paused && !muted && !locked;
    b.classList.toggle("off", !audible);
    b.classList.toggle("hint", !muted && (locked || a.paused)); // gently invite a tap
    b.setAttribute("aria-label", muted ? (ar ? "تشغيل الصوت" : "Unmute music") : locked ? (ar ? "تشغيل الصوت" : "Turn sound on") : (ar ? "كتم الصوت" : "Mute music"));
    b.title = b.getAttribute("aria-label");
  }
  new MutationObserver(ui).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  a.addEventListener("play", ui);
  a.addEventListener("pause", ui);

  function play() { return a.play().then(ui).catch(ui); }

  a.addEventListener("error", () => console.error("music.js: cannot load the audio file ->", MUSIC.src));

  function unlock() { // called from a real user gesture: turn the sound on
    if (muted) { locked = false; ui(); return Promise.resolve(); }
    a.muted = false;
    return a.play().then(() => { locked = false; ui(); }).catch(() => { a.muted = true; ui(); }); // not allowed yet: keep waiting
  }

  b.addEventListener("click", () => {
    if (locked) { muted = false; store.set(false); unlock(); return; }
    muted = !muted;
    a.muted = muted;
    store.set(muted);
    if (!muted && a.paused) play();
    ui();
  });

  /* ---- autoplay ----
     1) try with sound; 2) if blocked, start MUTED (allowed) and switch the sound on
     at the first REAL gesture. Only click / touchend / pointerup / keydown count on
     phones (touchstart / pointerdown / scroll do not), and we keep listening until it works. */
  if (!muted) {
    a.play().then(ui).catch(() => {
      locked = true;
      a.muted = true;
      a.play().then(ui).catch(ui);
      const evs = ["click", "touchend", "pointerup", "keydown"];
      const go = (e) => {
        if (e.target && e.target.closest && e.target.closest("#mus")) return; // the button handles itself
        unlock().then(() => { if (!locked) evs.forEach((n) => removeEventListener(n, go)); });
      };
      evs.forEach((n) => addEventListener(n, go, { passive: true }));
      ui();
    });
  }

  /* pause when the tab is hidden, resume when back */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) a.pause();
    else if (!muted && !locked && a.currentTime > 0) play();
  });

  ui();
})();