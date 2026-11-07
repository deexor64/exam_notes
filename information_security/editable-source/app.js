(() => {
  'use strict';
  const chapters = window.STUDY_CHAPTERS || [];
  const app = document.getElementById('app');
  const groups = [
    ['START HERE', ['foundations','people','endpoints']],
    ['CRYPTOGRAPHY', ['crypto-basics','math','symmetric','asymmetric','pki','hashes']],
    ['MANAGEMENT & RESPONSE', ['risk','governance','incidents']],
    ['EXAM PREP', ['review']]
  ];
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localGet = (key, fallback) => { try { const val = JSON.parse(localStorage.getItem(key)); return val === null ? fallback : val; } catch { return fallback; } };
  const localSet = (key, val) => { try { localStorage.setItem(key,JSON.stringify(val)); } catch {} };
  let completed = localGet('infosec-completed-v1', []);
  if (!Array.isArray(completed)) completed=[];
  let theme = localGet('infosec-theme-v1', 'light');
  if (theme !== 'dark') theme = 'light';
  document.body.dataset.theme = theme;
  let activeSlug = null;
  let index = [];
  let quizState = { question:0, answers:[], show:false };
  const icons = {
    search:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="11" cy="11" r="7.2"/><path d="m16.5 16.5 5 5"/></svg>',
    menu:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20.5 14a8.7 8.7 0 0 1-10.7-10.7A8.8 8.8 0 1 0 20.5 14Z"/></svg>',
    sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.6" stroke-linejoin="round"><path d="m12 2 8 4v6c0 4.6-3.2 8-8 10-4.8-2-8-5.4-8-10V6l8-4Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>'
  };
  const chapter = slug => chapters.find(c=>c.slug===slug);
  const sectionId = title => title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const route = () => { const pieces = (location.hash.replace(/^#\/?/,'') || 'home').split('/'); return {slug:pieces[0]||'home',section:pieces[1]||null}; };
  const homeRoute = () => '#/home';
  const href = slug => `#/${slug}`;
  const findNext = () => chapters.find(c=>!completed.includes(c.slug)) || chapters[0];
  const duration = c => `${c.minutes} min read`;
  function sidebar() {
    return `<aside id="sidebar" class="sidebar" aria-label="Course navigation">
      <a class="brand-row" href="${homeRoute()}"><span class="brand-mark">${icons.shield}</span><span><span class="brand-title">Information Security</span><br><span class="brand-sub">CS32042 · EXAM NOTES</span></span></a>
      <nav class="sidebar-main">
        <a class="nav-item ${activeSlug==='home'?'active':''}" href="${homeRoute()}"><span class="nav-num">⌂</span><span>Overview</span></a>
        ${groups.map(g=>`<div class="side-label">${g[0]}</div>${g[1].map(id=>{const c=chapter(id),done=completed.includes(id);return `<a href="${href(id)}" class="nav-item ${activeSlug===id?'active':''} ${done?'done':''}" ${activeSlug===id?'aria-current="page"':''}><span class="nav-num">${done?'✓':c.num}</span><span>${escapeHTML(c.short)}</span></a>`;}).join('')}`).join('')}
      </nav>
      <div class="side-foot"><div class="side-progress-top"><span>Study progress</span><b>${completed.length} / ${chapters.length}</b></div><div class="progress-track"><div class="progress-fill" style="width:${Math.round(completed.length/chapters.length*100)}%"></div></div><div class="side-foot-note">Your progress stays in this browser.</div></div>
    </aside>`;
  }
  function topbar() {
    const title = activeSlug==='home'?'Overview':chapter(activeSlug)?.short || 'Overview';
    return `<header class="topbar"><div style="display:flex;align-items:center;gap:12px;min-width:0"><button id="menuBtn" class="icon-btn mobile-menu" aria-label="Open navigation">${icons.menu}</button><div class="crumbs">CS32042 <span class="divider">/</span> <b>${escapeHTML(title)}</b></div></div><div class="top-actions"><button type="button" class="search-trigger" id="searchBtn" aria-label="Search study notes"><span>${icons.search}<span class="search-label">Search lessons...</span></span><span class="kbd">Ctrl K</span></button><button id="themeBtn" class="icon-btn" aria-label="Toggle light or dark mode" title="Toggle theme">${theme==='dark'?icons.sun:icons.moon}</button></div></header>`;
  }
  function heroArt(){ return `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 300 300" fill="none"><circle cx="150" cy="150" r="110" stroke="#97b6ee" stroke-opacity=".3" stroke-dasharray="4 9"/><circle cx="150" cy="150" r="76" stroke="#93b7fa" stroke-opacity=".3"/><path d="M150 53 232 101v94l-82 50-82-50v-94l82-48Z" stroke="#dceafa" stroke-opacity=".55" stroke-width="2"/><path d="m150 91 49 28v62l-49 29-49-29v-62l49-28Z" fill="#8faef2" fill-opacity=".18" stroke="#afccfb" stroke-opacity=".8"/><path d="m130 150 16 16 28-33" stroke="#d0f8e8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="150" cy="53" r="5" fill="#88dcc9"/><circle cx="232" cy="195" r="5" fill="#90baff"/><circle cx="68" cy="195" r="5" fill="#90baff"/><path d="M150 0v40M0 150h45M255 150h45M150 260v40" stroke="#9fc4fa" stroke-opacity=".25"/></svg></div>`; }
  function home() {
    const next=findNext();
    return `<main class="page-area home-page" id="main" tabindex="-1">
      <section class="hero"><div class="hero-copy"><div class="hero-badge">Your personal security study guide</div><h1>Information Security,<br><em>made understandable.</em></h1><p>Everything essential from your lecture notes — clear explanations, useful diagrams, worked cryptography examples, and focused exam revision.</p><a class="primary-btn" href="${href(next.slug)}">${completed.length?'Continue learning':'Start learning'} <span>→</span></a></div>${heroArt()}</section>
      <div class="stat-grid"><div class="stat"><div class="k">${chapters.length}</div><small>Study chapters</small></div><div class="stat"><div class="k">13</div><small>Source PDFs</small></div><div class="stat"><div class="k" id="homeProgress">${Math.round(completed.length/chapters.length*100)}%</div><small>Chapters completed</small></div></div>
      <div class="section-header"><div><h2>Choose a chapter</h2><p>Organized by concepts, not scattered slide order.</p></div><span class="mini-hint">${chapters.reduce((n,c)=>n+c.sections,0)} guided sections</span></div>
      <div class="chapters-grid">${chapters.map(c=>`<a href="${href(c.slug)}" class="chapter-card"><div class="card-top"><span class="card-number">CHAPTER ${c.num}</span><span class="card-status ${completed.includes(c.slug)?'':'unread'}">${completed.includes(c.slug)?'✓ Completed':'○ Not completed'}</span></div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description)}</p><div class="card-bottom"><span>${c.sections} sections · ${duration(c)}</span><span class="arrow">↗</span></div></a>`).join('')}</div>
      <div class="home-foot"><strong>About these notes.</strong> Built from 13 uploaded PDFs: the module outline, introduction, human factors, cryptography, arithmetic, symmetric and asymmetric algorithms, PKI, hashes, endpoints, risk management, governance, and incident response. Added explanations and modern corrections are marked in context. Original lecture framing is preserved for exam study. No internet connection or account is needed to read this site.</div>
    </main>`;
  }
  function renderChapter(c) {
    const n=chapters.indexOf(c), prev=chapters[n-1], next=chapters[n+1];
    return `<main class="page-area" id="main" tabindex="-1"><div class="reader-layout"><div class="reader-main">
      <header class="chapter-intro"><span class="eyebrow">CHAPTER ${c.num} · ${escapeHTML(c.category)}</span><h1>${escapeHTML(c.title)}</h1><p>${escapeHTML(c.description)}</p><div class="reading-meta"><span class="meta-pill">◷ ${duration(c)}</span><span class="meta-dot"></span><span class="meta-pill">☷ ${c.sections} sections</span><button id="completeBtn" type="button" class="complete-btn ${completed.includes(c.slug)?'completed':''}">${completed.includes(c.slug)?'✓ Chapter completed':'○ Mark as completed'}</button></div></header>
      <article class="article" id="articleContent">${c.html}</article>
      <nav class="chapter-nav" aria-label="Chapter navigation">${prev?`<a href="${href(prev.slug)}"><span>← PREVIOUS CHAPTER</span>${escapeHTML(prev.short)}</a>`:`<a href="${homeRoute()}"><span>← BACK</span>Overview</a>`}${next?`<a href="${href(next.slug)}"><span>NEXT CHAPTER →</span>${escapeHTML(next.short)}</a>`:`<a href="${homeRoute()}"><span>↗ END OF NOTES</span>Back to overview</a>`}</nav>
      </div><aside class="toc" id="toc" aria-label="On this page"><h4>On this page</h4><div id="tocLinks"></div><div class="toc-foot"><p>Tip: Press <b>/</b> to search for a concept across all lectures.</p></div></aside></div></main>`;
  }
  function render() {
    const r=route(); activeSlug=chapter(r.slug)?r.slug:'home';
    document.title=(activeSlug==='home'?'Exam Companion':`${chapter(activeSlug).title} · Exam Notes`) + ' | Information Security';
    app.innerHTML=`<div class="app">${sidebar()}<div class="content-shell">${topbar()}${activeSlug==='home'?home():renderChapter(chapter(activeSlug))}</div></div>`;
    $('#themeBtn').addEventListener('click',toggleTheme);
    $('#searchBtn').addEventListener('click',openSearch);
    $('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
    $$('.sidebar .nav-item,.sidebar .brand-row').forEach(a=>a.addEventListener('click',()=>$('#sidebar').classList.remove('open')));
    if(activeSlug!=='home'){
      const c=chapter(activeSlug);
      const used=new Set();
      const h2s=$$('#articleContent h2');
      h2s.forEach(h=>{let id=sectionId(h.textContent)||'section',j=1;while(used.has(id))id=sectionId(h.textContent)+'-'+(++j);used.add(id);h.id=id;});
      $('#tocLinks').innerHTML=h2s.map(h=>`<a href="${href(c.slug)}/${h.id}" data-toc="${h.id}">${escapeHTML(h.textContent)}</a>`).join('');
      $$('#tocLinks a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();location.hash=a.getAttribute('href');goToSection(a.dataset.toc);}));
      $('#completeBtn').addEventListener('click',()=>{completed=completed.includes(c.slug)?completed.filter(x=>x!==c.slug):[...completed,c.slug];localSet('infosec-completed-v1',completed);render();window.scrollTo({top:0,behavior:'instant'});});
      bindTools();
      if(activeSlug==='review') setupQuiz();
    }
    if(r.section) requestAnimationFrame(()=>goToSection(r.section,'instant'));
    else window.scrollTo({top:0,behavior:'instant'});
  }
  function goToSection(id, behavior='smooth') {
    const el=document.getElementById(id);
    if(el){el.scrollIntoView({behavior,block:'start'});$$('#tocLinks a').forEach(a=>a.classList.toggle('active',a.dataset.toc===id));}
  }
  function toggleTheme(){theme=theme==='dark'?'light':'dark';document.body.dataset.theme=theme;localSet('infosec-theme-v1',theme);$('#themeBtn').innerHTML=theme==='dark'?icons.sun:icons.moon;}
  function buildIndex() {
    index=[];
    chapters.forEach(c=>{
      const root=document.createElement('div');root.innerHTML=c.html;
      index.push({slug:c.slug,title:c.title,text:c.description,section:null,group:c.category});
      const headings=$$('h2',root);
      headings.forEach((head,i)=>{
        let text='';let node=head.nextElementSibling;
        while(node && node.tagName!=='H2' && text.length<900){text+=' '+node.textContent;node=node.nextElementSibling;}
        index.push({slug:c.slug,title:head.textContent,section:sectionId(head.textContent),text:text.replace(/\s+/g,' ').trim(),group:c.title});
      });
    });
  }
  function searchHits(q) {
    const query=q.trim().toLowerCase();
    if (!query) return index.filter(x=>!x.section).slice(0,8);
    const words=query.split(/\s+/).filter(Boolean);
    return index.map(x=>{const title=x.title.toLowerCase(),all=(x.title+' '+x.text+' '+x.group).toLowerCase();const matches=words.every(w=>all.includes(w));const score=matches?words.reduce((n,w)=>n+(title.includes(w)?12:0)+(x.group.toLowerCase().includes(w)?2:0),0)+(x.section?3:1):0;return {...x,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12);
  }
  function openSearch(){
    if($('#searchBackdrop'))return;
    const backdrop=document.createElement('div');backdrop.id='searchBackdrop';backdrop.className='search-backdrop';backdrop.innerHTML=`<div class="search-dialog" role="dialog" aria-label="Search all notes" aria-modal="true"><div class="search-box">${icons.search}<input id="searchInput" type="search" autocomplete="off" placeholder="Search any topic, formula, term..." aria-label="Search notes"><kbd>ESC</kbd></div><div class="search-results" id="searchResults"></div><div class="search-help">Type to search chapter names and full section text · Select a result to jump to it</div></div>`;
    document.body.append(backdrop);const input=$('#searchInput');const results=$('#searchResults');
    const show=()=>{const hits=searchHits(input.value);results.innerHTML=hits.length?hits.map((x,i)=>`<button type="button" class="search-hit" data-pos="${i}"><small>${escapeHTML(x.group)}</small><strong>${escapeHTML(x.title)}</strong>${x.text?`<p>${escapeHTML(x.text.slice(0,180))}${x.text.length>180?'…':''}</p>`:''}</button>`).join(''):'<div class="search-empty">No matches. Try another term.</div>';
      $$('.search-hit',results).forEach(b=>b.addEventListener('click',()=>{const x=hits[Number(b.dataset.pos)];closeSearch();location.hash=`#/${x.slug}${x.section?'/'+x.section:''}`;if(activeSlug===x.slug&&x.section)goToSection(x.section);}));};
    backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeSearch();});
    input.addEventListener('input',show);input.addEventListener('keydown',e=>{if(e.key==='Enter'){const btn=$('.search-hit',results);if(btn)btn.click();}});
    show();input.focus();
  }
  function closeSearch(){const el=$('#searchBackdrop');if(el)el.remove();}
  function bindTools(){
    const caesarInput=$('#caesarInput'), shift=$('#caesarShift');
    if(caesarInput&&shift){const update=()=>{const k=Number(shift.value);$('#shiftOut').textContent=k;$('#caesarOutput').textContent=caesarInput.value.replace(/[a-z]/gi,ch=>{const upper=ch.toUpperCase();return String.fromCharCode((upper.charCodeAt(0)-65+k)%26+65).replace(/^./, c => ch===ch.toLowerCase()?c.toLowerCase():c);});};caesarInput.addEventListener('input',update);shift.addEventListener('input',update);update();}
    if($('#gcdRun')){$('#gcdRun').addEventListener('click',()=>{let a=Number($('#gcdA').value),b=Number($('#gcdB').value);if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<1||b<1||a>1e9||b>1e9){$('#gcdResult').textContent='Use positive whole numbers below 1,000,000,001.';return;}if(a<b)[a,b]=[b,a];const lines=[];while(b!==0){const q=Math.floor(a/b),r=a%b;lines.push(`${a} = ${q} × ${b} + ${r}`);a=b;b=r;}lines.push(`GCD = ${a} (last nonzero remainder)`);$('#gcdResult').textContent=lines.join('\n');});$('#gcdRun').click();}
    if($('#rsaRun')){$('#rsaRun').addEventListener('click',()=>{
      const p=Number($('#rsaP').value),q=Number($('#rsaQ').value),e=Number($('#rsaE').value),m=Number($('#rsaM').value),out=$('#rsaResult');
      const prime=x=>Number.isInteger(x)&&x>=2&&Array.from({length:Math.floor(Math.sqrt(x))-1},(_,i)=>i+2).every(d=>x%d!==0);
      if (![p,q,e,m].every(Number.isSafeInteger)||p>500||q>500||p===q||!prime(p)||!prime(q)){out.textContent='Choose two different primes between 2 and 500.';return;}
      const n=p*q,phi=(p-1)*(q-1);let a=e,b=phi;while(b!==0){[a,b]=[b,a%b];}if(e<=1||e>=phi||a!==1||m<0||m>=n){out.textContent=`Need 1 < e < φ(n) = ${phi}, gcd(e, φ(n)) = 1, and 0 ≤ M < n (${n}).`;return;}
      const E=BigInt(e),N=BigInt(n),M=BigInt(m);let d=1;while((e*d)%phi!==1&&d<=phi)d++;
      function powMod(a,k,mod){a%=mod;let r=1n;while(k>0n){if(k&1n)r=r*a%mod;a=a*a%mod;k>>=1n;}return r;}
      const c=powMod(M,E,N),original=powMod(c,BigInt(d),N);
      out.textContent=`p = ${p}, q = ${q}\nn = p × q = ${n}\nφ(n) = (${p}-1) × (${q}-1) = ${phi}\nPublic key: (e,n) = (${e},${n})\nPrivate exponent: d = ${d} (because ${e}×${d} mod ${phi} = 1)\nEncrypt: ${m}^${e} mod ${n} = ${c}\nDecrypt: ${c}^${d} mod ${n} = ${original}`;
    });$('#rsaRun').click();}
  }
  const questions = [
    ['What does the C in CIA stand for?',['Correctness','Confidentiality','Compliance','Control'],1,'Confidentiality means that only authorized parties can access information.'],
    ['A student can log in but cannot edit grades. Which concept controls the edit permission?',['Authentication','Availability','Authorization','Non-repudiation'],2,'Authorization determines what an authenticated user may do.'],
    ['Which is a vulnerability?',['A database','An unpatched operating system','A criminal group','A backup'],1,'A vulnerability is an exploitable weakness, such as unpatched software.'],
    ['What is the best label for an employee who accidentally makes a private cloud folder public?',['Malicious insider','Negligent insider','External attacker','Physical threat'],1,'It is an unintentional error by a trusted insider.'],
    ['An attacker claims to be your manager and demands an immediate password reset. Which triggers?',['Integrity and availability','Authority and urgency','Redundancy and privacy','Encryption and hashing'],1,'Social engineers often combine pressure from apparent authority and time.'],
    ['What does an IPS generally do beyond IDS detection?',['Back up files','Block selected suspicious activity','Issue public-key certificates','Replace user passwords'],1,'An intrusion prevention system may actively block suspicious traffic.'],
    ['Why is ECB mode often undesirable?',['It always needs an RSA key','Repeated plaintext blocks reveal repeated patterns','It hides file sizes perfectly','It provides digital signatures'],1,'ECB treats blocks independently, leaking equal-block patterns.'],
    ['Which of these is a symmetric block cipher?',['SHA-256','HMAC','AES','RSA'],2,'AES is a symmetric block cipher with a 128-bit block size.'],
    ['What is the effective key length of DES?',['40 bits','56 bits','64 bits','128 bits'],1,'DES stores 64 bits including 8 parity bits, leaving 56 key bits.'],
    ['What is AES-256’s block size?',['64 bits','128 bits','192 bits','256 bits'],1,'All standardized AES variants operate on 128-bit blocks. AES-256 refers to its key length.'],
    ['What does the RSA expression n = pq mean?',['The hash of the message','Product of two primes','Number of users','A symmetric session key'],1,'n is the modulus made by multiplying the two RSA primes.'],
    ['For RSA p=11 and q=17, what is φ(n)?',['17','23','160','187'],2,'φ(11×17)=(11−1)(17−1)=10×16=160.'],
    ['What is gcd(8,15)?',['1','3','5','8'],0,'8 and 15 share no positive divisor except 1: they are coprime.'],
    ['Which key does Bob use to decrypt a message encrypted with Bob’s public key?',["Alice's private key","Bob's private key","Bob's public key","The CA's private key"],1,'Only Bob should hold the private key corresponding to his public key.'],
    ['Which key does Alice normally use to create her digital signature?',["Bob's public key","Alice's public key","Alice's private key","The TLS session key"],2,'The private signing key creates the signature. The public key verifies it.'],
    ['What does a CA do in PKI?',['Select everyone’s passwords','Sign identity-to-public-key certificates','Decrypt all TLS traffic','Calculate file hashes only'],1,'A CA signs certificates to assert a checked binding between identity/name and public key.'],
    ['Which statement about collisions in hashes is correct?',['They are mathematically impossible','Any SHA-256 hash is reversible','They exist, but should be hard to find','A hash always hides a message'],2,'Fixed-size outputs mean collisions exist; secure hashes make finding them computationally difficult.'],
    ['What does HMAC need besides a message and a hash function?',['A secret key','A CA certificate','An RSA modulus','A second plaintext'],0,'HMAC adds a shared secret key to provide message authentication.'],
    ['Which is NOT one of the four main risk responses?',['Avoid','Mitigate','Accept','Ignore without decision'],3,'The usual set is avoid, mitigate, transfer/share, and accept.'],
    ['In incident response, what is containment?',['Write post-incident lessons','Limit immediate spread and damage','Restore all IT services','Create a CA hierarchy'],1,'Containment limits the incident while investigation and eradication continue.'],
    ['What does the A in RACI mean?',['Authorized','Audited','Accountable','Available'],2,'Accountable is the person ultimately answerable for the task or decision.'],
    ['How does business continuity differ from disaster recovery?',['Continuity is broader; DR restores IT','Continuity only restores disks','They are exactly identical','DR only handles human mistakes'],0,'Business continuity keeps essential operations going; disaster recovery focuses on restoring technology and data.']
  ];
  function setupQuiz(){quizState={question:0,answers:[],show:false};renderQuiz();}
  function renderQuiz(){const root=$('#quizRoot');if(!root)return;const state=quizState;if(state.question>=questions.length){const score=state.answers.reduce((s,a,i)=>s+(a===questions[i][2]?1:0),0);localSet('infosec-last-quiz-v1',{score,total:questions.length});root.innerHTML=`<div class="quiz-card quiz-finish"><span class="eyebrow">PRACTICE COMPLETE</span><strong>${score} / ${questions.length}</strong><p>${score>=19?'Strong recall. Review any explanations you missed.':'Use the relevant chapters to revisit missed concepts, then try again.'}</p><button class="tool-button" id="quizReset">Try again</button></div>`;$('#quizReset').addEventListener('click',setupQuiz);return;}
    const i=state.question,q=questions[i],selected=state.answers[i];root.innerHTML=`<div class="quiz-progress"><span>Question ${i+1} of ${questions.length}</span><strong>${state.answers.reduce((s,a,k)=>s+(a===questions[k][2]?1:0),0)} correct so far</strong></div><div class="progress-track" style="margin:0 0 17px"><div class="progress-fill" style="width:${i/questions.length*100}%"></div></div><div class="quiz-card"><div class="quiz-question">${escapeHTML(q[0])}</div>${q[1].map((v,j)=>`<button class="quiz-option ${state.show?(j===q[2]?'correct':j===selected?'wrong':''):''}" data-choice="${j}" ${state.show?'disabled':''}><span>${String.fromCharCode(65+j)}</span>${escapeHTML(v)}</button>`).join('')}${state.show?`<div class="quiz-answer"><strong>${selected===q[2]?'✓ Correct.':'Explanation'}</strong><br>${escapeHTML(q[3])}</div>`:''}<button type="button" class="quiz-next" id="quizNext" ${!state.show?'disabled':''}>${i===questions.length-1?'View score':'Next question →'}</button></div>`;
    $$('.quiz-option',root).forEach(btn=>btn.addEventListener('click',()=>{state.answers[i]=Number(btn.dataset.choice);state.show=true;renderQuiz();}));$('#quizNext').addEventListener('click',()=>{if(state.show){state.question++;state.show=false;renderQuiz();const quizTop=$('#quizRoot');if(quizTop){const y=quizTop.getBoundingClientRect().top+scrollY-120;if(y<scrollY-250)scrollTo({top:y,behavior:'smooth'});}}});
  }
  function init(){buildIndex();render();}
  window.addEventListener('hashchange',render);
  document.addEventListener('keydown',e=>{const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}else if(e.key==='/'&&!typing&&!$('#searchBackdrop')){e.preventDefault();openSearch();}else if(e.key==='Escape'){closeSearch();if($('#sidebar'))$('#sidebar').classList.remove('open');}});
  document.addEventListener('click',e=>{if($('#sidebar')?.classList.contains('open')&&!e.target.closest('#sidebar')&&!e.target.closest('#menuBtn'))$('#sidebar').classList.remove('open');});
  init();
})();
