/* =====================================================================
   pricing-flow.js — load AFTER script.js
   Plans → animated selection → duration → summary → form → WhatsApp
   ===================================================================== */

/*
   الاساسيه :
٣ شهور١٥٠٠ج
٦ شهور٣٠٠٠ج
٩شهور٤٥٠٠ج
١٢ شهر٦٠٠٠ج
القياسيه :
٣ شهور ٢٥٠٠ج
٦ شهور٤٠٠٠ج
٩ شهور٥٥٠٠ج
١٢ شهر٧٠٠٠ج
المميزه :
٣شهور٤٠٠٠ج
٦ شهور٦٥٠٠ج
٩ شهور٨٠٠٠ج
١٢ شهر٩٥٠٠ج
   
   */

/* ============ PRICING CONFIG — edit only this block ============
   prices: put a number (e.g. 3: 1500). null = shows "Price TBA".
   currency: shown after every price.                              */
CFG.currency = { ar: "ج.م", en: "EGP" };
CFG.durations = [3, 6, 9, 12]; // months
CFG.plans = [
  {
    id: "BASIC",
    ar: "الباقة الأساسية",
    en: "Basic",
    pop: false,
    da: "خطة واضحة ومتابعة أساسية للبداية.",
    de: "A clear plan with basic follow-up to get started.",
    prices: { 3: 1500, 6: 3000, 9: 4500, 12: 6000 },
    f: [
      ["خطة تدريب مخصصة", "Customized workout plan"],
      ["متابعة أساسية", "Basic follow-up"],
      ["توجيه تدريبي", "Training guidance"],
    ],
  },
  {
    id: "STANDARD",
    ar: "الباقة القياسية",
    en: "Standard",
    pop: true,
    da: "خطة مخصصة مع متابعة منتظمة وتتبّع للتقدم.",
    de: "A customized plan with regular follow-up and progress tracking.",
    prices: { 3: 2500, 6: 4000, 9: 5500,12: 7000 },
    f: [
      ["خطة تدريب مخصصة", "Customized workout plan"],
      ["متابعة منتظمة", "Regular follow-up"],
      ["تتبّع التقدم", "Progress tracking"],
      ["دعم من الكابتن", "Coaching support"],
    ],
  },
  {
    id: "PREMIUM",
    ar: "الباقة المميزة",
    en: "Premium",
    pop: false,
    da: "تدريب مخصص بالكامل مع تواصل مباشر مع الكابتن.",
    de: "Fully personalized coaching with direct coach communication.",
    prices: { 3: 4000, 6: 6500, 9: 8000,12: 9500 },
    f: [
      ["تدريب مخصص بالكامل", "Fully personalized coaching"],
      ["خطة تدريب", "Training plan"],
      ["إرشادات تغذية", "Nutrition guidance"],
      ["تتبّع التقدم", "Progress tracking"],
      ["تواصل مباشر مع الكابتن", "Direct coach communication"],
    ],
  },
];
/* ================================================================ */

// wa.me needs digits only (your config had a leading "+")
CFG.whatsapp = String(CFG.whatsapp).replace(/\D/g, "");

/* ---- state (language switching never touches it) ---- */
let PS = { plan: "", dur: 0 };
const planOf = () => CFG.plans.find((x) => x.id === PS.plan);
const dl = (d) => (L === "ar" ? d + " شهور" : d + " Months");
const fmt = (p) => {
  if (p == null || p === "") return L === "ar" ? "السعر قريبًا" : "Price TBA";
  const n = Number(p);
  return (isNaN(n) ? p : n.toLocaleString("en-US")) + " " + CFG.currency[L];
};
const rows = () => {
  const p = planOf(),
    a = L === "ar";
  if (!p) return "";
  const r = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
  let h = r(a ? "الباقة" : "Plan", a ? p.ar : p.en);
  if (PS.dur)
    h +=
      r(a ? "المدة" : "Duration", dl(PS.dur)) +
      r(a ? "السعر الإجمالي" : "Total Price", fmt(p.prices[PS.dur]));
  return h;
};

/* ---- summary at the top of the form (overrides showSel) ---- */
showSel = function () {
  const s = $("#sel");
  let h = rows();
  if (plan)
    h += `<div><span>${L === "ar" ? "الخدمة" : "Service"}</span><b>${plan}</b></div>`;
  s.innerHTML = h;
  s.classList.toggle("o", !!h);
};
function refresh() {
  $$("#pg [data-p]").forEach((e) => {
    const p = CFG.plans.find((x) => x.id === e.closest(".pr").dataset.id);
    e.textContent = fmt(p.prices[e.dataset.p]);
  });
  $$("#pg .sm").forEach((e) => (e.innerHTML = rows()));
  showSel();
}
const _sl = setLang;
setLang = function (l) {
  _sl(l);
  refresh();
};

