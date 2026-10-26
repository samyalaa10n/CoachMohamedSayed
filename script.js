/* ============ CONFIG — edit only this block ============ */
const CFG = {
  whatsapp: "+201113987824", // country code + number, digits only
  facebook: "https://www.facebook.com/mohamed.sayed.424977", // placeholder
  instagram: "https://www.instagram.com/mohamed_sayed_ms00", // placeholder
  gym: { name: "Gym H2O", url: "https://example.com/" }, // placeholder
  images: { coach: "images/Background.png" }, // e.g. "images/coach.jpg"
  stats: [
    // placeholders – change n, suffix and labels
    { n: 500, s: "+", ar: "عملاء", en: "Clients" },
    { n: 10, s: "K+", ar: "زوار الموقع", en: "Website Visitors" },
    { n: 300, s: "+", ar: "متدربين", en: "Trainees" },
    { n: 7, s: "+", ar: "سنوات خبرة", en: "Years Experience" },
    { n: 6, s: "", ar: "بطولات دولية", en: "Competitions" },
  ],
  plans: [
    {
      id: "BASIC",
      ar: "الأساسية",
      en: "Basic",
      price: "— EGP",
      pop: false,
      f: [
        ["خطة تدريب مخصصة", "Customized workout plan"],
        ["متابعة أساسية", "Basic follow-up"],
        ["توجيه تدريبي", "Training guidance"],
      ],
    },
    {
      id: "STANDARD",
      ar: "القياسية",
      en: "Standard",
      price: "— EGP",
      pop: true,
      f: [
        ["خطة تدريب مخصصة", "Customized workout plan"],
        ["متابعة منتظمة", "Regular follow-up"],
        ["تتبّع التقدم", "Progress tracking"],
        ["دعم من الكابتن", "Coaching support"],
      ],
    },
    {
      id: "PREMIUM",
      ar: "المميزة",
      en: "Premium",
      price: "— EGP",
      pop: false,
      f: [
        ["تدريب مخصص بالكامل", "Fully personalized coaching"],
        ["خطة تدريب", "Training plan"],
        ["إرشادات تغذية", "Nutrition guidance"],
        ["تتبّع التقدم", "Progress tracking"],
        ["تواصل مباشر مع الكابتن", "Direct coach communication"],
      ],
    },
  ],
  certs: [
    {
      img: "",
      ar: "شهادة التدريب من Gold’s Academy",
      en: "Gold’s Academy Training Certification",
      da: "شهادة معتمدة في التدريب.",
      de: "Accredited training certification.",
    },
    {
      img: "images/Certifications/ISSA.jpeg",
      ar: "CPT – ISSA",
      en: "CPT – ISSA",
      da: "شهادة مدرب شخصي (CPT) من ISSA.",
      de: "Certified Personal Trainer (CPT) from ISSA.",
    },
    {
      img: "",
      ar: "شهادة CPR",
      en: "CPR Certification",
      da: "شهادة الإنعاش القلبي الرئوي.",
      de: "Cardiopulmonary resuscitation certification.",
    },
  ],
  achievements: [
    {
      i: "🏆",
      first: 1,
      img: "",
      ar: "المركز الأول – بطولة حورس",
      en: "1st Place – Horus Championship",
    },
    {
      i: "🏆",
      first: 1,
      img: "",
      ar: "المركز الأول – شلبي كلاسيك",
      en: "1st Place – Shalaby Classic",
    },
    {
      i: "🏅",
      img: "",
      ar: "6 بطولات دولية",
      en: "6 International Competitions",
    },
    { i: "🏅", img: "", ar: "بطولة أحمد علي", en: "Ahmed Ali Championship" },
    { i: "🏅", img: "", ar: "بطولة Iron Man", en: "Iron Man Championship" },
  ],
  clients: [
    // add real entries: {name,goal,duration,before:"img",after:"img"} (ar/en text per field)
    {
      name: ["محمد", "mohamed"],
      goal: ["الهدف", "Goal"],
      dur: ["3 شهور", "3 Month"],
      before: "images/Clints/C_1_1.jpeg",
      after: "images/Clints/C_1_2.jpeg",
    },
    {
      name: ["اسلام", "islam"],
      goal: ["الهدف", "Goal"],
      dur: ["3 شهور", "3 Month"],
      before: "images/Clints/C_2_1.jpg",
      after: "images/Clints/C_2_2.jpg",
    },
    {
      name: ["احمد", "ahmed"],
      goal: ["الهدف", "Goal"],
      dur: ["مدة التدريب", "Training Duration"],
      before: "images/Clints/C_3_1.jpg",
      after: "images/Clints/C_3_2.jpg",
    },
    {
      name: ["منصور", "mansor"],
      goal: ["الهدف", "Goal"],
      dur: ["مدة التدريب", "Training Duration"],
      before: "images/Clints/C_4_1.jpg",
      after: "images/Clints/C_4_2.jpg",
    },
  ],
};
/* ======================================================== */
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const SV = {
  wa: '<svg viewBox="0 0 24 24"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5z"/></svg>',
  fb: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
  ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
  gym: '<svg viewBox="0 0 24 24"><path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/></svg>',
};
const wa = (t) =>
  `https://wa.me/${CFG.whatsapp}${t ? "?text=" + encodeURIComponent(t) : ""}`;
