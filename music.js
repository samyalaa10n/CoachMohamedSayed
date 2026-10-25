/* =====================================================================
   music.js — background music + mute button (load it last, after the other scripts)
   ===================================================================== */

/* ============ MUSIC CONFIG — edit only this block ============ */
const MUSIC = {
  src: "audio/intro.mp3", // path to your song (put the file in an "audio" folder)
  volume: 0.4,           // 0 → 1
  loop: true,
  splash: true,          // welcome screen with an "Enter" button (the click starts the music)
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
  if (!muted && !MUSIC.splash) {
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

  /* ---- welcome screen: the "Enter" click is the gesture that starts the music ---- */
  if (MUSIC.splash) {
    const css = document.createElement("style");
    css.textContent = `
    #spl{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:24px;text-align:center;background:radial-gradient(700px 420px at 50% 35%,rgba(255,77,28,.22),transparent 65%),#0a0a0b;transition:opacity .6s,transform .6s,visibility .6s}
    #spl.x{opacity:0;visibility:hidden;transform:scale(1.06)}
    #spl .sp-i{max-width:420px;animation:spin .8s cubic-bezier(.2,.8,.2,1) both}
    @keyframes spin{from{opacity:0;transform:translateY(24px)}}
    #spl .sp-l{width:150px;height:auto;margin:0 auto 18px;display:block}
    #spl .sp-n{font-weight:800;font-size:1.6rem;line-height:1.2}
    #spl .sp-e{color:var(--mut);letter-spacing:.14em;font-size:.8rem;text-transform:uppercase;margin:4px 0}
    #spl .sp-t{color:var(--mut);margin:20px 0 24px;font-size:.95rem;line-height:1.8}
    #spl .sp-go{width:100%;animation:spg 2.2s ease-in-out infinite}
    @keyframes spg{50%{box-shadow:0 0 0 10px rgba(255,77,28,.16),0 8px 30px rgba(255,77,28,.45)}}
    #spl .sp-no{background:none;border:0;color:var(--mut);margin-top:16px;padding:10px;font:inherit;font-size:.88rem;cursor:pointer;text-decoration:underline;text-underline-offset:4px}
    #spl .sp-no:hover{color:var(--tx)}`;
    document.head.appendChild(css);

    const sp = document.createElement("div");
    sp.id = "spl";
    sp.setAttribute("role", "dialog");
    sp.setAttribute("aria-label", "Welcome");
    sp.innerHTML = `<div class="sp-i">
      <svg class="sp-l" viewBox="0 0 235 120" aria-hidden="true"><polygon fill="#f5f5f4" points="10,110 10,10 34,10 60,62 86,10 110,10 110,110 88,110 88,48 66,92 54,92 32,48 32,110"/><path d="M210 21H150L136 35V46L150 60H198L212 74V85L198 99H136" fill="none" stroke="#ff4d1c" stroke-width="22"/></svg>
      <div class="sp-n">كابتن محمد سيد</div>
      <div class="sp-e">Coach Mohamed Sayed</div>
      <button type="button" class="btn pri sp-go">لنبدأ</button><br>
    </div>`;
    document.body.appendChild(sp);
    document.documentElement.style.overflow = "hidden";

    const esc = (e) => { if (e.key === "Escape") enter(false); };
    function enter(withSound) {
      muted = !withSound;
      store.set(muted);
      a.muted = muted;
      if (withSound) play(); // runs inside the click = allowed on every browser
      document.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
      sp.classList.add("x");
      setTimeout(() => sp.remove(), 700);
      ui();
    }
    sp.querySelector(".sp-go").addEventListener("click", () => enter(true));
    sp.querySelector(".sp-no").addEventListener("click", () => enter(false));
    document.addEventListener("keydown", esc);
    sp.querySelector(".sp-go").focus({ preventScroll: true });
  }

  /* pause when the tab is hidden, resume when back */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) a.pause();
    else if (!muted && !locked && a.currentTime > 0) play();
  });

  ui();
})();