/* ---- render the three plan cards ---- */
const pg = $("#pg");
pg.innerHTML = CFG.plans
  .map(
    (p) => `
<div class="card pr rv${p.pop ? " pop" : ""}" data-id="${p.id}">
  ${p.pop ? `<div class="bd" ${E("الأكثر طلبًا", "Most Popular")}></div>` : ""}
  <h3 ${E(p.ar, p.en)}></h3>
  <p ${E(p.da, p.de)}></p>
  <ul>${p.f.map((f) => `<li ${E(f[0], f[1])}></li>`).join("")}</ul>
  <button type="button" class="btn sub${p.pop ? " pri" : ""}" data-plan="${p.id}" ${E("اشترك الآن", "Subscribe Now")}></button>
  <div class="dp">
    <div class="dh" ${E("اختيار المدة", "Select Duration")}></div>
    ${CFG.durations.map((d) => `<button type="button" class="do" data-d="${d}"><span ${E(d + " شهور", d + " Months")}></span><b data-p="${d}"></b><i></i></button>`).join("")}
    <div class="sm"></div>
    <div class="ar2">
      <button type="button" class="btn" data-back ${E("رجوع", "Back")}></button>
      <button type="button" class="btn pri cont" ${E("متابعة", "Continue")}></button>
    </div>
  </div>
</div>`,
  )
  .join("");
$$("#pg .rv").forEach((e, i) => {
  e.style.transitionDelay = i * 90 + "ms";
  io.observe(e);
});

/* ---- animation helpers ---- */
const rm = matchMedia("(prefers-reduced-motion:reduce)");
function flip(c, change) {
  // card visibly travels from old spot to new spot
  const f = c.getBoundingClientRect();
  change();
  const l = c.getBoundingClientRect();
  c.style.transformOrigin = "0 0";
  c.style.transition = "none";
  c.style.transform = `translate(${f.left - l.left}px,${f.top - l.top}px) scale(${f.width / l.width})`;
  c.getBoundingClientRect();
  c.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1)";
  c.style.transform = "";
  setTimeout(() => {
    c.style.transition = "";
    c.style.transformOrigin = "";
  }, 650);
}
const mob = matchMedia("(max-width:900px)");
function focusCard(c, open) {
  // after the layout settles, scroll to the top of the card (phones) / center it (desktop)
  if (!mob.matches) {
    c.scrollIntoView({ block: "center", behavior: "smooth" });
    return;
  }
  setTimeout(
    () => {
      const t = open ? c : document.getElementById("pricing");
      scrollTo({
        top: Math.max(0, t.getBoundingClientRect().top + scrollY - 80),
        behavior: "smooth",
      });
    },
    rm.matches ? 0 : 680,
  );
}
function pick(id) {
  if (pg.classList.contains("foc")) return;
  const c = pg.querySelector(`[data-id=${id}]`),
    o = [...pg.children].filter((x) => x !== c),
    cr = c.getBoundingClientRect();
  PS = { plan: id, dur: 0 };
  o.forEach((x) => {
    // fade + shrink + slide away
    const r = x.getBoundingClientRect(),
      dx = r.left - cr.left,
      dy = r.top - cr.top;
    const mx = Math.abs(dx) > 5 ? Math.sign(dx) * 60 : 0,
      my = mx ? 0 : Math.sign(dy) * 50;
    x.style.transition = "opacity .4s ease,transform .45s ease";
    x.style.transitionDelay = "0s";
    x.style.opacity = "0";
    x.style.transform = `translate(${mx}px,${my}px) scale(.9)`;
    x.style.pointerEvents = "none";
  });
  setTimeout(
    () => {
      flip(c, () => {
        o.forEach((x) => x.classList.add("gone"));
        pg.classList.add("foc");
        c.classList.add("ex");
      });
      refresh();
      focusCard(c, true);
    },
    rm.matches ? 0 : 420,
  );
}
function back() {
  const c = pg.querySelector(".ex");
  if (!c) return;
  PS = { plan: "", dur: 0 };
  $$(".do.on").forEach((x) => x.classList.remove("on"));
  $$(".cont.show").forEach((x) => x.classList.remove("show"));
  const o = [...pg.children].filter((x) => x !== c);
  flip(c, () => {
    c.classList.remove("ex");
    pg.classList.remove("foc");
    o.forEach((x) => x.classList.remove("gone"));
  });
  requestAnimationFrame(() =>
    o.forEach((x) => {
      x.style.opacity = "";
      x.style.transform = "";
      x.style.pointerEvents = "";
    }),
  );
  setTimeout(
    () =>
      o.forEach((x) => {
        x.style.transition = "";
        x.style.transitionDelay = "";
      }),
    700,
  );
  refresh();
  focusCard(c, false);
}
document.addEventListener("click", (e) => {
  const t = e.target;
  let b;
  if ((b = t.closest("[data-plan]"))) pick(b.dataset.plan);
  else if ((b = t.closest(".do"))) {
    PS.dur = +b.dataset.d;
    $$(".do").forEach((x) => x.classList.toggle("on", x === b));
    b.closest(".pr").querySelector(".cont").classList.add("show");
    refresh();
  } else if (t.closest("[data-back]")) back();
  else if (t.closest(".cont") && PS.dur) {
    const s = $("#sel");
    $("#subscribe").scrollIntoView({ behavior: "smooth" });
    s.classList.remove("fl");
    void s.offsetWidth;
    s.classList.add("fl");
  }
});