const E = (a, b) => `data-ar="${a}" data-en="${b}"`;
let L = "en",
  plan = "";
const ph = (img, label) =>
  `<div class="ph lb" data-ph="${label}">${img ? `<img src="${img}" alt="${label}" loading="lazy">` : label}</div>`;

/* render */
$("#lk").innerHTML = [
  ["home", "الرئيسية", "Home"],
  ["about", "عن المدرب", "About"],
  ["achievements", "الإنجازات", "Achievements"],
  ["certs", "الشهادات", "Certifications"],
  ["services", "الخدمات", "Services"],
  ["clients", "المتدربين", "Clients"],
  ["pricing", "الأسعار", "Pricing"],
  ["contact", "تواصل معنا", "Contact"],
]
  .map((x) => `<a href="#${x[0]}" ${E(x[1], x[2])}></a>`)
  .join("");
$("#ach").innerHTML = CFG.achievements
  .map(
    (a) =>
      `<div class="card rv ${a.first ? "first" : ""}">${ph(a.img, "Photo")}<div class="ic">${a.i}</div><h3 ${E(a.ar, a.en)}></h3></div>`,
  )
  .join("");
$("#cert").innerHTML = CFG.certs
  .map(
    (c) =>
      `<div class="card rv">${ph(c.img, "Certificate")}<h3 ${E(c.ar, c.en)}></h3><p ${E(c.da, c.de)}></p></div>`,
  )
  .join("");
const SV_ = [
  [
    "🏋️",
    "التدريب الشخصي",
    "Personal Training",
    "تدريب مخصص حسب هدف المتدرب ومستواه وخبرته.",
    "Personalized training based on the client’s goals, fitness level, and experience.",
    "Personal Training",
  ],
  [
    "💻",
    "التدريب أونلاين",
    "Online Coaching",
    "تدريب عن بُعد مع توجيه ومتابعة مخصصة.",
    "Remote coaching with personalized training guidance and follow-up.",
    "Online Coaching",
  ],
  [
    "📋",
    "خطة تمرين مخصصة",
    "Customized Workout Plan",
    "خطة تمرين مصممة وفق أهداف المتدرب الفردية.",
    "A workout plan designed according to the client’s individual goals.",
    "Customized Workout Plan",
  ],
  [
    "🥗",
    "إرشادات التغذية",
    "Nutrition Guidance",
    "إرشادات تغذية عامة لدعم أهداف اللياقة وتكوين الجسم.",
    "General nutrition guidance to support fitness and body-composition goals.",
    "Nutrition Guidance",
  ],
  [
    "🏆",
    "الاستعداد للبطولات",
    "Competition Preparation",
    "تحضير تدريبي متخصص للاعبين المستعدين لبطولات اللياقة وكمال الأجسام.",
    "Specialized training preparation for athletes preparing for fitness/bodybuilding competitions.",
    "Competition Preparation",
  ],
];
$("#svc").innerHTML = SV_.map(
  (s) =>
    `<div class="card rv"><div class="ic">${s[0]}</div><h3 ${E(s[1], s[2])}></h3><p ${E(s[3], s[4])}></p></div>`,
).join("");

// في script.js: استبدل تعريف CC القديم كله بالكود ده
const tp = (img, en, ar, k) =>
  `<div class="ph lb" data-ph="${en}">${img ? `<img src="${img}" alt="${en}" loading="lazy">` : "Photo"}<em class="tg ${k}" ${E(ar, en)}></em></div>`;
const CC = (c) =>
  `<div class="card rv"><div class="ba">${tp(c.before, "Before", "قبل", "bf")}${tp(c.after, "After", "بعد", "af")}</div><div class="meta"><b ${E(c.name[0], c.name[1])}></b><br><span ${E(c.dur[0], c.dur[1])}></span></div></div>`;

