/**
 * components/nav.js  —  ES Module
 * Omni-Growth Workspace 2026
 *
 * Premium Multi-level Nested Floating Dropdown (Glassmorphism)
 * Layout: Left ModList | Right Interactive Pane (3 Layers)
 * Colors: PNJ Blue (#002d72) & PNJ Gold (#F7A800)
 */

import { workspaceMenu } from '/config/menu-config.js';

(function () {
  if (document.getElementById('omni-nav')) return;

  /* ── Colors ────────────────────────────────────────────────────────── */
  const PNJ_BLUE = '#002d72';
  const PNJ_GOLD = '#F7A800';

  const THEME_COLORS = {
    'Clienteling': '#0D9488', // Teal
    'CSC - Scoring Card': '#4F46E5', // Indigo
    'CJM360': '#E11D48',  // Rose
    'UAV 2026': '#0EA5E9', // Sky
    'Innovation Lab': '#9333EA', // Purple
    'System & Updates': '#10B981' // Emerald
  };

  const p = window.location.pathname;
  const isHome = p === '/' || p === '/index.html' || p.endsWith('/index.html');

  /* ── CSS ───────────────────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
        #omni-nav { box-sizing: border-box; font-family: 'Inter', sans-serif; }
        #omni-nav *, #omni-nav *::before, #omni-nav *::after { box-sizing: inherit; }
        #omni-mega {
            display: none;
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 700px;
            max-width: 95vw;
            z-index: 9998;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(226,232,240,.8);
            border-radius: 16px;
            box-shadow: 0 30px 60px -15px rgba(0,45,114,0.2);
            overflow: hidden;
            animation: nav-fade-in .3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            min-height: 480px;
        }
        #omni-mega.open { display: flex; }
        @keyframes nav-fade-in {
            from { opacity: 0; transform: translateY(-5px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        
        #omni-mod-list {
            width: 220px;
            flex-shrink: 0;
            background: #f8fafc;
            border-right: 1px solid #e2e8f0;
            padding: 16px 12px;
            overflow-y: auto;
        }
        #omni-feat-pane {
            flex: 1;
            padding: 24px;
            overflow-y: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        /* Level Containers */
        .nav-layer {
            display: none;
            flex: 1;
            overflow-y: auto;
            padding-right: 8px; /* For scrollbar */
        }
        .nav-layer.active { display: block; animation: fade-in .3s ease forwards; }
        @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        
        @keyframes slide-up-fade {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Module Pills */
        .omni-mod-pill {
            width: 100%; text-align: left; background: transparent; border: none;
            border-radius: 10px; padding: 12px; margin-bottom: 4px;
            cursor: pointer; display: flex; align-items: center; gap: 12px;
            font-size: 13px; font-weight: 600; color: #475569;
            transition: all .2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .omni-mod-pill:hover { background: #e2e8f0; }
        .omni-mod-pill.active { background: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .pill-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: .2s; font-size: 14px; }
        
        /* Dynamic JS injected styles will handle the active pill color/shadow glow */

        /* SubGroup / Folder Cards (Level 1/2) */
        .folder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-bottom: 20px; }
        .folder-card {
            background: white; border: 1px solid #e2e8f0; border-radius: 12px;
            padding: 16px; cursor: pointer; transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; flex-direction: row; align-items: center; gap: 14px;
            animation: slide-up-fade 0.4s ease forwards;
            opacity: 0;
            transform: translateY(12px);
        }
        .folder-card:hover { 
            border-color: var(--theme-color, #002d72); 
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.08); 
            transform: translateY(-2px); 
        }
        .folder-card:hover .fa-arrow-right {
            color: var(--theme-color, #002d72) !important;
            transform: translateX(3px);
        }
        .folder-icon { 
            color: var(--theme-color, #002d72); 
            background: var(--theme-bg, rgba(0,45,114,0.1)); 
            font-size: 16px; width: 38px; height: 38px; border-radius: 10px; 
            display: flex; align-items: center; justify-content: center; 
            transition: all .3s;
            flex-shrink: 0;
        }
        .folder-card:hover .folder-icon {
            box-shadow: 0 0 12px var(--theme-bg, rgba(0,45,114,0.2));
            transform: scale(1.05);
        }
        .folder-name { font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px; }
        
        /* Links (Level 3) */
        .omni-feat-link {
            display: flex; align-items: center; gap: 12px; padding: 10px 14px;
            border-radius: 10px; color: #334155; font-size: 13.5px; font-weight: 600;
            text-decoration: none; margin-bottom: 8px; border: 1px solid transparent;
            transition: all .2s cubic-bezier(0.16, 1, 0.3, 1);
            animation: slide-up-fade 0.4s ease forwards;
            opacity: 0;
            transform: translateY(12px);
        }
        .omni-feat-link:hover { 
            background: var(--theme-hover, rgba(0,45,114,0.05)); 
            border-color: var(--theme-border, rgba(0,45,114,0.2)); 
            color: var(--theme-color, #002d72); 
            transform: translateX(4px); 
        }
        .feat-link-icon {
            flex-shrink: 0; width: 34px; height: 34px; border-radius: 8px; 
            background: var(--theme-bg, rgba(0,45,114,0.1)); 
            color: var(--theme-color, #002d72); 
            display: flex; align-items: center; justify-content: center; 
            font-size: 15px; transition: all .2s;
        }
        .omni-feat-link:hover .feat-link-icon {
            background: var(--theme-color, #002d72);
            color: white;
            box-shadow: 0 0 10px var(--theme-glow, rgba(0,45,114,0.4));
            transform: scale(1.05);
        }
        
        /* Breadcrumbs */
        .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
        .bc-btn { background: none; border: none; padding: 4px 8px; border-radius: 6px; color: #64748b; cursor: pointer; font-family: inherit; font-size: inherit; font-weight: inherit; transition: .15s; }
        .bc-btn:hover { background: #e2e8f0; color: var(--theme-color, #002d72); }
        .bc-current { color: var(--theme-color, #002d72); font-weight: 800; }
        
        .empty-state { text-align: center; padding: 40px 20px; animation: fade-in .3s ease; }
        .empty-icon { font-size: 32px; color: #cbd5e1; margin-bottom: 16px; }
        .empty-text { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 16px; }
        .btn-update { display: inline-block; padding: 8px 16px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; color: var(--theme-color, #002d72); font-size: 13px; font-weight: 600; text-decoration: none; transition: .2s; }
        .btn-update:hover { background: #f8fafc; border-color: var(--theme-color, #002d72); }
    `;
  document.head.appendChild(css);

  /* ── HTML Framework ────────────────────────────────────────────────── */
  const nav = document.createElement('nav');
  nav.id = 'omni-nav';
  nav.style.cssText = `position: sticky; top: 0; z-index: 9999; background: rgba(255,255,255,0.98); border-bottom: 1px solid #e2e8f0;`;
  nav.innerHTML = `
    <div style="max-width:1400px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
        <a href="/index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
            <img src="/Logo.png" alt="PNJ" style="height:36px;background:#fff;padding:4px 8px;border-radius:8px;border:1px solid #f1f5f9;box-shadow:0 2px 4px rgba(0,0,0,.05);" onerror="this.style.display='none'">
            <span style="font-size:12px;font-weight:900;letter-spacing:1px;color:${PNJ_BLUE};text-transform:uppercase;">OMNI-GROWTH</span>
        </a>

        <div id="omni-cta" style="display:${isHome ? 'flex' : 'none'};gap:24px;flex:1;justify-content:center;">
            <!-- CTA links as per previous, simplifed for space -->
            <a href="#problem" style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:none;">Problem</a>
            <a href="#agitation" style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:none;">Agitation</a>
            <a href="#solution" style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:none;">Solution</a>
            <a href="#execution" style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:none;">Execution</a>
        </div>

        <div style="display:flex;align-items:center;gap:12px;position:relative;">
            <button class="btn-download" style="padding:8px 16px;border-radius:8px;border:none;background:${PNJ_BLUE};color:white;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px;">
                <i class="fas fa-download"></i> Tải Về (PNG)
            </button>
            <button id="omni-menu-btn" style="width:40px;height:40px;border-radius:8px;border:1px solid #cbd5e1;background:white;color:${PNJ_BLUE};cursor:pointer;display:flex;align-items:center;justify-content:center;">
                <i class="fas fa-th" style="font-size:16px;pointer-events:none;"></i>
            </button>

            <!-- Menu Dropdown -->
            <div id="omni-mega">
                <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${PNJ_GOLD};"></div>
                <div id="omni-mod-list"></div>
                <div id="omni-feat-pane"></div>
            </div>
        </div>
    </div>
    `;

  document.getElementById('global-nav')?.appendChild(nav);

  const modList = document.getElementById('omni-mod-list');
  const featPane = document.getElementById('omni-feat-pane');

  /* ── 3-Level Rendering Logic ───────────────────────────────────────── */

  // State
  let currentState = { moduleIdx: 0, subGroup: null, month: null };

  function emptyStateHTML() {
    return `
            <div class="empty-state">
                <i class="fas fa-sync empty-icon fa-spin-pulse"></i>
                <div class="empty-text">Dữ liệu đang được đồng bộ</div>
                <a href="/modules/updating.html" class="btn-update">Xem thông tin hệ thống</a>
            </div>
        `;
  }

  // LEVEL 3: Links inside a Month
  function renderLevel3Links(monthData) {
    if (!monthData.links || monthData.links.length === 0) return emptyStateHTML();
    return monthData.links.map((f, i) => `
            <a href="${f.url}" class="omni-feat-link" style="animation-delay: ${i * 0.04}s">
                <div class="feat-link-icon"><i class="fas ${f.icon || 'fa-file-alt'}"></i></div>
                ${f.name}
            </a>
        `).join('');
  }

  // FLATTENED VIEWS (For CJM360, System, Innovation Lab)
  function renderFlattenedGroups(mod) {
    if ((!mod.subGroups || mod.subGroups.length === 0) && (!mod.features || mod.features.length === 0)) return emptyStateHTML();

    let html = '';
    let globalDelay = 0;

    // 1. Direct features
    if (mod.features && mod.features.length > 0) {
      html += mod.features.map((f) => {
        const delay = globalDelay++ * 0.04;
        return `
            <a href="${f.url}" class="omni-feat-link" style="animation-delay: ${delay}s">
                <div class="feat-link-icon"><i class="fas ${f.icon || 'fa-file-alt'}"></i></div>
                ${f.name}
            </a>`;
      }).join('');
    }

    // 2. Subgroups and their features
    if (mod.subGroups && mod.subGroups.length > 0) {
      mod.subGroups.forEach(sg => {
        if (sg.features && sg.features.length > 0) {
          // Add a small group header
          const delay = globalDelay++ * 0.04;
          html += `<div style="font-size: 12px; font-weight: 700; color: #94a3b8; margin: 16px 0 8px 4px; text-transform: uppercase; animation: slide-up-fade 0.4s ease forwards; opacity: 0; transform: translateY(12px); animation-delay: ${delay}s">${sg.groupName}</div>`;

          html += sg.features.map(f => {
            const delay2 = globalDelay++ * 0.04;
            return `
                    <a href="${f.url}" class="omni-feat-link" style="animation-delay: ${delay2}s">
                        <div class="feat-link-icon"><i class="fas ${f.icon || 'fa-file-alt'}"></i></div>
                        ${f.name}
                    </a>`;
          }).join('');
        }
      });
    }

    return html || emptyStateHTML();
  }



  // LEVEL 1: SubGroups inside Module
  function renderLevel1SubGroups(moduleIdx) {
    const mod = workspaceMenu[moduleIdx];
    if (!mod.subGroups || mod.subGroups.length === 0) return emptyStateHTML();

    return `<div class="folder-grid">` + mod.subGroups.map((g, i) => `
            <div class="folder-card" data-action="go-subgroup" data-sg="${g.groupName}" style="animation-delay: ${i * 0.05}s">
                <div class="folder-icon"><i class="fas ${g.icon || 'fa-folder-open'}"></i></div>
                <div style="flex:1">
                    <div class="folder-name">${g.groupName}</div>
                    <div style="font-size:12px;color:#64748b;">${g.features ? g.features.length + ' Mục' : '0 Mục'}</div>
                </div>
                <i class="fas fa-arrow-right" style="color:#cbd5e1; font-size: 14px; transition: .2s;"></i>
            </div>
        `).join('') + `</div>`;
  }

  // Breadcrumb Generator
  function renderBreadcrumb() {
    const mod = workspaceMenu[currentState.moduleIdx];
    let bc = `<button class="bc-btn" data-action="go-home">${mod.moduleName === 'Customer Scoring Card' ? 'CSC - Scoring Card' : mod.moduleName}</button>`;

    if (currentState.subGroup) {
      bc += ` <i class="fas fa-chevron-right" style="font-size:10px;color:#cbd5e1;"></i> `;
      bc += `<span class="bc-current">${currentState.subGroup}</span>`;
    }
    return `<div class="breadcrumb">${bc}</div>`;
  }

  // Main Render Right Pane
  function renderRightPane() {
    const mod = workspaceMenu[currentState.moduleIdx];
    let contentHtml = '';

    if (currentState.subGroup) {
      const sgData = mod.subGroups.find(g => g.groupName === currentState.subGroup);
      contentHtml = renderLevel3Links({ links: (sgData || {}).features || [] });
    }
    else {
      // L1
      if (mod.moduleName !== 'Clienteling') {
        // Smart flatten everything not Clienteling!
        contentHtml = renderFlattenedGroups(mod);
      } else {
        contentHtml = renderLevel1SubGroups(currentState.moduleIdx);
      }
    }

    featPane.innerHTML = `
            ${renderBreadcrumb()}
            <div class="nav-layer active">${contentHtml}</div>
        `;

    // Attach BC listeners
    featPane.querySelectorAll('[data-action="go-home"]').forEach(btn => btn.onclick = () => { currentState.subGroup = null; renderRightPane(); });
    featPane.querySelectorAll('[data-action="go-subgroup"]').forEach(btn => btn.onclick = (e) => {
      currentState.subGroup = e.currentTarget.getAttribute('data-sg');
      renderRightPane();
    });
  }

  // Utility for rgba conversion
  function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Build Left Modules
  workspaceMenu.forEach((mod, i) => {
    const pill = document.createElement('button');
    pill.className = 'omni-mod-pill';
    const displayName = mod.moduleName === 'Customer Scoring Card' ? 'CSC - Scoring Card' : mod.moduleName;
    const themeColor = THEME_COLORS[displayName] || THEME_COLORS['Clienteling'];

    pill.innerHTML = `
            <div class="pill-icon" style="background:${hexToRgba(themeColor, 0.1)}; color:${themeColor};"><i class="fas ${mod.icon || 'fa-cube'}"></i></div>
            <span>${displayName}</span>
        `;
    pill.onclick = () => {
      currentState = { moduleIdx: i, subGroup: null, month: null };

      document.querySelectorAll('.omni-mod-pill').forEach((p, idx) => {
        const pName = workspaceMenu[idx].moduleName === 'Customer Scoring Card' ? 'CSC - Scoring Card' : workspaceMenu[idx].moduleName;
        const pColor = THEME_COLORS[pName] || THEME_COLORS['Clienteling'];
        const iconDiv = p.querySelector('.pill-icon');
        const iconI = iconDiv.querySelector('i');

        if (idx === i) {
          p.classList.add('active');
          p.style.color = pColor;
          iconDiv.style.background = `linear-gradient(135deg, ${hexToRgba(pColor, 0.18)}, ${hexToRgba(pColor, 0.12)})`;
          iconI.style.color = pColor;
          iconI.style.filter = `brightness(1.15) saturate(1.4)`;
          iconI.style.textShadow = `0px 0px 10px ${hexToRgba(pColor, 0.6)}`; // Text shadow glow

          // Inject CSS Variables for Right Pane
          const mega = document.getElementById('omni-mega');
          if (mega) {
            mega.style.setProperty('--theme-color', pColor);
            mega.style.setProperty('--theme-bg', hexToRgba(pColor, 0.08));
            mega.style.setProperty('--theme-border', hexToRgba(pColor, 0.25));
            mega.style.setProperty('--theme-hover', hexToRgba(pColor, 0.04));
            mega.style.setProperty('--theme-glow', hexToRgba(pColor, 0.35));
          }
        } else {
          p.classList.remove('active');
          p.style.color = '';
          iconDiv.style.background = hexToRgba(pColor, 0.1);
          iconI.style.color = pColor;
          iconI.style.filter = '';
          iconI.style.textShadow = '';
        }
      });
      renderRightPane();
    };
    modList.appendChild(pill);
  });

  /* Init */
  if (workspaceMenu.length > 0) {
    const firstPill = document.querySelectorAll('.omni-mod-pill')[0];
    firstPill.click(); // Trigger dynamic style explicitly
  }

  /* ── Open / Close ──────────────────────────────────────────────────── */
  const mega = document.getElementById('omni-mega');
  const menuBtn = document.getElementById('omni-menu-btn');
  let isOpen = false;

  mega.addEventListener('click', e => e.stopPropagation());
  menuBtn.addEventListener('click', e => { e.stopPropagation(); isOpen ? close() : open(); });
  document.addEventListener('click', e => {
    // Handle download delegation safely
    const dlBtn = e.target.closest('.btn-download');
    if (dlBtn) {
      if (typeof window.downloadAsImage === 'function') window.downloadAsImage();
    }

    // Handle menu close
    if (isOpen && !e.target.closest('#omni-mega')) close();
  });

  function open() { isOpen = true; mega.classList.add('open'); }
  function close() { isOpen = false; mega.classList.remove('open'); }

  // Auto-load branch navigation for Clienteling natively inside nav
  if (!document.getElementById('omni-branch-nav-script') && window.location.pathname.toLowerCase().includes('/clienteling/')) {
    const b = document.createElement('script');
    b.id = 'omni-branch-nav-script';
    b.src = '/components/local-branch-nav.js';
    document.head.appendChild(b);
  }

})();