/* ---- Daily Activity Level / Occupation field (independent of pricing) ---- */
const ACT = [
  ["Desk work (mostly sitting)", "عمل مكتبي (جلوس أغلب اليوم)"],
  ["Mostly standing", "وقوف أغلب اليوم"],
  ["Walking a lot", "مشي كثير خلال اليوم"],
  ["Moderate physical work", "عمل بدني متوسط"],
  ["Heavy physical work", "عمل بدني شاق"],
];
$("#gl").insertAdjacentHTML(
  "afterend",
  `<label for="act" ${E("مستوى النشاط اليومي / الوظيفة", "Daily Activity Level / Occupation")}></label>
   <select id="act">${ACT.map((x) => `<option ${E(x[1], x[0])}></option>`).join("")}</select>
   <label for="oc" ${E("الوظيفة وتفاصيل يومك (اختياري)", "Occupation & daily routine details (optional)")}></label>
   <input type="text" id="oc">`,
);

/* ---- WhatsApp submission (replaces the old handler) ---- */
$("#fm").onsubmit = (e) => {
  e.preventDefault();
  const ar = L === "ar",
    nm = $("#nm").value.trim(),
    ag = +$("#ag").value;
  $("#e_nm").textContent = nm ? "" : ar ? "الاسم مطلوب" : "Name is required";
  $("#e_ag").textContent =
    ag >= 10 && ag <= 90
      ? ""
      : ar
        ? "برجاء إدخال عمر صحيح"
        : "Please enter a valid age";
  if (!nm || !(ag >= 10 && ag <= 90)) return;
  const yn = (n) =>
      $(`input[name=${n}]:checked`).value === "1"
        ? ar
          ? "نعم"
          : "Yes"
        : ar
          ? "لا"
          : "No",
    tx = (s) => $(s).selectedOptions[0].textContent,
    v = (s) => $(s).value.trim() || "-",
    p = planOf(),
    pn = p ? (ar ? p.ar : p.en) : "-",
    du = PS.dur ? dl(PS.dur) : "-",
    pr = p && PS.dur ? fmt(p.prices[PS.dur]) : "-",
    sv = plan ? `\n${ar ? "الخدمة" : "Service"}: ${plan}` : "";
  const m = ar
    ? `مرحبًا كابتن محمد سيد،\n\nأرغب في الاشتراك في برنامج التدريب.\n\nالاسم: ${nm}\nالعمر: ${ag}\n\nالهدف من التدريب:\n${tx("#gl")}\n\nمستوى النشاط اليومي والوظيفة:\n${tx("#act")}\nتفاصيل: ${v("#oc")}\n\nالتاريخ المرضي:\nمرض مزمن: ${yn("ch")}\nعملية جراحية سابقة: ${yn("sg")}\nالتفاصيل: ${v("#dt")}\n\nفترة التدريب السابقة:\n${tx("#pt")}\n\nالملاحظات:\n${v("#nt")}\n\nالباقة المختارة: ${pn}\nمدة الاشتراك: ${du}\nالسعر: ${pr}${sv}\n\nأرغب في معرفة تفاصيل الاشتراك والخطوة التالية.`
    : `Hello Coach Mohamed Sayed,\n\nI would like to subscribe to your coaching program.\n\nName: ${nm}\nAge: ${ag}\n\nTraining Goal:\n${tx("#gl")}\n\nDaily Activity Level & Occupation:\n${tx("#act")}\nDetails: ${v("#oc")}\n\nMedical History:\nChronic Disease: ${yn("ch")}\nPrevious Surgery: ${yn("sg")}\nDetails: ${v("#dt")}\n\nPrevious Training:\n${tx("#pt")}\n\nNotes:\n${v("#nt")}\n\nSelected Plan: ${pn}\nDuration: ${du}\nPrice: ${pr}${sv}\n\nI would like to know more about the next steps.`;
  window.open(wa(m), "_blank", "noopener");
};

setLang(L); // translate the new elements + fill prices
