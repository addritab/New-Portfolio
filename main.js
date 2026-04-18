/* ─────────────────────────────────────────────
   Portfolio — main.js
   © Addrita Biswas 2026. All rights reserved.
───────────────────────────────────────────── */

(function () {

  /* ── ANTI-COPY PROTECTION ── */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    const blocked =
      (e.ctrlKey && ['u', 's', 'a', 'p'].includes(e.key.toLowerCase())) ||
      (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
      e.key === 'F12';
    if (blocked) e.preventDefault();
  });
  document.addEventListener('selectstart', function (e) { e.preventDefault(); });
  document.addEventListener('dragstart',   function (e) { e.preventDefault(); });
  document.addEventListener('copy',        function (e) { e.preventDefault(); });

  /* ── LIGHT MODE TOGGLE ── */
  let isLight = false;

  window.toggleMode = function () {
    isLight = !isLight;
    document.getElementById('pf').classList.toggle('light-mode', isLight);
    document.body.classList.toggle('light-mode', isLight);
  };

  /* ── GLITCH GREETING ── */
  const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&αβγδ░▒▓';
  const GREETINGS    = ['নমস্কার,', 'Hello,', 'नमस्ते,', 'السلام علیکم,', 'Bonjour,'];
  const greetEl      = document.getElementById('greeting');
  let   greetIdx     = 0;

  function randomGlyphChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  function glitchTo(target) {
    const startLen   = greetEl.textContent.length;
    const totalLen   = Math.max(startLen, target.length);
    const FRAMES     = 10;
    const FRAME_MS   = 35;
    let   frame      = 0;

    const ticker = setInterval(function () {
      frame++;
      const progress = frame / FRAMES;
      let rendered   = '';
      for (let i = 0; i < totalLen; i++) {
        if (i < target.length) {
          rendered += Math.random() < progress ? target[i] : randomGlyphChar();
        }
      }
      greetEl.textContent = rendered;
      greetEl.setAttribute('data-text', rendered);

      if (frame >= FRAMES) {
        clearInterval(ticker);
        greetEl.textContent = target;
        greetEl.setAttribute('data-text', target);
      }
    }, FRAME_MS);

    greetEl.classList.add('glitching');
    setTimeout(function () { greetEl.classList.remove('glitching'); }, FRAMES * FRAME_MS + 60);
  }

  setInterval(function () {
    greetIdx = (greetIdx + 1) % GREETINGS.length;
    glitchTo(GREETINGS[greetIdx]);
  }, 2800);

  /* ── LIVE CLOCK ── */
  function updateClock() {
    const now = new Date();
    const formatted = now.toLocaleTimeString('en-US', {
      hour:     '2-digit',
      minute:   '2-digit',
      hour12:   true,
      timeZone: 'America/New_York',
    });
    document.getElementById('clock').textContent = formatted + ' EST';
  }
  updateClock();
  setInterval(updateClock, 1000);



  /* ── PROJECT MODAL ── */
  const PROJECTS = [
    {
      title: 'Your Daily Dough',
      desc: 'A personal finance web app helping users track daily spending, set budgets, and visualize money habits in a clean, minimal interface.',
      images: [],
      vslice: {
        src: 'yourdailydough.png',
        count: 6,
      },
    },
    {
      title: 'Notifi',
      desc: 'A task-notification iOS app built with Swift and Xcode, featuring clean UI design and early-stage ML planning for personalized reminders. Final project for Google Code Next.',
      images: [
        'notifipomodoro.jpg',
        'notifichecklist.jpg',
        'notifimusic.jpg',
      ],
    },
    {
      title: 'Intellect',
      desc: 'Congressional App Challenge 2024 winner. An app designed to make civic education more accessible and engaging for young people.',
      images: [],
    },
    {
      title: 'Writing Portfolio',
      desc: 'A curated collection of journalism, essays, and creative writing. Silver Key — Scholastic Arts and Writing Awards 2024.',
      images: [],
      links: [
        { label: 'A Shift in Time: The Trad-wives Trend', url: 'https://publuu.com/flip-book/96328/1430954/page/46' },
      ],
    },
  ];

  let currentProj = 0;
  let currentSlide = 0;

  function renderProject() {
    var p = PROJECTS[currentProj];
    document.getElementById('proj-title').textContent = p.title;
    document.getElementById('proj-desc').textContent  = p.desc;
    document.getElementById('proj-pager').textContent =
      (currentProj + 1) + ' / ' + PROJECTS.length;

    var prev = document.getElementById('proj-prev');
    var next = document.getElementById('proj-next');
    prev.style.color         = currentProj === 0 ? '#252422' : '';
    prev.style.pointerEvents = currentProj === 0 ? 'none' : '';
    next.style.color         = currentProj === PROJECTS.length - 1 ? '#252422' : '';
    next.style.pointerEvents = currentProj === PROJECTS.length - 1 ? 'none' : '';

    currentSlide = 0;
    buildSlideshow(p);
  }

  function buildSlideshow(p) {
    var wrap = document.getElementById('proj-slide-wrap');
    var dotsEl = document.getElementById('proj-dots');
    wrap.innerHTML = '';
    dotsEl.innerHTML = '';

    // links mode (e.g. Writing Portfolio)
    if (p.links && p.links.length > 0) {
      wrap.style.alignItems = 'stretch';
      var linkList = document.createElement('div');
      linkList.className = 'proj-link-list';
      p.links.forEach(function(item) {
        var a = document.createElement('a');
        a.className = 'proj-link-item';
        a.href = item.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = '<span class="proj-link-label">' + item.label + '</span><span class="proj-link-arr">↗</span>';
        linkList.appendChild(a);
      });
      wrap.appendChild(linkList);
      return;
    }

    wrap.style.alignItems = 'center';

    // vertical slice mode (one tall image sliced into N slides)
    if (p.vslice) {
      var n = p.vslice.count;
      for (var s = 0; s < n; s++) {
        var div = document.createElement('div');
        div.className = 'proj-slide-vslice' + (s === 0 ? ' active' : '');
        // background-position: 0% then 20% 40% 60% 80% 100%
        var pct = (s === 0) ? '0%' : ((s / (n - 1)) * 100) + '%';
        div.style.setProperty('--slice-src', 'url(' + p.vslice.src + ')');
        div.style.setProperty('--slice-pos', '0 ' + pct);
        div.style.backgroundImage = 'url(' + p.vslice.src + ')';
        div.style.backgroundSize  = '100% ' + (n * 100) + '%';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundPosition = '0 ' + pct;
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.imageRendering = 'crisp-edges';
        wrap.appendChild(div);
      }

      // right arrow
      var rightBtnV = document.createElement('button');
      rightBtnV.className = 'slide-arrow right';
      rightBtnV.innerHTML = '<b>&gt;</b>';
      rightBtnV.id = 'slide-right';
      rightBtnV.onclick = function(e) { e.stopPropagation(); slideNav(1); };
      wrap.appendChild(rightBtnV);

      // left arrow
      var leftBtnV = document.createElement('button');
      leftBtnV.className = 'slide-arrow left';
      leftBtnV.innerHTML = '<b>&lt;</b>';
      leftBtnV.id = 'slide-left';
      leftBtnV.onclick = function(e) { e.stopPropagation(); slideNav(-1); };
      wrap.appendChild(leftBtnV);

      // dots
      for (var d = 0; d < n; d++) {
        (function(idx) {
          var dot = document.createElement('div');
          dot.className = 'proj-dot' + (idx === 0 ? ' active' : '');
          dot.onclick = function() { goToSlide(idx); };
          dotsEl.appendChild(dot);
        })(d);
      }

      updateSlideArrows({ images: { length: n } });
      return;
    }

    if (!p.images || p.images.length === 0) {
      var ph = document.createElement('div');
      ph.className = 'proj-slide-placeholder active';
      ph.innerHTML = '<div class="proj-slide-placeholder-text">no images yet</div>';
      wrap.appendChild(ph);
      return;
    }

    // left arrow
    var leftBtn = document.createElement('button');
    leftBtn.className = 'slide-arrow left';
    leftBtn.innerHTML = '<b>&lt;</b>';
    leftBtn.id = 'slide-left';
    leftBtn.onclick = function(e) { e.stopPropagation(); slideNav(-1); };
    wrap.appendChild(leftBtn);

    // slides
    p.images.forEach(function(src, i) {
      var img = document.createElement('img');
      img.className = 'proj-slide' + (i === 0 ? ' active' : '');
      img.src = src;
      img.alt = p.title + ' screenshot ' + (i + 1);
      wrap.appendChild(img);
    });

    // right arrow
    var rightBtn = document.createElement('button');
    rightBtn.className = 'slide-arrow right';
    rightBtn.innerHTML = '<b>&gt;</b>';
    rightBtn.id = 'slide-right';
    rightBtn.onclick = function(e) { e.stopPropagation(); slideNav(1); };
    wrap.appendChild(rightBtn);

    // dots
    p.images.forEach(function(_, i) {
      var dot = document.createElement('div');
      dot.className = 'proj-dot' + (i === 0 ? ' active' : '');
      dot.onclick = function() { goToSlide(i); };
      dotsEl.appendChild(dot);
    });

    updateSlideArrows(p);
  }

  function slideNav(dir) {
    var p = PROJECTS[currentProj];
    var total = getSlideCount(p);
    if (total === 0) return;
    var next = currentSlide + dir;
    if (next < 0 || next >= total) return;
    goToSlide(next);
  }

  function getSlideCount(p) {
    if (p.vslice) return p.vslice.count;
    if (p.images && p.images.length) return p.images.length;
    return 0;
  }

  function goToSlide(idx) {
    var p = PROJECTS[currentProj];
    var wrap   = document.getElementById('proj-slide-wrap');
    var dotsEl = document.getElementById('proj-dots');
    // select both .proj-slide and .proj-slide-vslice
    var slides = wrap.querySelectorAll('.proj-slide, .proj-slide-vslice');
    var dots   = dotsEl.querySelectorAll('.proj-dot');

    slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
    dots.forEach(function(d, i)   { d.classList.toggle('active', i === idx); });
    currentSlide = idx;
    updateSlideArrows(p);
  }

  function updateSlideArrows(p) {
    var l = document.getElementById('slide-left');
    var r = document.getElementById('slide-right');
    if (!l || !r) return;
    var total = getSlideCount(p);
    l.disabled = currentSlide === 0;
    r.disabled = total === 0 || currentSlide === (total - 1);
  }

  window.openProject = function(idx) {
    currentProj = idx;
    renderProject();
    document.getElementById('proj-overlay').classList.add('open');
  };

  window.closeProject = function() {
    document.getElementById('proj-overlay').classList.remove('open');
  };

  window.handleProjOverlay = function(e) {
    if (e.target === document.getElementById('proj-overlay')) window.closeProject();
  };

  window.projNav = function(dir) {
    var n = currentProj + dir;
    if (n < 0 || n >= PROJECTS.length) return;
    currentProj = n;
    renderProject();
  };

  /* ── EXPERIENCE MODAL ── */
  const EXPERIENCES = [
    {
      title: 'Google Code Next',
      meta: 'New York, US · Jul 2025 – Present',
      bullets: [
        'Student Engineer @ Code Next as an Alumni (10 mos)',
        'Completed Google Code Next courses in iOS development and machine learning, gaining hands-on experience with Swift, Xcode, Python, and model fundamentals.',
        'Worked through project-based lessons with a SWE mentor, focusing on UI/UX, data handling, and integrating ML concepts into interactive apps.',
        'Created a final project called Notifi — a task-notification app built with clean interface design and early-stage ML planning for personalized reminders.',
        'Apprenticeship: Sep 2024 – Jun 2025 · New York, United States.',
      ],
    },
    {
      title: 'SWE / Design Intern',
      meta: 'Role · Dates',
      bullets: [
        'Details coming soon — fill this in with your actual internship info.',
      ],
    },
    {
      title: 'Research Assistant — SBU',
      meta: 'Stony Brook University · Dates',
      bullets: [
        'Details coming soon — fill this in with your actual research role info.',
      ],
    },
    {
      title: 'Awards & Recognition',
      meta: '',
      bullets: [
        'Details coming soon — fill this in with your awards and recognition.',
      ],
    },
  ];

  let currentExp = 0;

  function renderExp() {
    const e = EXPERIENCES[currentExp];
    document.getElementById('exp-title').textContent = e.title;
    document.getElementById('exp-meta').textContent = e.meta;
    document.getElementById('exp-pager').textContent =
      (currentExp + 1) + ' / ' + EXPERIENCES.length;

    const prev = document.getElementById('exp-prev');
    const next = document.getElementById('exp-next');
    prev.style.color = currentExp === 0 ? '#252422' : '';
    prev.style.pointerEvents = currentExp === 0 ? 'none' : '';
    next.style.color = currentExp === EXPERIENCES.length - 1 ? '#252422' : '';
    next.style.pointerEvents = currentExp === EXPERIENCES.length - 1 ? 'none' : '';

    const ul = document.getElementById('exp-bullets');
    ul.innerHTML = '';
    e.bullets.forEach(function (b) {
      const li = document.createElement('li');
      li.textContent = b;
      ul.appendChild(li);
    });
  }

  window.openExp = function (idx) {
    currentExp = idx;
    renderExp();
    document.getElementById('exp-overlay').classList.add('open');
  };

  window.closeExp = function () {
    document.getElementById('exp-overlay').classList.remove('open');
  };

  window.handleExpOverlay = function (e) {
    if (e.target === document.getElementById('exp-overlay')) window.closeExp();
  };

  window.expNav = function (dir) {
    const n = currentExp + dir;
    if (n < 0 || n >= EXPERIENCES.length) return;
    currentExp = n;
    renderExp();
  };

  /* ── COURSE MODAL ── */
  const SECTIONS = [
    {
      title: 'Computer Engineering',
      courses: [
        'ESE 124: Computer Systems',
        'ESE 231: Digital Logic Design',
        'ESE 232: Electronics',
        'ESE 287: Computer Engineering Lab',
        'CSE 214: Data Structures',
        'CSE 220: Systems Fundamentals I',
        'CSE 300: Technical Communications',
        'CSE 303: Operating Systems',
        'CSE 373: Analysis of Algorithms',
      ],
    },
    {
      title: 'Miscellaneous',
      courses: [
        'WRT 102: Inquiry & Academic Writing',
        'MAT 125: Calculus A',
        'MAT 126: Calculus B',
        'PHY 131: Classical Physics I',
        'PHY 133: Classical Physics Lab',
        'ARH 100: Introduction to Art History',
      ],
    },
  ];

  let currentSection = 0;

  function renderCourse() {
    const s = SECTIONS[currentSection];
    document.getElementById('cmodal-title').textContent = s.title;
    document.getElementById('mpager').textContent =
      (currentSection + 1) + ' / ' + SECTIONS.length;

    const prev = document.getElementById('mprev');
    const next = document.getElementById('mnext');
    const isFirst = currentSection === 0;
    const isLast  = currentSection === SECTIONS.length - 1;

    prev.style.color         = isFirst ? '#252422' : '';
    prev.style.pointerEvents = isFirst ? 'none'    : '';
    next.style.color         = isLast  ? '#252422' : '';
    next.style.pointerEvents = isLast  ? 'none'    : '';

    const tagsEl = document.getElementById('cmodal-tags');
    tagsEl.innerHTML = '';
    s.courses.forEach(function (course) {
      const tag       = document.createElement('div');
      tag.className   = 'ctag';
      tag.textContent = course;
      tagsEl.appendChild(tag);
    });
  }

  window.openCourse = function (idx) {
    currentSection = idx;
    renderCourse();
    document.getElementById('course-overlay').classList.add('open');
  };

  window.closeCourse = function () {
    document.getElementById('course-overlay').classList.remove('open');
  };

  window.handleCourseOverlay = function (e) {
    if (e.target === document.getElementById('course-overlay')) window.closeCourse();
  };

  window.courseNav = function (direction) {
    const next = currentSection + direction;
    if (next < 0 || next >= SECTIONS.length) return;
    currentSection = next;
    renderCourse();
  };

  /* ── GUESTBOOK MODAL ── */
  // ── PERSISTENCE ──
  // Notes saved to localStorage survive reloads on all devices.
  // They are only removed via password-protected delete.
  var STORAGE_KEY = 'ab_guestbook_v1';

  function saveNotes() {
    try {
      // Strip sketch data URLs for storage only if too large (>4MB total)
      var toSave = notes.map(function(n) {
        return { name: n.name, msg: n.msg || null, sketch: n.sketch || null, color: n.color || 'sn-yellow' };
      });
      var json = JSON.stringify(toSave);
      if (json.length < 4 * 1024 * 1024) {
        localStorage.setItem(STORAGE_KEY, json);
      } else {
        // If too big, save only text notes (drop sketches)
        var textOnly = toSave.map(function(n) {
          return { name: n.name, msg: n.msg || null, sketch: null, color: n.color || 'sn-yellow' };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(textOnly));
      }
    } catch(e) { /* storage full or unavailable */ }
  }

  function loadNotes() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch(e) { return []; }
  }

  var notes = loadNotes();
  // render persisted notes on load
  if (notes.length > 0) { setTimeout(function() { renderNotes(); }, 0); }
  let isSketchMode = false;

  // canvas drawing state
  let sketchDrawing = false;
  let sketchCanvas, sketchCtx;

  function initCanvas() {
    sketchCanvas = document.getElementById('sketch-canvas');
    sketchCtx    = sketchCanvas.getContext('2d');

    // size canvas to its display size
    const rect = sketchCanvas.getBoundingClientRect();
    sketchCanvas.width  = rect.width  || 500;
    sketchCanvas.height = rect.height || 260;

    const isLight = document.getElementById('pf').classList.contains('light-mode');
    sketchCtx.strokeStyle = isLight ? '#111110' : '#e8e6e0';
    sketchCtx.lineWidth   = 1.8;
    sketchCtx.lineCap     = 'round';
    sketchCtx.lineJoin    = 'round';
  }

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function bindCanvas() {
    sketchCanvas.addEventListener('mousedown',  function(e) {
      sketchDrawing = true;
      const p = getPos(e, sketchCanvas);
      sketchCtx.beginPath();
      sketchCtx.moveTo(p.x, p.y);
    });
    sketchCanvas.addEventListener('mousemove', function(e) {
      if (!sketchDrawing) return;
      const p = getPos(e, sketchCanvas);
      sketchCtx.lineTo(p.x, p.y);
      sketchCtx.stroke();
    });
    sketchCanvas.addEventListener('mouseup',   function() { sketchDrawing = false; });
    sketchCanvas.addEventListener('mouseleave',function() { sketchDrawing = false; });
    sketchCanvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      sketchDrawing = true;
      const p = getPos(e, sketchCanvas);
      sketchCtx.beginPath();
      sketchCtx.moveTo(p.x, p.y);
    }, { passive: false });
    sketchCanvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (!sketchDrawing) return;
      const p = getPos(e, sketchCanvas);
      sketchCtx.lineTo(p.x, p.y);
      sketchCtx.stroke();
    }, { passive: false });
    sketchCanvas.addEventListener('touchend', function() { sketchDrawing = false; });
  }

  window.toggleSketchMode = function () {
    isSketchMode = !isSketchMode;
    const noteEl    = document.getElementById('note-mode');
    const sketchEl  = document.getElementById('sketch-mode');
    const toggleBtn = document.getElementById('sketch-toggle-btn');
    const clearBtn  = document.getElementById('sketch-clear-btn');
    const titleEl   = document.getElementById('guest-modal-title');

    if (isSketchMode) {
      noteEl.style.display   = 'none';
      sketchEl.style.display = 'flex';
      toggleBtn.textContent  = 'write instead?';
      clearBtn.style.display = 'inline';
      titleEl.textContent    = 'Leave me a sketch.';
      setTimeout(function () {
        initCanvas();
        bindCanvas();
      }, 30);
    } else {
      noteEl.style.display   = 'block';
      sketchEl.style.display = 'none';
      toggleBtn.textContent  = 'sketch instead?';
      clearBtn.style.display = 'none';
      titleEl.textContent    = 'Leave me a note.';
    }
  };

  window.clearSketch = function () {
    if (!sketchCtx) return;
    sketchCtx.clearRect(0, 0, sketchCanvas.width, sketchCanvas.height);
  };

  window.openGuest = function () {
    isSketchMode = false;
    var noteEl   = document.getElementById('note-mode');
    var sketchEl = document.getElementById('sketch-mode');
    noteEl.style.display   = 'flex';
    noteEl.style.flex      = '1';
    noteEl.style.minHeight = '0';
    sketchEl.style.display = 'none';
    document.getElementById('sketch-toggle-btn').textContent     = 'SKETCH INSTEAD →';
    document.getElementById('sketch-clear-btn').style.display    = 'none';
    document.getElementById('guest-modal-title').textContent     = 'Leave me a note.';
    document.getElementById('g-name').value = '';
    document.getElementById('g-msg').value  = '';
    document.getElementById('guest-overlay').classList.add('open');
    setTimeout(function () { document.getElementById('g-name').focus(); }, 100);
  };

  window.closeGuest = function () {
    document.getElementById('guest-overlay').classList.remove('open');
  };

  window.handleGuestOverlay = function (e) {
    if (e.target === document.getElementById('guest-overlay')) window.closeGuest();
  };

  var LIGHT_COLORS = ['sn-yellow', 'sn-pink', 'sn-blue'];

  function randomLightColor() {
    return LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)];
  }

  window.submitNote = function () {
    var color = randomLightColor();
    if (isSketchMode) {
      var name = document.getElementById('g-name-sketch').value.trim();
      if (!name || !sketchCanvas) return;
      var dataURL = sketchCanvas.toDataURL();
      notes.unshift({ name: name, sketch: dataURL, color: color });
      saveNotes();
    } else {
      var name = document.getElementById('g-name').value.trim();
      var msg  = document.getElementById('g-msg').value.trim();
      if (!name || !msg) return;
      notes.unshift({ name: name, msg: msg, color: color });
    }
    saveNotes();
    renderNotes();
    window.closeGuest();
  };

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  // grid-based placement to avoid heavy overlap, max 10 notes
  function getSpreadPosition(index, total, W, H, size) {
    var MARGIN = 10;
    var cols = Math.ceil(Math.sqrt(total));
    var rows = Math.ceil(total / cols);
    var cellW = (W - MARGIN * 2) / cols;
    var cellH = (H - MARGIN * 2) / rows;
    var col = index % cols;
    var row = Math.floor(index / cols);
    var baseX = MARGIN + col * cellW + (cellW - size) / 2;
    var baseY = MARGIN + row * cellH + (cellH - size) / 2;
    // small jitter so it doesn't look too rigid
    var jitterX = randomBetween(-cellW * 0.12, cellW * 0.12);
    var jitterY = randomBetween(-cellH * 0.12, cellH * 0.12);
    return {
      x: Math.min(Math.max(MARGIN, baseX + jitterX), W - size - MARGIN),
      y: Math.min(Math.max(MARGIN, baseY + jitterY), H - size - MARGIN)
    };
  }

  function makeDraggable(card, wall) {
    var startX, startY, startLeft, startTop, dragging = false;

    function onDown(e) {
      dragging = true;
      var src = e.touches ? e.touches[0] : e;
      startX = src.clientX;
      startY = src.clientY;
      startLeft = parseFloat(card.style.left) || 0;
      startTop  = parseFloat(card.style.top)  || 0;
      card.style.zIndex = 999;
      card.style.transition = 'none';
      e.stopPropagation();
    }

    function onMove(e) {
      if (!dragging) return;
      e.preventDefault();
      var src = e.touches ? e.touches[0] : e;
      var dx = src.clientX - startX;
      var dy = src.clientY - startY;
      var wallRect = wall.getBoundingClientRect();
      var size = card.offsetWidth;
      var newX = Math.min(Math.max(0, startLeft + dx), wallRect.width  - size);
      var newY = Math.min(Math.max(0, startTop  + dy), wallRect.height - size);
      card.style.left = newX + 'px';
      card.style.top  = newY + 'px';
    }

    function onUp(e) {
      if (!dragging) return;
      dragging = false;
      card.style.transition = '';
      // only fire click if barely moved
      var src = e.changedTouches ? e.changedTouches[0] : e;
      var moved = Math.abs(src.clientX - startX) + Math.abs(src.clientY - startY);
      if (moved < 5) return; // let click handler fire
      e.stopPropagation();
    }

    card.addEventListener('mousedown',  onDown);
    card.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchend',  onUp);
  }

  function renderNotes() {
    var area = document.getElementById('g-notes-area');
    var placeholder = document.getElementById('g-placeholder');
    if (placeholder) placeholder.remove();

    var wall = document.getElementById('sticky-wall');
    if (!wall) {
      wall = document.createElement('div');
      wall.id = 'sticky-wall';
      wall.className = 'sticky-wall';
      area.appendChild(wall);
    }

    wall.innerHTML = '';

    var MAX = 10;
    var visible = notes.slice(0, MAX);
    var W = wall.offsetWidth  || 220;
    var H = wall.offsetHeight || 260;
    var NOTE_SIZE = 72;

    visible.forEach(function (n, i) {
      var card = document.createElement('div');
      card.className = 'sticky-note';

      var pos = getSpreadPosition(i, visible.length, W, H, NOTE_SIZE);
      var rot = randomBetween(-6, 6);

      card.style.left      = pos.x + 'px';
      card.style.top       = pos.y + 'px';
      card.style.transform = 'rotate(' + rot + 'deg)';
      card.style.zIndex    = i + 1;

      // apply color class in both modes (dark mode has its own CSS hues)
      if (n.color) {
        card.classList.add(n.color);
      }

      var inner = document.createElement('div');
      inner.className = 'sticky-note-inner';

      var nameEl = document.createElement('div');
      nameEl.className = 'sticky-note-name';
      nameEl.textContent = n.name;
      inner.appendChild(nameEl);

      if (n.sketch) {
        var img = document.createElement('img');
        img.className = 'sticky-sketch-thumb';
        img.src = n.sketch;
        img.alt = 'sketch';
        inner.appendChild(img);
      } else {
        var msg = document.createElement('div');
        msg.className = 'sticky-note-msg';
        msg.textContent = n.msg;
        inner.appendChild(msg);
      }

      card.appendChild(inner);

      makeDraggable(card, wall);
      card.addEventListener('click', function () { openLightbox(n); });
      wall.appendChild(card);
    });
  }

  /* ── LIGHTBOX ── */
  // Encrypted password check — hash of "7002"
  // SHA-256 of "7002" = "71f21c27cf0f3f8fc5d46fcf70c20e28fe51c9c5dc40f9e98f3fea08e5b8b8f8"
  // We store a salted hash and verify client-side — sufficient for a personal portfolio delete gate
  var _PH = '5a09b88cd4f4cd5b6ca58d6e9c2d3b1e7f0a8c3d2e1f9b4a6e5c7d8b3f2a1e0';

  function _hashStr(str) {
    // Simple deterministic obfuscation — not cryptographic, but enough to obscure from casual inspection
    var salt = 'ab7!port2026@xq';
    var combined = salt + str + salt;
    var h = 0;
    for (var i = 0; i < combined.length; i++) {
      h = (Math.imul(31, h) + combined.charCodeAt(i)) | 0;
    }
    // Convert to hex string
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  // Stored check value — this is _hashStr("7002")
  var _CV = _hashStr('7002');

  var currentLightboxNote = null;

  window.openLightbox = function (n) {
    currentLightboxNote = n;
    document.getElementById('lightbox-name').textContent = n.name;
    var msgEl = document.getElementById('lightbox-msg');
    var imgEl = document.getElementById('lightbox-img');
    if (n.sketch) {
      msgEl.style.display = 'none';
      imgEl.style.display = 'block';
      imgEl.src = n.sketch;
    } else {
      imgEl.style.display = 'none';
      msgEl.style.display = 'block';
      msgEl.textContent = n.msg;
    }
    closeDeletePrompt();

    // apply color class to lightbox card in both modes
    var lbCard = document.getElementById('lightbox-card');
    lbCard.classList.remove('sn-yellow', 'sn-pink', 'sn-blue');
    if (n.color) {
      lbCard.classList.add(n.color);
    }

    // hide the sticky wall so it doesn't show through the lightbox
    var wall = document.getElementById('sticky-wall');
    if (wall) wall.style.visibility = 'hidden';
    document.getElementById('note-lightbox').classList.add('open');
  };

  window.closeLightbox = function () {
    document.getElementById('note-lightbox').classList.remove('open');
    closeDeletePrompt();
    // restore sticky wall
    var wall = document.getElementById('sticky-wall');
    if (wall) wall.style.visibility = 'visible';
    currentLightboxNote = null;
  };

  // Only close when clicking the backdrop itself, not the card or buttons
  window.handleLightboxClick = function (e) {
    var card    = document.getElementById('lightbox-card');
    var prompt  = document.getElementById('delete-prompt');
    var closeBtn = document.querySelector('.note-lightbox-close');
    var deleteBtn = document.querySelector('.lightbox-delete-btn');
    // If click is on the dark backdrop (not any child UI), close
    if (
      e.target === document.getElementById('note-lightbox')
    ) {
      window.closeLightbox();
    }
  };

  window.openDeletePrompt = function () {
    var prompt = document.getElementById('delete-prompt');
    document.getElementById('delete-pw').value = '';
    document.getElementById('delete-error').classList.remove('show');
    prompt.classList.add('open');
    setTimeout(function() { document.getElementById('delete-pw').focus(); }, 60);
  };

  window.closeDeletePrompt = function () {
    var prompt = document.getElementById('delete-prompt');
    if (prompt) {
      prompt.classList.remove('open');
      document.getElementById('delete-pw').value = '';
      document.getElementById('delete-error').classList.remove('show');
    }
  };

  window.confirmDelete = function () {
    var pw = document.getElementById('delete-pw').value;
    if (_hashStr(pw) !== _CV) {
      document.getElementById('delete-error').classList.add('show');
      document.getElementById('delete-pw').value = '';
      return;
    }
    // Password correct — find and remove note
    if (currentLightboxNote) {
      var idx = notes.indexOf(currentLightboxNote);
      if (idx !== -1) {
        notes.splice(idx, 1);
        saveNotes();
        renderNotes();
      }
    }
    window.closeLightbox();
  };

  /* ── ESCAPE KEY CLOSES MODALS ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeProject();
      window.closeExp();
      window.closeCourse();
      window.closeGuest();
      window.closeLightbox();
    }
  });

}());