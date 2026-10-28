<write_file>
<path>app.js</path>
<content>
/* WebSpace — app.js */
(() => {
'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lowPower = (navigator.hardwareConcurrency || 4) <= 4;

function start(){
if (!window.gsap || !window.ScrollTrigger) {
console.warn('GSAP/ScrollTrigger не загрузились');
return;
}

/* ── ПРЕЛОАДЕР ── */
const preloader = $('#preloader');
const fill = $('#preloadFill');

function boot(){
gsap.registerPlugin(ScrollTrigger);
initLenis();
initProgress();
initReveal();
initCounters();
initParallax();
initMockup();
initWhyCards();
initFAQ();
initSideLabel();
initImage();
initDividers();
initFloatDecors();
initCardModal();
initCardEpicScreen();
ScrollTrigger.refresh();
}

let booted = false;

function hidePreloader(){
if (booted) return;
booted = true;

if (!preloader) return boot();
preloader.classList.add('is-done');
setTimeout(() => { preloader.hidden = true; }, 700);
boot();
heroIntro();

setTimeout(() => {
document.body.classList.add('is-loaded');
}, 100);
}

function heroIntro(){
const tl = gsap.timeline({ delay: .1 });
gsap.set('.hero__sub-name, .hero__phrase-line1, .hero__phrase-line2, .trustbar',
{ opacity: 0, y: 16 });
tl.to('.hero__sub-name', { opacity:1, y:0, duration:.6, ease:'power3.out' })
.to('.hero__phrase-line1', { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.35')
.to('.hero__phrase-line2', { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.45')
.to('.trustbar', { opacity:1, y:0, duration:.8, ease:'power3.out' }, '-=.5');
}

if (reduce) {
fill && (fill.style.transform = 'scaleX(1)');
setTimeout(hidePreloader, 200);
} else {
gsap.to(fill, { scaleX:1, duration:1.1, ease:'power2.inOut', onComplete: hidePreloader });
setTimeout(hidePreloader, 2600);
}

/* ── LENIS ── */
let lenis = null;
function initLenis(){
if (reduce || !window.Lenis) return;
lenis = new Lenis({
duration: 1.05,
easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
smoothWheel: true,
touchMultiplier: 1.6
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
}

/* ── ПРОГРЕСС ── */
function initProgress(){
const bar = $('#progress');
if (!bar) return;
const set = () => {
const max = document.documentElement.scrollHeight - innerHeight;
const p = max > 0 ? scrollY / max : 0;
bar.style.transform = scaleX(${p});
};
addEventListener('scroll', set, { passive:true });
set();
}

/* ── REVEAL ── */
function initReveal(){

('[data-reveal]').forEach(el => {
        if (reduce) return;
        const html = el.innerHTML;
        const parts = html.split(/<br\s*\/?>/i);

        el.innerHTML = parts.map(p => {
          const t = p.trim();
          return t ? `<span class="rl"><span>${t}</span></span>` : '';
        }).join('<br>');

        const lines =
if (!lines.length) return;

gsap.set(lines, { yPercent:112 });
const isHeading = /^(H1|H2|H3)$/.test(el.tagName);

gsap.to(lines, {
yPercent:0,
duration: isHeading ? 1 : .85,
ease:'power3.out',
stagger:.08,
scrollTrigger: { trigger: el, start:'top 88%', once:true }
});
});
}

/* ── СЧЁТЧИКИ ── */
function initCounters(){

('[data-count]').forEach(el => {
        const to = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const run = () => {
          if (reduce) { el.textContent = to + suffix; return; }
          const t0 = performance.now();
          const tick = now => {
            const p = Math.min((now - t0) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(to * e) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };
        ScrollTrigger.create({ trigger: el, start:'top 92%', once:true, onEnter: run });
      });
    }

    /* ── ПАРАЛЛАКС ФОНОВОЙ ТИПОГРАФИКИ ── */
    function initParallax(){
      if (reduce) return;
const depth = parseFloat(el.dataset.depth || '.15');
gsap.to(el, {
yPercent: -depth * 260, ease:'none',
scrollTrigger: {
trigger: el.closest('section') || el.parentElement,
start:'top bottom', end:'bottom top', scrub:.8
}
});
});

('.mesh__spot').forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 ? 25 : -25, ease:'none',
          scrollTrigger: {
            trigger: document.body,
            start:'top top', end:'bottom bottom', scrub:1.6
          }
        });
      });
    }

    /* ── МАКЕТ ── */
    function initMockup(){
      const frame = $('#mockupFrame');
      const wrap  = $('[data-mockup]');
      if (!frame || !wrap) return;

      if (!reduce) {
        gsap.to(frame, {
          rotationX: 0, rotationY: 0, ease:'none',
          scrollTrigger: {
            trigger: wrap, start:'top 85%', end:'top 25%', scrub:1
          }
        });
      }
      if (canHover) {
        wrap.addEventListener('mousemove', e => {
          const r = wrap.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5;
          const y = (e.clientY - r.top) / r.height - .5;
          gsap.to(frame, { rotationY: x * 10, rotationX: -y * 8, duration:.5, ease:'power2.out' });
        });
        wrap.addEventListener('mouseleave', () => {
          gsap.to(frame, { rotationY: 0, rotationX: 0, duration:.7, ease:'elastic.out(1,.6)' });
        });
      }
    }

    /* ── WHY-КАРТОЧКИ ── */
    function initWhyCards(){
      const cards =
if (!cards.length) return;
gsap.set(cards, { opacity: 0, y: 40 });
ScrollTrigger.batch(cards, {
start:'top 92%',
onEnter: batch => gsap.to(batch, {
opacity:1, y:0, duration:.7, stagger:.09, ease:'power3.out'
})
});
}

/* ── FAQ ── */
function initFAQ(){
const items = $$('.faq__item');

if (!items.length) {
return;
}

items.forEach((item, index) => {
const btn = item.querySelector('.faq__q');
if (!btn) {
return;
}

btn.onclick = function() {
const wasOpen = item.classList.contains('open');

items.forEach(other => {
other.classList.remove('open');
const otherBtn = other.querySelector('.faq__q');
if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
});

if (!wasOpen) {
item.classList.add('open');
btn.setAttribute('aria-expanded', 'true');
}
};
});
}

/* ── БОКОВАЯ МЕТКА ── */
function initSideLabel(){
const label = $('#sideLabel');
if (!label) return;
const map = [
{ sel:'#hero', text:'НАЧАЛО' },
{ sel:'#manifesto', text:'ЗАЧЕМ' },
{ sel:'#showcase', text:'КЕЙС' },
{ sel:'#testimonial', text:'ОТЗЫВ' },
{ sel:'#why', text:'ПОЧЕМУ Я' },
{ sel:'#process', text:'ПРОЦЕСС' },
{ sel:'#faq', text:'ВОПРОСЫ' },
{ sel:'#cta', text:'КОНТАКТЫ' }
];
map.forEach(({ sel, text }) => {
const el = $(sel);
if (!el) return;
ScrollTrigger.create({
trigger: el, start:'top center', end:'bottom center',
onEnter: () => label.textContent = text,
onEnterBack: () => label.textContent = text
});
});
}

/* ── КАРТИНКА КЕЙСА ── */
function initImage(){
const shot = $('#shot');
const img = $('#shotImg');
if (!shot || !img) return;
const onLoad = () => shot.classList.add('is-loaded');
const onMissing = () => shot.classList.add('is-loaded','is-missing');
if (img.complete && img.naturalWidth > 0) onLoad();
else {
img.addEventListener('load', onLoad);
img.addEventListener('error', onMissing);
}
}

/* ── РАЗДЕЛИТЕЛИ ── */
function initDividers(){

('.divider').forEach(d => {
        ScrollTrigger.create({
          trigger: d, start:'top 88%', once:true,
          onEnter: () => d.classList.add('is-in')
        });
      });
    }

    /* ── ПЛАВАЮЩИЕ ДЕКОРЫ ── */
    function initFloatDecors(){
ScrollTrigger.create({
trigger: el,
start:'top 92%',
once:true,
onEnter: () => el.classList.add('is-visible')
});
});
}

/* ── МОДАЛКА ВИЗИТКИ ── */
function initCardModal(){
const overlay = $('#modalOverlay');
const closeBtn = $('#modalClose');
const ctaBtn = $('#modalCta');
if (!overlay) return;

const urlParams = new URLSearchParams(window.location.search);
const isFromCard = urlParams.has('card');

if (!isFromCard) return;

const close = () => {
overlay.classList.remove('is-visible');
};

closeBtn && closeBtn.addEventListener('click', close);
ctaBtn && ctaBtn.addEventListener('click', close);
overlay.addEventListener('click', e => {
if (e.target === overlay) close();
});

setTimeout(() => {
overlay.classList.add('is-visible');
}, 2200);
}

/* ── ФУЛЛСКРИН INTRO ВИЗИТКИ (Three.js 3D + GSAP) ── */
function initCardEpicScreen(){
const screen = $('#cardScreen');
if (!screen) return;

const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has('card')) return;

const canvas = $('#cardCanvas');
const closeBtn = $('#cardScreenClose');
const skipBtn = $('#csSkip');
const ctaBtn = $('#csCta');

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/* 1. THREE.JS 3D КИТ */
let renderer, scene, camera, whale, clock;

async function initThree(){
if (!window.THREE) return;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 80, 400);

clock = new THREE.Clock();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xff9eb0, 1.2);
spotLight.position.set(200, 300, 200);
spotLight.castShadow = !isMobileDevice;
scene.add(spotLight);

const fillLight = new THREE.DirectionalLight(0x9C4250, 0.6);
fillLight.position.set(-150, 100, -100);
scene.add(fillLight);

const loader = new window.GLTFLoader();

try {
const gltf = await new Promise((resolve, reject) => {
loader.load(
'whale/scene.gltf',
resolve,
undefined,
reject
);
});

whale = gltf.scene;

const box = new THREE.Box3().setFromObject(whale);
const size = box.getSize(new THREE.Vector3());
const maxDim = Math.max(size.x, size.y, size.z);
const targetSize = 1000;
const scaleFactor = targetSize / maxDim;
whale.scale.setScalar(scaleFactor);

const center = box.getCenter(new THREE.Vector3());
whale.position.sub(center.multiplyScalar(scaleFactor));

whale.position.set(-1000, -190, -150);
whale.rotation.y = Math.PI / 2;

whale.traverse(child => {
if (child.isMesh) {
child.material.color = new THREE.Color(0x8a4452);
child.material.emissive = new THREE.Color(0x3D1118);
child.material.emissiveIntensity = 0.4;
child.material.roughness = 0.6;
child.material.metalness = 0.05;
child.material.transparent = true;
child.material.opacity = 0.92;
child.material.needsUpdate = true;
}
});

scene.add(whale);
} catch (error) {
console.warn('Не удалось загрузить модель кита:', error);
}

renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true,
antialias: !isMobileDevice
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = !isMobileDevice;

window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

animateThree();
}

function animateThree(){
if (!screen.classList.contains('is-active')) return;
requestAnimationFrame(animateThree);

const elapsed = clock.getElapsedTime();

if (whale && whale.visible) {
const speed = isMobileDevice ? 2.0 : 0.7;
whale.position.x += speed;

whale.position.y = -190 + Math.sin(elapsed * 1.3) * 22;

whale.rotation.z = Math.sin(elapsed * 0.9) * 0.08;
whale.rotation.x = Math.sin(elapsed * 1.6) * 0.06;

if (whale.position.x > 0 && whale.position.x < 80) {
whale.position.x += 0.08;
}

if (whale.position.x > 1200) {
whale.visible = false;

setTimeout(() => {
whale.position.x = -1000;
whale.visible = true;
}, 5000);
}
}

camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
}

/* 2. ЗАКРЫТИЕ И ПЕРЕХОД */
function dismiss(targetAnchor = null){
screen.classList.add('is-closing');
setTimeout(() => {
screen.classList.remove('is-active', 'is-closing');
screen.remove();
if (targetAnchor) {
const target = $(targetAnchor);
if (target) {
if (lenis) lenis.scrollTo(target);
else target.scrollIntoView({ behavior: 'smooth' });
}
}
}, 800);
}

closeBtn.addEventListener('click', () => dismiss());
skipBtn.addEventListener('click', () => dismiss());
ctaBtn.addEventListener('click', e => {
e.preventDefault();
dismiss('#cta');
});

/* 3. ЗАПУСК И GSAP АНИМАЦИЯ ПОЯВЛЕНИЯ */
setTimeout(() => {
screen.classList.add('is-active');
initThree();

const lines = $$('.cs-line > span', screen);
gsap.set(lines, { yPercent: 120 });
gsap.set('#csKicker, #csSub, #csAction', { opacity: 0, y: 24 });

const tl = gsap.timeline({ delay: 0.2 });
tl.to('#csKicker', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
.to(lines, { yPercent: 0, duration: 0.95, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
.to('#csSub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
.to('#csAction', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
}, isMobileDevice ? 200 : 700);
}
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
setTimeout(start, 1);
} else {
addEventListener('DOMContentLoaded', () => setTimeout(start, 1));
}
})();
</content>
</write_file>
