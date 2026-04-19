(function(){

var _t=function(s){var k='ab7!p0rt@xq9';var c=k+s+k;var h=0;for(var i=0;i<c.length;i++){h=(Math.imul(31,h)+c.charCodeAt(i))|0;}return(h>>>0).toString(16).padStart(8,'0');};
var _v=_t('\x37\x30\x30\x32');

var _sk='ab_gb_v1';

function _save(d){try{var j=JSON.stringify(d);if(j.length<4194304){localStorage.setItem(_sk,j);}else{localStorage.setItem(_sk,JSON.stringify(d.map(function(n){return{name:n.name,msg:n.msg||null,sketch:null,color:n.color||'sn-yellow'};})));}}catch(e){}}

function _load(){try{var r=localStorage.getItem(_sk);if(!r)return[];var p=JSON.parse(r);return Array.isArray(p)?p:[];}catch(e){return[];}}

document.addEventListener('contextmenu',function(e){e.preventDefault();});
document.addEventListener('keydown',function(e){if((e.ctrlKey&&['u','s','a','p'].includes(e.key.toLowerCase()))||(e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(e.key.toLowerCase()))||e.key==='F12')e.preventDefault();});
document.addEventListener('selectstart',function(e){e.preventDefault();});
document.addEventListener('dragstart',function(e){e.preventDefault();});
document.addEventListener('copy',function(e){e.preventDefault();});

var _lm=false;
window.toggleMode=function(){_lm=!_lm;document.getElementById('pf').classList.toggle('light-mode',_lm);document.body.classList.toggle('light-mode',_lm);};

var _gc='!<>-_\\/[]{}—=+*^?#@$%&αβγδ░▒▓';
var _gr=['নমস্কার,','Hello,','नमस्ते,','السلام علیکم,','Bonjour,'];
var _gel=document.getElementById('greeting');
var _gi=0;
function _rg(){return _gc[Math.floor(Math.random()*_gc.length)];}
function _glitch(t){var len=Math.max(_gel.textContent.length,t.length);var f=0;var iv=setInterval(function(){f++;var p=f/10;var r='';for(var i=0;i<len;i++){r+=i<t.length?(Math.random()<p?t[i]:_rg()): '';}  _gel.textContent=r;_gel.setAttribute('data-text',r);if(f>=10){clearInterval(iv);_gel.textContent=t;_gel.setAttribute('data-text',t);}},35);_gel.classList.add('glitching');setTimeout(function(){_gel.classList.remove('glitching');},410);}
setInterval(function(){_gi=(_gi+1)%_gr.length;_glitch(_gr[_gi]);},2800);

function _clock(){var t=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:'America/New_York'});document.getElementById('clock').textContent=t+' EST';}
_clock();setInterval(_clock,1000);

var _proj=[
  {title:'Your Daily Dough',desc:'Currently in production. Your Daily Dough is a human-centered personal finance web app designed around how people actually feel about money — not just how they spend it. Rather than cold dashboards and numbers, it focuses on emotional check-ins, gentle nudges, and intuitive budgeting that meets users where they are. Built with accessibility and warmth at its core.',images:['your daily dough design/1.png','your daily dough design/2.png','your daily dough design/3.png','your daily dough design/4.png','your daily dough design/5.png','your daily dough design/6.png']},
  {title:'Notifi',desc:'A task-notification iOS app built with Swift and Xcode as a final project for Google Code Next. Designed with a clean, minimal interface and early-stage ML planning for personalized, context-aware reminders that adapt to how you work.',images:['notifi design/1.jpg','notifi design/2.jpg','notifi design/3.jpg']},
  {title:'Intellect',desc:'Congressional App Challenge 2024 winner. Intellect is a civic education app designed to make civic education feel less intimidating and more personal — built for young people who want to engage with government and their rights but do not know where to start. Human-centered from the ground up.',images:['intellect design/1.png','intellect design/2.png','intellect design/3.png','intellect design/4.png','intellect design/5.png']},
  {title:'Writing Portfolio',desc:'A curated collection of journalism, essays, and creative writing. Silver Key — Scholastic Arts and Writing Awards 2024.',images:[],links:[{label:'A Shift in Time: The Trad-wives Trend',url:'https://publuu.com/flip-book/96328/1430954/page/46'}]}
];


function _hw(){var w=document.getElementById('sticky-wall');if(w)w.style.visibility='hidden';}
function _sw(){var w=document.getElementById('sticky-wall');if(w)w.style.visibility='visible';}

var _cp=0,_cs=0;

