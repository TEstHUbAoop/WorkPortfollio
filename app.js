const ROLES = [
  {
    title: "Billing & Insurance Specialist (Remote)",
    org: "HealEx / Social Medicine International (SMI)",
    period: "2026 – Present",
    category: "healthcare",
    categoryLabel: "Healthcare & Billing",
    summary:
      "Manage Medicaid and commercial medical billing, clearinghouse enrollments, and denial resolution.",
    bullets: [
      "Manage Medicaid and commercial billing, EDI/ERA (835/EFT) enrollments, and claim denials in AdvancedMD and Change Healthcare/Optum.",
      "Redesigned the monthly Excel billing workbook and resolved a Google Apps Script sync bug in automated reporting.",
      "Authored the end-to-end AdvancedMD billing SOP covering scheduling, EDI submission, and unbilled claim rebilling."
    ]
  },
  {
    title: "Virtual Assistant (Remote, Contractual)",
    org: "Lab Testing Solutions (drugtestorder.com) · Client: RJ Employer Consulting",
    period: "Jul 2025 – Feb 2026",
    category: "healthcare",
    categoryLabel: "Healthcare & Billing",
    summary:
      "Managed operations and client support for a nationwide US drug and lab testing network (10,000+ collection sites).",
    bullets: [
      "Handled employer screening orders, legal/probation test inquiries, and billing concerns via portal and email.",
      "Resolved barcode issues and coordinated Quest & LabCorp lab network requests independently.",
      "Documented recurring workflows into clear SOPs from scratch with minimal handover."
    ]
  },
  {
    title: "Member Services / Insurance Verification Specialist (Anthem BCBS)",
    org: "Carelon Global Solutions",
    period: "Apr 2023 – Jun 2025",
    category: "healthcare",
    categoryLabel: "Healthcare & Billing",
    summary:
      "Frontline Anthem BCBS Member Services hotline handling up to 40 inbound US healthcare calls per day with zero HIPAA violations.",
    bullets: [
      "Explained claims processing, denials, copays, EOBs, and COB—and initiated internal appeals when members contested how a claim was processed or denied.",
      "Provided prior authorization updates (Availity, Evicore) and referral status checks, and called providers directly to confirm new-patient availability and resolve claims.",
      "Processed member premium payments and transferred members to the Marketplace when they needed lower-cost plan options, logging every interaction in Salesforce and Genesys Cloud.",
      "Earned multiple written commendations—members specifically called back to thank me by name."
    ]
  },
  {
    title: "Customer Service Representative (Telecommunications)",
    org: "Panasiatic Solutions",
    period: "Mar 2022 – Mar 2023",
    category: "operations",
    categoryLabel: "Operations & Admin",
    summary:
      "Supported US prepaid telecom clients across internet, cable, security, and home phone services.",
    bullets: [
      "Resolved account and billing inquiries while protecting sensitive customer data and consistently meeting QA/KPI targets."
    ]
  },
  {
    title: "Branch Manager / Branch Account Officer",
    org: "Danny's Hardware and Construction Supply",
    period: "Feb 2016 – Jan 2022",
    category: "operations",
    categoryLabel: "Operations & Admin",
    summary:
      "Directed daily branch operations, team supervision (8–10 staff), financial records, and supplier coordination.",
    bullets: [
      "Managed confidential financial records, payroll, inventory reporting, and vendor purchasing.",
      "Ran the branch independently whenever the owner was away, maintaining consistent operations."
    ]
  }
];

let activeFilter = "all";

function renderExperience() {
  const container = document.getElementById("experienceList");
  if (!container) return;

  const filtered =
    activeFilter === "all"
      ? ROLES
      : ROLES.filter((role) => role.category === activeFilter);

  container.innerHTML = filtered
    .map(
      (role, index) => `
        <article
          class="experience-card group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
          style="animation-delay: ${index * 45}ms"
        >
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  role.category === "healthcare"
                    ? "bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-600/20"
                    : "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20"
                }">
                  ${role.categoryLabel}
                </span>
                <span class="text-xs font-medium text-slate-500">${role.period}</span>
              </div>
              <h3 class="mt-2 text-lg font-bold text-slate-900">${role.title}</h3>
              <p class="text-sm font-medium text-teal-700">${role.org}</p>
            </div>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">${role.summary}</p>
          <ul class="mt-3.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 marker:text-teal-600">
            ${role.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("opacity-0", "translate-y-3");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-3");
  }, 2400);
}

function copyText(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(`${label} copied to clipboard`))
      .catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(`${label} copied to clipboard`);
  } catch {
    showToast("Copy failed — please copy manually");
  }
  document.body.removeChild(textarea);
}

function initFilterButtons() {
  const filterGroup = document.getElementById("filterGroup");
  if (!filterGroup) return;

  filterGroup.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    activeFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((button) => {
      const isActive = button.dataset.filter === activeFilter;
      button.classList.toggle("bg-teal-700", isActive);
      button.classList.toggle("text-white", isActive);
      button.classList.toggle("shadow-sm", isActive);
      button.classList.toggle("text-slate-600", !isActive);
    });

    renderExperience();
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isHidden));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  initFilterButtons();
  initMobileMenu();
  initScrollSpy();

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyPhoneBtn = document.getElementById("copyPhoneBtn");
  const printBtn = document.getElementById("printBtn");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () =>
      copyText("rickcabugnason21@gmail.com", "Email")
    );
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener("click", () =>
      copyText("+63 994 601 2923", "Phone number")
    );
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