$("#cl").innerHTML = CFG.clients.slice(0, 3).map(CC).join(""); // home page shows first 3
let shown = 0;
const PER = 9; // transformations page: 9 per "Load More"
function more() {
  const p = CFG.clients.slice(shown, shown + PER);
  shown += p.length;
  $("#cl2").insertAdjacentHTML(
    "beforeend",
    p.map((c) => CC(c).replace("card rv", "card rv v")).join(""),
  );
  $("#more").style.display = shown < CFG.clients.length ? "" : "none";
  setLang(L);
}
$("#more").onclick = more;
more();
$("#stg").innerHTML = CFG.stats
  .map(
    (s) =>
      `<div class="st rv"><div class="num"><span data-n="${s.n}">0</span>${s.s}</div><span ${E(s.ar, s.en)}></span></div>`,
  )
  .join("");
$("#pg").innerHTML = CFG.plans
  .map(
    (p) =>
      `<div class="card pr rv ${p.pop ? "pop" : ""}">${p.pop ? `<div class="bd" ${E("الأكثر طلبًا", "Most Popular")}></div>` : ""}<h3 ${E(p.ar, p.en)}></h3><div class="price">${p.price}</div><ul>${p.f.map((f) => `<li ${E(f[0], f[1])}></li>`).join("")}</ul><a href="#subscribe" class="btn ${p.pop ? "pri" : ""}" data-pick="${p.id}" ${E("اشترك الآن", "Subscribe Now")}></a></div>`,
  )
  .join("");
const G = [
  ["Fat Loss", "خسارة الدهون"],
  ["Muscle Gain", "زيادة الكتلة العضلية"],
  ["Weight Gain", "زيادة الوزن"],
  ["Improve Fitness", "تحسين اللياقة البدنية"],
  ["Competition Preparation", "الاستعداد للبطولات"],
  ["Other", "هدف آخر"],
];
const P = [
  ["No previous experience", "لا توجد خبرة سابقة"],
  ["Less than 3 months", "أقل من 3 شهور"],
  ["3–6 months", "من 3 إلى 6 شهور"],
  ["6–12 months", "من 6 إلى 12 شهر"],
  ["More than 1 year", "أكثر من سنة"],
];
const opt = (a) => a.map((x) => `<option ${E(x[1], x[0])}></option>`).join("");
$("#gl").innerHTML = opt(G);
$("#pt").innerHTML = opt(P);
$("#soc").innerHTML = [
  ["wa", "WhatsApp", wa("")],
  ["fb", "Facebook", CFG.facebook],
  ["ig", "Instagram", CFG.instagram],
]
  .map(
    (x) =>
      `<a href="${x[2]}" target="_blank" rel="noopener">${SV[x[0]]}${x[1]}</a>`,
  )
  .join("");
$$("[data-k]").forEach(
  (a) =>
    (a.href = { wa: wa(""), fb: CFG.facebook, ig: CFG.instagram }[a.dataset.k]),
);
$("#fwa").href = wa("");
if (CFG.images.coach)
  $("#coachImg").innerHTML =
    `<img src="${CFG.images.coach}" alt="Coach Mohamed Sayed" loading="lazy">`;
else $("#coachImg").textContent = "Coach photo";
$("#pts").innerHTML = Array.from(
  { length: 14 },
  () =>
    `<i class="pt" style="left:${Math.random() * 100}%;bottom:-10px;animation-duration:${9 + Math.random() * 10}s;animation-delay:-${Math.random() * 12}s"></i>`,
).join("");

/* language */
function setLang(l) {
  L = l;
  const d = document.documentElement;
  d.lang = l;
  d.dir = l === "ar" ? "rtl" : "ltr";
  $$("[data-ar]").forEach((e) => (e.innerHTML = e.dataset[l]));
  $$(".lang button").forEach((b) =>
    b.classList.toggle("on", b.dataset.l === l),
  );
  document.title =
    l === "ar"
      ? "كابتن محمد سيد | Personal Trainer ومدرب أونلاين"
      : "Coach Mohamed Sayed | Personal Trainer & Online Fitness Coaching";
  showSel();
}
$$(".lang button").forEach((b) => (b.onclick = () => setLang(b.dataset.l)));