function _rp(){var p=_proj[_cp];document.getElementById('proj-title').textContent=p.title;document.getElementById('proj-desc').textContent=p.desc;document.getElementById('proj-pager').textContent=(_cp+1)+' / '+_proj.length;var pv=document.getElementById('proj-prev'),nx=document.getElementById('proj-next');pv.style.color=_cp===0?'#252422':'';pv.style.pointerEvents=_cp===0?'none':'';nx.style.color=_cp===_proj.length-1?'#252422':'';nx.style.pointerEvents=_cp===_proj.length-1?'none':'';_cs=0;_bs(p);}

function _bs(p){var w=document.getElementById('proj-slide-wrap'),d=document.getElementById('proj-dots');w.innerHTML='';d.innerHTML='';
  if(p.links&&p.links.length){w.classList.add('links-mode');var ll=document.createElement('div');ll.className='proj-link-list';p.links.forEach(function(item){var a=document.createElement('a');a.className='proj-link-item';a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.innerHTML='<span class="proj-link-label">'+item.label+'</span><span class="proj-link-arr">↗</span>';ll.appendChild(a);});w.appendChild(ll);return;}
  w.classList.remove('links-mode');
  if(!p.images||!p.images.length){var ph=document.createElement('div');ph.className='proj-slide-placeholder active';ph.innerHTML='<div class="proj-slide-placeholder-text">no images yet</div>';w.appendChild(ph);return;}
  p.images.forEach(function(src,i){var img=document.createElement('img');img.className='proj-slide'+(i===0?' active':'');img.src=src;img.alt=p.title+' '+(i+1);w.appendChild(img);});
  var lb=document.createElement('button');lb.className='slide-arrow left';lb.innerHTML='&#8249;';lb.id='slide-left';lb.onclick=function(e){e.stopPropagation();_sn(-1);};w.appendChild(lb);
  var rb=document.createElement('button');rb.className='slide-arrow right';rb.innerHTML='&#8250;';rb.id='slide-right';rb.onclick=function(e){e.stopPropagation();_sn(1);};w.appendChild(rb);
  p.images.forEach(function(_,i){(function(idx){var dot=document.createElement('div');dot.className='proj-dot'+(idx===0?' active':'');dot.onclick=function(){_gs(idx);};d.appendChild(dot);})(i);});
  _ua(p);}

function _sn(dir){var p=_proj[_cp];var tot=p.images?p.images.length:0;if(!tot)return;var nx=_cs+dir;if(nx<0||nx>=tot)return;_gs(nx);}
function _gs(idx){var w=document.getElementById('proj-slide-wrap'),d=document.getElementById('proj-dots');w.querySelectorAll('.proj-slide').forEach(function(s,i){s.classList.toggle('active',i===idx);});d.querySelectorAll('.proj-dot').forEach(function(dot,i){dot.classList.toggle('active',i===idx);});_cs=idx;_ua(_proj[_cp]);}
function _ua(p){var l=document.getElementById('slide-left'),r=document.getElementById('slide-right');if(!l||!r)return;var tot=p.images?p.images.length:0;l.disabled=_cs===0;r.disabled=!tot||_cs===tot-1;}

window.openProject=function(i){_hw();_cp=i;_rp();document.getElementById('proj-overlay').classList.add('open');};
window.closeProject=function(){document.getElementById('proj-overlay').classList.remove('open');_sw();};
window.handleProjOverlay=function(e){if(e.target===document.getElementById('proj-overlay'))window.closeProject();};
window.projNav=function(d){var n=_cp+d;if(n<0||n>=_proj.length)return;_cp=n;_rp();};

