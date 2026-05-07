/**
 * components/layout.js  —  App Shell Entry Point
 * Omni-Growth Workspace 2026
 *
 * Injects in order:
 *   1. FontAwesome 6.4.0 (first — ensures icons paint before layout)
 *   2. Google Fonts — Inter 400/600/800
 *   3. Tailwind CSS CDN
 *   4. Base style (Inter font, smooth scroll)
 *   5. #global-nav + nav.js ES module
 *   6. PNJ footer at bottom of body
 */

(function () {

    function injectLink({ rel, href, crossorigin, id }) {
        if (id && document.getElementById(id)) return;
        if (!id && document.querySelector(`link[href="${href}"]`)) return;
        const el = document.createElement('link');
        el.rel = rel || 'stylesheet';
        el.href = href;
        if (id) el.id = id;
        if (crossorigin) el.crossOrigin = crossorigin;
        document.head.appendChild(el);
    }

    /* 1. FontAwesome 6.4.0 — FIRST */
    injectLink({
        id: 'omni-fontawesome',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    });

    /* 2. Google Fonts — Inter 400/600/800 */
    injectLink({ id: 'omni-gf-pre', rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    injectLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' });
    injectLink({
        id: 'omni-google-fonts',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap',
    });

    /* 3. Tailwind CSS CDN */
    if (!document.getElementById('omni-tailwind') && !document.querySelector('script[src*="tailwindcss"]')) {
        const tw = document.createElement('script');
        tw.id = 'omni-tailwind';
        tw.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tw);
    }

    /* 4. Base styles */
    if (!document.getElementById('omni-base-style')) {
        const st = document.createElement('style');
        st.id = 'omni-base-style';
        st.textContent = `
            html { scroll-behavior: smooth; }
            body { font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; }
            *, *::before, *::after { box-sizing: border-box; }
            i[class^="fa-"], i[class*=" fa-"], .fas, .far, .fab, .fal, .fad { font-family: "Font Awesome 6 Free", "Font Awesome 6 Brands" !important; font-style: normal; font-variant: normal; text-rendering: auto; -webkit-font-smoothing: antialiased; }
            @keyframes omni-spin { to { transform: rotate(360deg); } }
            @keyframes omni-fade-in {
                from { opacity: 0; transform: translateY(-8px) scale(.98); }
                to   { opacity: 1; transform: translateY(0)     scale(1);   }
            }
        `;
        document.head.prepend(st);
    }

    /* 5. #global-nav + nav.js */
    function ensureNav() {
        if (document.getElementById('global-nav')) return;
        const div = document.createElement('div');
        div.id = 'global-nav';
        document.body.prepend(div);
    }

    function loadNav() {
        if (!document.getElementById('omni-nav-script')) {
            const s = document.createElement('script');
            s.id = 'omni-nav-script';
            s.type = 'module';
            s.src = `${window.location.origin}/components/nav.js`;
            document.head.appendChild(s);
        }

        // Auto-load branch navigation for Clienteling
        if (!document.getElementById('omni-branch-nav-script')) {
            const b = document.createElement('script');
            b.id = 'omni-branch-nav-script';
            b.src = `${window.location.origin}/components/local-branch-nav.js`;
            document.head.appendChild(b);
        }
    }

    /* 6. PNJ Footer */
    function injectFooter() {
        if (document.getElementById('omni-footer')) return;
        const footer = document.createElement('footer');
        footer.id = 'omni-footer';
        footer.style.cssText = 'background:#020617;padding:24px 20px;text-align:center;';
        footer.innerHTML = `
            <img src="/Logo.png" alt="PNJ"
                style="height:36px;background:#fff;padding:5px 10px;border-radius:8px;display:block;margin:0 auto 14px;box-shadow:0 2px 8px rgba(0,0,0,.2);"
                onerror="this.style.display='none'">
            <p style="color:#475569;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:4px;">&copy; 2026 PNJ OMNI-GROWTH TEAM.</p>
            <p style="color:#334155;font-size:10px;">Internal &amp; Confidential — Omni-Growth Workspace 2026</p>
        `;
        document.body.appendChild(footer);
    }

    function init() { ensureNav(); loadNav(); injectFooter(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
