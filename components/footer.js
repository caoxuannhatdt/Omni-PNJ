/**
 * components/footer.js
 * Self-injecting standard footer — Omni-Growth Workspace
 * Appends footer HTML to the end of <body>.
 */

(function () {
    const footerHTML = `
<footer id="omni-global-footer" style="background:#020617; color:#94a3b8; font-family:inherit; padding:40px 20px 28px;">
  <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:24px;">

    <!-- Logo + Brand -->
    <div style="display:flex; align-items:center; gap:14px;">
      <div style="background:#fff; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:center;">
        <img src="/Logo.png" alt="PNJ Logo"
             style="height:32px; width:auto; object-fit:contain;"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block'">
        <span style="display:none; font-weight:900; font-size:16px; color:#002d72; letter-spacing:-.02em;">PNJ</span>
      </div>
      <div>
        <p style="margin:0; font-size:14px; font-weight:800; color:#fff; letter-spacing:-.01em;">OMNI-GROWTH x CHI NHÁNH</p>
        <p style="margin:0; font-size:11px; color:#475569; font-weight:500;">Workspace Intelligence Platform</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="width:100%; max-width:480px; height:1px; background:linear-gradient(to right, transparent, #1e293b, transparent);"></div>

    <!-- Copyright -->
    <p style="margin:0; font-size:12px; font-weight:500; text-align:center; line-height:1.8;">
      © 2026 <strong style="color:#e2e8f0; font-weight:700;">PNJ OMNI-GROWTH TEAM</strong> · All rights reserved.<br>
      <span style="font-size:11px; color:#334155;">Internal use only · Not for public distribution</span>
    </p>

  </div>
</footer>`;

    function injectFooter() {
        // Avoid duplicates
        if (document.getElementById('omni-global-footer')) return;

        const frag = document.createRange().createContextualFragment(footerHTML);
        document.body.appendChild(frag);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFooter);
    } else {
        injectFooter();
    }
})();