var _exp=[
  {title:'Web & Digital Marketing Student Assistant @ SBU',meta:'New York, US · Present',bullets:['Redesigned and developed 70+ web pages to improve usability, visual consistency, and responsiveness','Applied accessibility best practices (WCAG-aligned) to enhance navigation, readability, and user experience across student-facing content','Collaborated with teams across Student Affairs to translate administrative needs into clean, functional, and accessible web solutions']},
  {title:'Research & Marketing Intern',meta:'New York, US · 2 mos',bullets:['Researched and developed marketing strategies supporting expansion into the Rochester homecare market.','Organized and maintained applicant tracking systems for 100+ candidates across LPN, RN, and HHA roles.','Supported staffing pipeline planning and structured data systems for new market launch operations @ Rochester']},
  {title:'Application Development Intern — NYC Dept. of Records and Information',meta:'New York, US · 2 mos',bullets:['Developed a web application using Flask, demonstrating proficiency in Python-based frameworks.','Enhanced the NYC DoRIS Intranet website with new features and functionalities.','Shadowed developers to integrate new features effectively and gain practical knowledge.','Applied strong problem-solving skills and attention to detail across various projects.']},
  {title:'Awards & Recognition',meta:'',bullets:['Ssassy Scholarship Winner 2026','DC 37 Scholarship Winner 2025','Congressional App Challenge 2024 for app "Intellect"','Scholastic Arts and Writing Awards: Silver Key (2024), Honorable Mention (2023)']}
];
var _ce=0;
function _re(){var e=_exp[_ce];document.getElementById('exp-title').textContent=e.title;document.getElementById('exp-meta').textContent=e.meta;document.getElementById('exp-pager').textContent=(_ce+1)+' / '+_exp.length;var pv=document.getElementById('exp-prev'),nx=document.getElementById('exp-next');pv.style.color=_ce===0?'#252422':'';pv.style.pointerEvents=_ce===0?'none':'';nx.style.color=_ce===_exp.length-1?'#252422':'';nx.style.pointerEvents=_ce===_exp.length-1?'none':'';var ul=document.getElementById('exp-bullets');ul.innerHTML='';e.bullets.forEach(function(b){var li=document.createElement('li');li.textContent=b;ul.appendChild(li);});}
window.openExp=function(i){_hw();_ce=i;_re();document.getElementById('exp-overlay').classList.add('open');};
window.closeExp=function(){document.getElementById('exp-overlay').classList.remove('open');_sw();};
window.handleExpOverlay=function(e){if(e.target===document.getElementById('exp-overlay'))window.closeExp();};
window.expNav=function(d){var n=_ce+d;if(n<0||n>=_exp.length)return;_ce=n;_re();};

var _sec=[
  {title:'Computer Engineering',courses:['CSE 114: Introduction to Object-Oriented Programming','ESE 118: Digital Logic Design','ESE 123: Introduction to Electrical and Computer Engineering','ESE 124: Introduction to Digital Systems','ESE 271: Electrical Circuit Analysis']},
  {title:'Miscellaneous',courses:['AMS 151: Applied Calculus I','WRT 102: Intermediate Writing Workshop','AFH 101: Introduction to Asian and Asian American Studies','PHY 131/133: Classical Physics I','PHY 132/134: Classical Physics II','PSY 103: Introduction to Psychology','WRT 488: Writing Internship']}
];
var _csc=0;
function _rc(){var s=_sec[_csc];document.getElementById('cmodal-title').textContent=s.title;document.getElementById('mpager').textContent=(_csc+1)+' / '+_sec.length;var pv=document.getElementById('mprev'),nx=document.getElementById('mnext');pv.style.color=_csc===0?'#252422':'';pv.style.pointerEvents=_csc===0?'none':'';nx.style.color=_csc===_sec.length-1?'#252422':'';nx.style.pointerEvents=_csc===_sec.length-1?'none':'';var el=document.getElementById('cmodal-tags');el.innerHTML='';s.courses.forEach(function(c){var t=document.createElement('div');t.className='ctag';t.textContent=c;el.appendChild(t);});}
window.openCourse=function(i){_hw();_csc=i;_rc();document.getElementById('course-overlay').classList.add('open');};
window.closeCourse=function(){document.getElementById('course-overlay').classList.remove('open');_sw();};
window.handleCourseOverlay=function(e){if(e.target===document.getElementById('course-overlay'))window.closeCourse();};
window.courseNav=function(d){var n=_csc+d;if(n<0||n>=_sec.length)return;_csc=n;_rc();};

var _notes=_load();
if(_notes.length>0){setTimeout(function(){_rn();},0);}
var _ism=false,_sdr=false,_sc,_sx;

function _ic(){_sc=document.getElementById('sketch-canvas');_sx=_sc.getContext('2d');var r=_sc.getBoundingClientRect();_sc.width=r.width||500;_sc.height=r.height||260;_sx.strokeStyle=document.getElementById('pf').classList.contains('light-mode')?'#111110':'#e8e6e0';_sx.lineWidth=1.8;_sx.lineCap='round';_sx.lineJoin='round';}
function _gp(e,c){var r=c.getBoundingClientRect();var s=e.touches?e.touches[0]:e;return{x:s.clientX-r.left,y:s.clientY-r.top};}
function _bc(){_sc.addEventListener('mousedown',function(e){_sdr=true;var p=_gp(e,_sc);_sx.beginPath();_sx.moveTo(p.x,p.y);});_sc.addEventListener('mousemove',function(e){if(!_sdr)return;var p=_gp(e,_sc);_sx.lineTo(p.x,p.y);_sx.stroke();});_sc.addEventListener('mouseup',function(){_sdr=false;});_sc.addEventListener('mouseleave',function(){_sdr=false;});_sc.addEventListener('touchstart',function(e){e.preventDefault();_sdr=true;var p=_gp(e,_sc);_sx.beginPath();_sx.moveTo(p.x,p.y);},{passive:false});_sc.addEventListener('touchmove',function(e){e.preventDefault();if(!_sdr)return;var p=_gp(e,_sc);_sx.lineTo(p.x,p.y);_sx.stroke();},{passive:false});_sc.addEventListener('touchend',function(){_sdr=false;});}