/* plan / service selection */
function showSel() {
  const s = $("#sel");
  if (!plan) {
    s.classList.remove("o");
    return;
  }
  s.classList.add("o");
  const p = CFG.plans.find((x) => x.id === plan);
  const n = p ? (L === "ar" ? p.ar : p.en) : plan;
  s.textContent = (L === "ar" ? "الاختيار: " : "Selected: ") + n;
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-pick]");
  if (a) {
    plan = a.dataset.pick;

    showSel();
  }
  const h = e.target.closest(".links a");
  if (h) closeM();
  const b = e.target.closest(".lb");
  if (b && b.classList.contains("ph")) {
    const i = b.querySelector("img");
    $("#lbc").innerHTML = i ? `<img src="${i.src}" alt="">` : b.dataset.ph;
    $("#lb").classList.add("o");
  }
});
$("#lb").onclick = () => $("#lb").classList.remove("o");
document.onkeydown = (e) => {
  if (e.key === "Escape") $("#lb").classList.remove("o");
};

/* form */
$$("input[name=ch],input[name=sg]").forEach(
  (r) =>
    (r.onchange = () =>
      $("#det").classList.toggle(
        "o",
        $("input[name=ch]:checked").value === "1" ||
          $("input[name=sg]:checked").value === "1",
      )),
);
$("#fm").onsubmit = (e) => {
  e.preventDefault();
  let ok = 1;
  const ar = L === "ar";
  const nm = $("#nm").value.trim(),
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
        : "No";
  const g = $("#gl"),
    p = $("#pt"),
    pl = CFG.plans.find((x) => x.id === plan),
    pn = plan ? (pl ? (ar ? pl.ar : pl.en) : plan) : "-";
  const dt = $("#dt").value.trim() || "-",
    nt = $("#nt").value.trim() || "-";
  const m = ar
    ? `مرحبًا كابتن محمد سيد،\n\nأرغب في الاشتراك في برنامج التدريب.\n\nالاسم: ${nm}\nالعمر: ${ag}\n\nالهدف من التدريب:\n${g.selectedOptions[0].textContent}\n\nالتاريخ المرضي:\nمرض مزمن: ${yn("ch")}\nعملية جراحية سابقة: ${yn("sg")}\nالتفاصيل: ${dt}\n\nفترة التدريب السابقة:\n${p.selectedOptions[0].textContent}\n\nالملاحظات:\n${nt}\n\nالخطة المختارة:\n${pn}\n\nأرغب في معرفة تفاصيل الاشتراك والخطوة التالية.`
    : `Hello Coach Mohamed Sayed,\n\nI would like to subscribe to your coaching program.\n\nName: ${nm}\nAge: ${ag}\n\nTraining Goal:\n${g.selectedOptions[0].textContent}\n\nMedical History:\nChronic Disease: ${yn("ch")}\nPrevious Surgery: ${yn("sg")}\nDetails: ${dt}\n\nPrevious Training:\n${p.selectedOptions[0].textContent}\n\nNotes:\n${nt}\n\nSelected Plan:\n${pn}\n\nI would like to know more about the next steps.`;
  window.open(wa(m), "_blank", "noopener");
};

/* nav / scroll */
const nv = $("#nv"),
  bg = $("#bg"),
  lk = $("#lk");
function closeM() {
  lk.classList.remove("o");
  bg.classList.remove("o");
}
bg.onclick = () => {
  lk.classList.toggle("o");
  bg.classList.toggle("o");
};
addEventListener(
  "scroll",
  () => {
    nv.classList.toggle("s", scrollY > 40);
    $("#home .bl").style.transform = `translate3d(0,${scrollY * 0.15}px,0)`;
  },
  { passive: true },
);
const secs = $$("header[id],section[id]");
new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        $$(".links a").forEach((a) =>
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
).observe &&
  secs.forEach((s) =>
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting)
            $$(".links a").forEach((a) =>
              a.classList.toggle(
                "on",
                a.getAttribute("href") === "#" + e.target.id,
              ),
            );
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    ).observe(s),
  );
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("v");
      e.target.querySelectorAll("[data-n]").forEach((c) => {
        const t = +c.dataset.n,
          t0 = performance.now();
        (function f(n) {
          const k = Math.min((n - t0) / 1400, 1);
          c.textContent = Math.round(t * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(f);
        })(t0);
      });
      io.unobserve(e.target);
    }),
  { threshold: 0.15 },
);
$$(".rv").forEach((e, i) => {
  e.style.transitionDelay = (i % 3) * 90 + "ms";
  io.observe(e);
});
setLang("en");
function route() {
  const h = location.hash.slice(1),
    t = h === "transformations";
  document.body.classList.toggle("tp", t);
  if (t) scrollTo(0, 0);
  else if (h) {
    const el = document.getElementById(h);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  } else scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
addEventListener("load", () =>
  setTimeout(() => $("#ld").classList.add("x"), 350),
);