function _sp(show,hide){show.style.display='flex';show.style.flex='1';show.style.minHeight='0';hide.style.display='none';}

window.toggleSketchMode=function(){_ism=!_ism;var ne=document.getElementById('note-mode'),se=document.getElementById('sketch-mode'),tb=document.getElementById('sketch-toggle-btn'),cb=document.getElementById('sketch-clear-btn'),ti=document.getElementById('guest-modal-title');if(_ism){_sp(se,ne);tb.textContent='WRITE INSTEAD →';cb.style.display='inline';ti.textContent='Leave me a sketch.';setTimeout(function(){_ic();_bc();},30);}else{_sp(ne,se);tb.textContent='SKETCH INSTEAD →';cb.style.display='none';ti.textContent='Leave me a note.';}};

window.clearSketch=function(){if(_sx)_sx.clearRect(0,0,_sc.width,_sc.height);};

window.openGuest=function(){_ism=false;var ne=document.getElementById('note-mode'),se=document.getElementById('sketch-mode');ne.style.display='flex';ne.style.flex='1';ne.style.minHeight='0';se.style.display='none';document.getElementById('sketch-toggle-btn').textContent='SKETCH INSTEAD →';document.getElementById('sketch-clear-btn').style.display='none';document.getElementById('guest-modal-title').textContent='Leave me a note.';document.getElementById('g-name').value='';document.getElementById('g-msg').value='';var rn=document.getElementById('name-row-note'),rs=document.getElementById('name-row-sketch');if(rn)rn.classList.remove('name-warn');if(rs)rs.classList.remove('name-warn');document.getElementById('guest-overlay').classList.add('open');setTimeout(function(){document.getElementById('g-name').focus();},100);};
window.closeGuest=function(){document.getElementById('guest-overlay').classList.remove('open');};
window.handleGuestOverlay=function(e){if(e.target===document.getElementById('guest-overlay'))window.closeGuest();};

var _lc=['sn-yellow','sn-pink','sn-blue'];
function _rlc(){return _lc[Math.floor(Math.random()*_lc.length)];}

function _warnName(rowId,inputId){var row=document.getElementById(rowId);if(!row)return;row.classList.add('name-warn');var inp=document.getElementById(inputId);if(!inp)return;inp.focus();inp.addEventListener('focus',function(){row.classList.remove('name-warn');},{once:true});}
window.submitNote=function(){var col=_rlc();if(_ism){var nm=document.getElementById('g-name-sketch').value.trim();if(!nm){_warnName('name-row-sketch','g-name-sketch');return;}if(!_sc)return;var du=_sc.toDataURL();_notes.unshift({name:nm,sketch:du,color:col});}else{var nm=document.getElementById('g-name').value.trim(),ms=document.getElementById('g-msg').value.trim();if(!nm){_warnName('name-row-note','g-name');return;}if(!ms)return;_notes.unshift({name:nm,msg:ms,color:col});}_save(_notes);_rn();window.closeGuest();};

function _rb(a,b){return a+Math.random()*(b-a);}
function _gsp(i,tot,W,H,sz){var M=10,cols=Math.ceil(Math.sqrt(tot)),rows=Math.ceil(tot/cols),cW=(W-M*2)/cols,cH=(H-M*2)/rows,col=i%cols,row=Math.floor(i/cols),bX=M+col*cW+(cW-sz)/2,bY=M+row*cH+(cH-sz)/2;return{x:Math.min(Math.max(M,bX+_rb(-cW*.12,cW*.12)),W-sz-M),y:Math.min(Math.max(M,bY+_rb(-cH*.12,cH*.12)),H-sz-M)};}

function _md(card,wall){var sX,sY,sL,sT,dr=false;function dn(e){dr=true;var s=e.touches?e.touches[0]:e;sX=s.clientX;sY=s.clientY;sL=parseFloat(card.style.left)||0;sT=parseFloat(card.style.top)||0;card.style.zIndex=999;card.style.transition='none';e.stopPropagation();}function mv(e){if(!dr)return;e.preventDefault();var s=e.touches?e.touches[0]:e,dx=s.clientX-sX,dy=s.clientY-sY,wr=wall.getBoundingClientRect(),sz=card.offsetWidth;card.style.left=Math.min(Math.max(0,sL+dx),wr.width-sz)+'px';card.style.top=Math.min(Math.max(0,sT+dy),wr.height-sz)+'px';}function up(e){if(!dr)return;dr=false;card.style.transition='';var s=e.changedTouches?e.changedTouches[0]:e;if(Math.abs(s.clientX-sX)+Math.abs(s.clientY-sY)<5)return;e.stopPropagation();}card.addEventListener('mousedown',dn);card.addEventListener('touchstart',dn,{passive:false});window.addEventListener('mousemove',mv);window.addEventListener('touchmove',mv,{passive:false});window.addEventListener('mouseup',up);window.addEventListener('touchend',up);}

function _rn(){var area=document.getElementById('g-notes-area'),ph=document.getElementById('g-placeholder');if(ph)ph.remove();var wall=document.getElementById('sticky-wall');if(!wall){wall=document.createElement('div');wall.id='sticky-wall';wall.className='sticky-wall';area.appendChild(wall);}wall.innerHTML='';var vis=_notes.slice(0,10),W=wall.offsetWidth||220,H=wall.offsetHeight||260,SZ=72;vis.forEach(function(n,i){var card=document.createElement('div');card.className='sticky-note';var pos=_gsp(i,vis.length,W,H,SZ),rot=_rb(-6,6);card.style.left=pos.x+'px';card.style.top=pos.y+'px';card.style.transform='rotate('+rot+'deg)';card.style.zIndex=i+1;if(n.color)card.classList.add(n.color);var inn=document.createElement('div');inn.className='sticky-note-inner';var nm=document.createElement('div');nm.className='sticky-note-name';nm.textContent=n.name;inn.appendChild(nm);if(n.sketch){var img=document.createElement('img');img.className='sticky-sketch-thumb';img.src=n.sketch;img.alt='sketch';inn.appendChild(img);}else{var ms=document.createElement('div');ms.className='sticky-note-msg';ms.textContent=n.msg;inn.appendChild(ms);}card.appendChild(inn);_md(card,wall);card.addEventListener('click',function(){_ol(n);});wall.appendChild(card);});}

var _cln=null;

window.openLightbox=function(n){_cln=n;document.getElementById('lightbox-name').textContent=n.name;var me=document.getElementById('lightbox-msg'),ie=document.getElementById('lightbox-img');if(n.sketch){me.style.display='none';ie.style.display='block';ie.src=n.sketch;}else{ie.style.display='none';me.style.display='block';me.textContent=n.msg;}_cdp();var lbc=document.getElementById('lightbox-card');lbc.classList.remove('sn-yellow','sn-pink','sn-blue');if(n.color)lbc.classList.add(n.color);var wall=document.getElementById('sticky-wall');if(wall)wall.style.visibility='hidden';document.getElementById('note-lightbox').classList.add('open');};
var _ol=window.openLightbox;

window.closeLightbox=function(){document.getElementById('note-lightbox').classList.remove('open');_cdp();var wall=document.getElementById('sticky-wall');if(wall)wall.style.visibility='visible';_cln=null;};
window.handleLightboxClick=function(e){if(e.target===document.getElementById('note-lightbox'))window.closeLightbox();};

window.openDeletePrompt=function(){var p=document.getElementById('delete-prompt');document.getElementById('delete-pw').value='';document.getElementById('delete-error').classList.remove('show');p.classList.add('open');setTimeout(function(){document.getElementById('delete-pw').focus();},60);};
function _cdp(){var p=document.getElementById('delete-prompt');if(p){p.classList.remove('open');document.getElementById('delete-pw').value='';document.getElementById('delete-error').classList.remove('show');}}
window.closeDeletePrompt=_cdp;

window.confirmDelete=function(){var pw=document.getElementById('delete-pw').value;if(_t(pw)!==_v){document.getElementById('delete-error').classList.add('show');document.getElementById('delete-pw').value='';return;}if(_cln){var i=_notes.indexOf(_cln);if(i!==-1){_notes.splice(i,1);_save(_notes);_rn();}}window.closeLightbox();};

document.addEventListener('keydown',function(e){if(e.key==='Escape'){window.closeProject();window.closeExp();window.closeCourse();window.closeGuest();window.closeLightbox();_sw();}});

}());