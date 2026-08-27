import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Home, Instagram, Mail, Play, X } from 'lucide-react';

type RouteName = 'home' | 'post' | 'live' | 'film';

const BASE_URL = import.meta.env.BASE_URL;
const asset = (path: string) => `${BASE_URL}${path.replace(/^\//, '')}`;
const routeHref = (page: string) => `${BASE_URL}${page.replace(/^\//, '')}`;

type Project = {
  title: string;
  meta: string;
  description: string;
  image: string;
  action: string;
  year?: string;
  date?: string;
  anchor?: string;
  gallery?: string[];
  link?: string;
  clip?: string;
  mode?: 'outline' | 'solid';
  reverse?: boolean;
};

const images = {
  homeHero: asset('/images/general/homehero.jpg'),
  homePost: asset('/images/projects/pldt.jpg'),
  homeLive: asset('/images/projects/ccprod.jpeg'),
  homeFilm: asset('/images/general/gamena.jpg'),
  homeFrames: '',
  liveHero: asset('/images/general/livehero.png'),
  filmHero: asset('/images/general/filmhero.jpg'),
  filmgamena: asset('/images/projects/tobys.png'),
  filmragingrachel: asset('/images/projects/rr.png'),
  filmtwb: asset('/images/projects/twb.png'),
  livecc: asset('/images/projects/ccprod.jpeg'),
  livehscon: asset('/images/projects/hscon.jpg'),
  livewc: asset('/images/projects/wc.jpg'),
  postpldt: asset('/images/projects/pldt.gif'),
  postmanila: asset('/images/projects/city.gif'),
  postfc: asset('/images/projects/favor.gif'),
  GScc01: asset('/images/galleryscroll/cc01.jpg'),
  GScc02: asset('/images/galleryscroll/cc02.jpg'),
  GScc03: asset('/images/galleryscroll/cc03.jpg'),
  GScc04: asset('/images/galleryscroll/cc04.jpg'),
  GScc05: asset('/images/galleryscroll/cc05.jpg'),
  GScc06: asset('/images/galleryscroll/cc06.jpg'),
  GShs01: asset('/images/galleryscroll/hscon01.jpg'),
  GShs02: asset('/images/galleryscroll/hscon02.png'),
  GShs03: asset('/images/galleryscroll/hscon03.jpg'),
  GShs04: asset('/images/galleryscroll/hscon04.png'),
  GSwc01: asset('/images/galleryscroll/wc01.jpg'),
  GSwc02: asset('/images/galleryscroll/wc02.jpg'),
  GSwc03: asset('/images/galleryscroll/wc03.jpg'),
  GSwc04: asset('/images/galleryscroll/wc04.jpg'),
  GSwc05: asset('/images/galleryscroll/wc05.jpg'),
};

const clips = {
  pldt: asset('/videos/pldt.mp4'),
  manila: asset('/videos/city.mp4'),
  favor: asset('/videos/favor.mp4'),
};

const postProjects: Project[] = [
  { title: 'PLDT FIBER FEST', meta: '2025 / EVENT RECAP', description: 'Recap edit of PLDT Fiber Fest 2025 — fast-cut event highlights with clean pacing and sound design.', image: images.postpldt, clip: clips.pldt, action: 'VIEW DETAILS', year: '2025', anchor: 'pldt-fiber-fest' },
  { title: 'SOMEWHERE IN THE CITY', meta: '2025 / PERSONAL', description: 'Are you lost in Manila too?', image: images.postmanila, clip: clips.manila, action: 'WATCH ON INSTAGRAM', link: 'https://www.instagram.com/reel/DSQAupfk2OJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', mode: 'solid', reverse: true, year: '2025' },
  { title: 'FAVOR COLLEGE GETAWAY', meta: '2026 / RECAP', description: "Takeaways from Favor College Batch 6's getaway.", image: images.postfc, clip: clips.favor, action: 'WATCH ON INSTAGRAM', link: 'https://www.instagram.com/p/DXDv_SrElZN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', mode: 'solid', year: '2026' },
];

const postSkills = [
  { name: 'DaVinci Resolve', logo: asset('/images/logos/davinci-resolve.svg') },
  { name: 'Adobe Premiere Pro', logo: asset('/images/logos/premiere-pro.svg') },
  { name: 'Adobe Photoshop', logo: asset('/images/logos/photoshop.svg') },
];

function PostImage({ project }: { project: Project }) {
  const [playClip, setPlayClip] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const hoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  useEffect(() => {
    if (!project.clip || hoverable) return;
    const observer = new IntersectionObserver(([entry]) => setPlayClip(entry.isIntersecting), { threshold: 0.4 });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [project.clip, hoverable]);
  if (!project.image) return null;
  const showClip = Boolean(project.clip) && playClip;
  const clipIsVideo = Boolean(project.clip && /\.(mp4|webm|mov)$/i.test(project.clip));
  return (
    <div
      className="post-image"
      ref={frameRef}
      onMouseEnter={hoverable && project.clip ? () => setPlayClip(true) : undefined}
      onMouseLeave={hoverable && project.clip ? () => setPlayClip(false) : undefined}
    >
      <img src={project.image} alt={project.title} />
      {project.clip && clipIsVideo ? (
        <video
          className="post-gif"
          src={showClip ? project.clip : undefined}
          muted
          loop
          autoPlay
          playsInline
          aria-hidden="true"
          style={{ opacity: showClip ? 1 : 0 }}
        />
      ) : project.clip ? (
        <img className="post-gif" src={showClip ? project.clip : undefined} alt="" aria-hidden="true" style={{ opacity: showClip ? 1 : 0 }} />
      ) : null}
    </div>
  );
}

const liveProjects: Project[] = [
  { title: 'COUNTER CULTURE 2025', meta: 'Production Team Head', description: '', image: images.livecc, action: 'VIEW GALLERY', gallery: [images.livecc, images.GScc01, images.GScc02, images.GScc03, images.GScc04, images.GScc05, images.GScc06], date: 'November 14-15, 2025', anchor: 'counter-culture' },
  { title: 'HIGH SCHOOL CONFERENCE', meta: 'Production Team Head', description: '', image: images.livehscon, action: 'VIEW GALLERY', gallery: [images.livehscon, images.GShs01, images.GShs02, images.GShs03, images.GShs04], date: 'March 7, 2026' },
  { title: 'WORSHIP CONFERENCE', meta: 'FOH Director', description: '', image: images.livewc, action: 'VIEW GALLERY', gallery: [images.livewc, images.GSwc01, images.GSwc02, images.GSwc03, images.GSwc04, images.GSwc05], date: 'April 18, 2026' },
];

const filmProjects: Project[] = [
  { title: 'GAME NA?', meta: 'TECHNICAL DIRECTOR / COMMERCIAL', description: "Level up and embrace the thrill of sports this summer with Toby's Sports.", image: images.filmgamena, action: 'WATCH ON YOUTUBE', link: 'https://youtu.be/XbzC0ZSwLT4?si=A0xbPNxBjtIq7K-A', mode: 'solid', anchor: 'game-na' },
  { title: 'RAGING RACHEL', meta: 'CAMERA ASSIST / SHORT FILM', description: 'A high school mistfit with big dreams of becoming a dancer decides to reach for greatness by joining the school dance varsity auditions-alongside her best friend, Bea, who happens to be a better dancer than her.', image: images.filmragingrachel, action: 'TRAILER ON INSTAGRAM', link: 'https://www.instagram.com/reel/DKpEtz0p5nC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', mode: 'solid' },
  { title: "THE WONDERFUL BLOOD // AN EASTER SUNDAY SPECIAL", meta: 'GAFFER / FAVOR FILMS', description: 'An Easter testimony from members of Favor Church.', image: images.filmtwb, action: 'WATCH ON YOUTUBE', link: 'https://youtu.be/sO1sspRK49U?si=FP11-iL4La-JrrPd', mode: 'solid' },
];

function getRoute(): RouteName {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const segments = window.location.pathname.slice(base.length).split('/').filter(Boolean);
  const last = segments[segments.length - 1] ?? '';
  return last === 'post' || last === 'live' || last === 'film' ? (last as RouteName) : 'home';
}

const stagger = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

function useSmoothReveal(route: RouteName) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in-view)'));
    if (!elements.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route]);
}

function useParallax(route: RouteName) {
  useEffect(() => {
    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!layers.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      for (const layer of layers) {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewport + 120) continue;
        const drift = (rect.top + rect.height / 2 - viewport / 2) * 0.075;
        layer.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0) scale(1.1)`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [route]);
}

const pairStride = (track: HTMLElement) => {
  const rows = track.querySelectorAll<HTMLElement>(':scope > .pair-row');
  return rows.length > 1 ? Math.round(rows[1].offsetLeft - rows[0].offsetLeft) : track.clientWidth || 1;
};

function Header({ route }: { route: RouteName }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
    <nav>
      <a className={`home-link${route === 'home' ? ' active' : ''}`} href={BASE_URL} aria-label="Go to home"><Home size={15} strokeWidth={1.5} /></a>
      {(['film', 'live', 'post'] as RouteName[]).map((item) => <a key={item} className={`tab${route === item ? ' active' : ''}`} href={routeHref(item)}>{item.toUpperCase()}</a>)}
    </nav>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><span>2026 © HANA MARTINEZ</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP <ArrowUp size={13} /></button></footer>;
}

function ActionButton({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const platform = project.link?.includes('youtu') ? 'youtube' : project.link?.includes('instagram') ? 'instagram' : '';
  if (project.link) {
    return (
      <a
        className={`action-button ${project.mode === 'solid' ? 'solid' : ''}${platform ? ` ${platform}` : ''}`}
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.mode === 'solid' && <Play size={13} fill="currentColor" />}
        {project.action}
      </a>
    );
  }

  return (
    <button
      className={`action-button ${project.mode === 'solid' ? 'solid' : ''}`}
      onClick={() => onOpen(project)}
    >
      {project.mode === 'solid' && <Play size={13} fill="currentColor" />}
      {project.action}
    </button>
  );
}

function DisciplineLabel({ num }: { num: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const apply = () => {
      if (rootRef.current && numRef.current) rootRef.current.style.setProperty('--label-closed', `${numRef.current.offsetWidth}px`);
    };
    apply();
    document.fonts?.ready.then(apply).catch(() => {});
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);
  return <b ref={rootRef}><span className="face-num" ref={numRef}>{num}</span><span className="face-view">VIEW</span></b>;
}

function HomePage() {
  const pairTrackRef = useRef<HTMLDivElement>(null);
  const [activePair, setActivePair] = useState(0);
  const showreelVideoRef = useRef<HTMLDivElement>(null);
  const showreelLabelRef = useRef<HTMLSpanElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => { if (copyTimer.current) window.clearTimeout(copyTimer.current); }, []);
  const copyEmail = async () => {
    const email = 'hanmartz.pcm@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = email;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }
    setEmailCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setEmailCopied(false), 2200);
  };
  useEffect(() => {
    const video = showreelVideoRef.current;
    const label = showreelLabelRef.current;
    if (!video || !label) return;
    const columns = Array.from(label.children) as HTMLElement[];
    if (!columns.length) return;
    const fit = () => {
      const target = video.clientHeight;
      if (!target) return;
      const reference = 100;
      label.style.fontSize = `${reference}px`;
      let longest = 0;
      for (const column of columns) longest = Math.max(longest, column.getBoundingClientRect().height);
      if (!longest) return;
      label.style.fontSize = `${Math.max(10, Math.floor((reference * target) / longest))}px`;
    };
    requestAnimationFrame(() => requestAnimationFrame(fit));
    const observer = new ResizeObserver(fit);
    observer.observe(video);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, []);
  const projects: Array<{ title: string; meta: string; image: string; route: 'film' | 'live' | 'post'; anchor: string; href: string; external?: boolean; cta: string }> = [
     { title: 'GAME NA?', meta: 'FILM / 2024', image: images.homeFilm, route: 'film', anchor: 'game-na', href: filmProjects[0].link ?? '', external: true, cta: 'WATCH ON YOUTUBE' },
    { title: 'COUNTER CULTURE 2025', meta: 'LIVE / 2025', image: images.homeLive, route: 'live', anchor: 'counter-culture', href: routeHref('live#gallery-counter-culture'), cta: 'VIEW GALLERY' },
    { title: 'PLDT FIBER FEST', meta: 'POST / 2025', image: images.homePost, route: 'post', anchor: 'pldt-fiber-fest', href: routeHref('post#details-pldt-fiber-fest'), cta: 'VIEW DETAILS' },
  ];
  const disciplines: Record<'film' | 'live' | 'post', { num: string; title: string; text: string }> = {
    film: { num: '01', title: 'FILM PRODUCTION', text: 'Bringing ideas to life through visuals, with a focus on cinematography and technical direction.' },
    live: { num: '02', title: 'LIVE PRODUCTION', text: 'Lighting, motion graphic operation, and multi-camera direction for live events, making experiences memorable.' },
    post: { num: '03', title: 'POST PRODUCTION', text: 'Offline editing, color grading, and sound design to create the intended atmosphere and pace of a story.' },
  };
  const touchState = useRef({ x: 0, y: 0, lastX: 0, left: 0, axis: null as 'x' | 'y' | null, dragged: false });
  const [carouselTouched, setCarouselTouched] = useState(false);
  useEffect(() => {
    const track = pairTrackRef.current;
    if (!track) return;
    const onTouchStart = (event: TouchEvent) => {
      const t = event.touches[0];
      touchState.current = { x: t.clientX, y: t.clientY, lastX: t.clientX, left: track.scrollLeft, axis: null, dragged: false };
      setCarouselTouched(true);
    };
    const onTouchMove = (event: TouchEvent) => {
      const state = touchState.current;
      const t = event.touches[0];
      state.lastX = t.clientX;
      if (!state.axis) {
        const dx = Math.abs(t.clientX - state.x);
        const dy = Math.abs(t.clientY - state.y);
        if (dx < 8 && dy < 8) return;
        state.axis = dx > dy + 2 ? 'x' : 'y';
        if (state.axis === 'x') state.dragged = true;
      }
      if (state.axis !== 'x') return;
      event.preventDefault();
      track.scrollLeft = state.left - (t.clientX - state.x);
    };
    const onTouchEnd = () => {
      const state = touchState.current;
      if (state.axis === 'x') {
        const stride = pairStride(track);
        const startSlide = Math.min(projects.length - 1, Math.max(0, Math.round(state.left / stride)));
        const flick = state.x - state.lastX;
        const moved = track.scrollLeft - state.left;
        const commit = Math.abs(flick) > stride * 0.15 || Math.abs(moved) > stride * 0.25;
        let next = startSlide;
        if (commit) next = flick + moved > 0 ? Math.min(projects.length - 1, startSlide + 1) : Math.max(0, startSlide - 1);
        track.scrollTo({ left: next * stride, behavior: 'smooth' });
      }
      window.setTimeout(() => { state.dragged = false; }, 50);
    };
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd);
    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [projects.length]);
  const suppressClickAfterDrag = (event: { preventDefault(): void; stopPropagation(): void }) => {
    if (touchState.current.dragged) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const scrollPairs = (direction: number) => {
    const track = pairTrackRef.current;
    if (!track) return;
    setCarouselTouched(true);
    const next = Math.min(Math.max(activePair + direction, 0), projects.length - 1);
    track.scrollTo({ left: next * pairStride(track), behavior: 'smooth' });
  };
  const handlePairScroll = () => {
    const track = pairTrackRef.current;
    if (!track || !track.clientWidth) return;
    setActivePair(Math.min(projects.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth))));
  };
  return <main className="home-page">
    <section className="channel-hero">
      <div className="channel-banner" data-reveal>
        {images.homeHero ? <img src={images.homeHero} alt="" /> : null}
        <h1><span>CREATED</span>{' '}<span>TO CREATE.</span></h1>
      </div>
    </section>
    <section className="home-work">
      <div className="section-heading" data-reveal><span>SELECTED WORKS</span></div>
      <div className="pair-carousel">
        <div className="pair-list" ref={pairTrackRef} onScroll={handlePairScroll} onClickCapture={suppressClickAfterDrag}>{projects.map((project, index) => {
          const discipline = disciplines[project.route];
          return (
            <div className="pair-row" key={project.title} data-reveal style={stagger(index * 60)}>
              <article className="video-card">
                <a className="video-thumb" href={project.href} aria-label={project.title} target={project.external ? '_blank' : undefined} rel={project.external ? 'noopener noreferrer' : undefined}>
                  {project.image ? <img src={project.image} alt={project.title} /> : null}
                  <span className="work-cta">{project.cta}</span>
                </a>
                <h3>{project.title}</h3>
              </article>
              <a className="discipline-card" href={routeHref(project.route)} aria-label={`${discipline.title} page`}>
                <div className="discipline-heading"><DisciplineLabel num={discipline.num} /><h3>{discipline.title}</h3></div>
                <p>{discipline.text}</p>
              </a>
            </div>
          );
        })}</div>
        <div className="carousel-controls">
          <button className={`carousel-arrow${activePair === 0 ? ' is-hidden' : ''}`} onClick={() => scrollPairs(-1)} aria-label="Previous project"><ArrowLeft size={17} /></button>
          <div className="carousel-indicators" role="tablist" aria-label="Project slides">{projects.map((project, index) => <span key={project.title} className={index === activePair ? 'active' : ''} />)}</div>
          <button className={`carousel-arrow${activePair === projects.length - 1 ? ' is-hidden' : ''}${activePair === 0 && !carouselTouched ? ' bounce' : ''}`} onClick={() => scrollPairs(1)} aria-label="Next project"><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  <section className="home-showreel">
    <div className="showreel-row" data-reveal>
      <span className="showreel-label" ref={showreelLabelRef}><span>2025</span><span>SHOWREEL</span></span>
      <div className="video-container" ref={showreelVideoRef}>
        <iframe
          src="https://www.youtube.com/embed/h2jnGE-kCX0"
          title="Hana's Showreel"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
</section>
    <section className="contact"><span data-reveal>AVAILABLE FOR PROJECTS</span><h2 data-reveal style={stagger(100)}>TARA, G?</h2><div className="contact-links" data-reveal style={stagger(200)}><button type="button" className="contact-icon" onClick={copyEmail} aria-label="Copy email"><Mail size={35} strokeWidth={1.6} /></button><a className="contact-icon" href="https://www.instagram.com/hanmartzy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={35} strokeWidth={1.6} /></a></div>{emailCopied ? <div className="copy-toast">email copied to clipboard</div> : null}</section>
  </main>;
}

function PostPage({ onOpen }: { onOpen: (project: Project) => void }) {
  return <main className="post-page">
    <div className="post-head">
      <section className="post-intro"><div><h1>POST<br />PRODUCTION</h1><p>Meticulous color grading, sound design, and narrative shaping for independent cinema and commercial auteurs.</p></div></section>
      <section className="post-skills"><span className="eyebrow" data-reveal>SOFTWARE USED</span><div className="skills-row">{postSkills.map((skill, index) => <div className="skill" key={skill.name} data-reveal style={stagger(index * 60)}><img src={skill.logo} alt="" /><span>{skill.name}</span></div>)}</div></section>
    </div>
    <section className="post-works"><div className="section-heading" data-reveal><span>SELECTED WORKS</span></div><div className="post-list">{postProjects.map((project, index) => <article className={`post-row${project.reverse ? ' reverse' : ''}`} key={project.title} data-reveal id={project.anchor ? `project-${project.anchor}` : undefined}><div className="post-copy"><span className="index">0{index + 1} / {project.meta.split(' / ')[1]}</span><h2>{project.title}</h2><div className="post-actions"><ActionButton project={{ ...project, link: undefined, mode: undefined, action: 'VIEW DETAILS' }} onOpen={onOpen} />{project.link ? <ActionButton project={project} onOpen={onOpen} /> : null}</div></div><PostImage project={project} /></article>)}</div></section>
  </main>;
}

function LivePage({ onOpen }: { onOpen: (project: Project) => void }) {
  return <main className="live-page"><section className="live-hero"><div className="live-hero-image"><img src={images.liveHero} alt="Live production control room" data-parallax /><div className="shade" /></div><div className="live-title"><h1>LIVE PRODUCTION</h1><p>Capturing the raw energy of live performance through meticulous multi-cam direction and real-time visual engineering.</p></div></section><div className="rule" /><section className="video-grid"><span className="photo-note" data-reveal>*photos not taken by me</span>{liveProjects.map((project, index) => <article className="video-card" key={project.title} data-reveal style={stagger(index * 90)} id={project.anchor ? `project-${project.anchor}` : undefined}><button className="video-thumb" onClick={() => onOpen(project)} aria-label={project.title}><img src={project.image} alt={project.title} /><span className="view-gallery">VIEW GALLERY</span></button><h3>{project.title}</h3>{project.date ? <span className="card-year">{project.date}</span> : null}</article>)}</section></main>;
}

function GalleryLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const gallery = project.gallery ?? [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setCurrentIndex((index) => (index - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') setCurrentIndex((index) => (index + 1) % gallery.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length, onClose]);

  const goToPrevious = () => setCurrentIndex((index) => (index - 1 + gallery.length) % gallery.length);
  const goToNext = () => setCurrentIndex((index) => (index + 1) % gallery.length);
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => { touchStartX.current = event.changedTouches[0].clientX; };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 40) distance > 0 ? goToPrevious() : goToNext();
    touchStartX.current = null;
  };

  if (!gallery.length) return null;

  return <div className="gallery-backdrop" onClick={onClose} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
    <button className="gallery-close" onClick={onClose} aria-label="Close gallery"><X size={18} /></button>
    <button className="gallery-navigation gallery-previous" onClick={(event) => { event.stopPropagation(); goToPrevious(); }} aria-label="Previous image"><ArrowLeft size={18} /></button>
    <div className="gallery-content" onClick={(event) => event.stopPropagation()}>
      <img key={gallery[currentIndex]} src={gallery[currentIndex]} alt={`${project.title} ${currentIndex + 1}`} />
      <div className="gallery-footer"><span>{String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span><span>{project.title}</span></div>
    </div>
    <button className="gallery-navigation gallery-next" onClick={(event) => { event.stopPropagation(); goToNext(); }} aria-label="Next image"><ArrowRight size={18} /></button>
  </div>;
}

function FilmPage({ onOpen }: { onOpen: (project: Project) => void }) {
  return <main className="film-page"><section className="film-top"><div className="film-title"><h1>FILM<br />PRODUCTION</h1><p>Meticulous color grading, sound design, and narrative shaping for independent cinema and commercial auteurs.</p><span>ARCHIVES</span></div><div className="film-hero">{images.filmHero ? <img src={images.filmHero} alt="" /> : null}</div></section><div className="film-rule" /><section className="archive"><h2 data-reveal>SELECTED ARCHIVE</h2><div className="archive-list">{filmProjects.map((project, index) => <article className={`archive-row ${index % 2 ? 'reverse' : ''}`} key={project.title} data-reveal style={stagger(60)} id={project.anchor ? `project-${project.anchor}` : undefined}><div className="archive-copy"><h3>{project.title}</h3><span>{project.meta}</span><p>{project.description}</p><ActionButton project={project} onOpen={onOpen} /></div><div className="archive-image">{project.image ? <img src={project.image} alt={project.title} /> : null}{project.year ? <span className="duration">{project.year}</span> : null}</div></article>)}</div></section></main>;
}

function App() {
  const route = getRoute();
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<Project | null>(null);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#gallery-')) {
      const match = liveProjects.find((project) => project.anchor === hash.slice('#gallery-'.length));
      if (match?.gallery?.length) {
        setSelectedGallery(match);
        return;
      }
    }
    if (hash.startsWith('#details-')) {
      const match = postProjects.find((project) => project.anchor === hash.slice('#details-'.length));
      if (match) {
        setSelected(match);
        return;
      }
    }
    if (!hash.startsWith('#project-')) return;
    requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('anchor-flash');
        window.setTimeout(() => target.classList.remove('anchor-flash'), 1800);
      }
    });
  }, []);
  useEffect(() => { document.body.style.overflow = selected || selectedGallery ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [selected, selectedGallery]);
  useSmoothReveal(route);
  useParallax(route);
  const handleOpen = (project: Project) => project.gallery?.length ? setSelectedGallery(project) : setSelected(project);
  return <div className="app-shell"><Header route={route} />{route === 'home' && <HomePage />}{route === 'post' && <PostPage onOpen={handleOpen} />}{route === 'live' && <LivePage onOpen={handleOpen} />}{route === 'film' && <FilmPage onOpen={handleOpen} />}<Footer />{selected && (
  <div
    className="modal-backdrop"
    onClick={() => setSelected(null)}
  >
    <div
      className="modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelected(null)}
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {selected.clip ? (
        <div className="video-container">
          <video src={selected.clip} autoPlay loop muted playsInline controls />
        </div>
      ) : selected.image ? (
        <img
          src={selected.image}
          alt={selected.title}
        />
      ) : null}

      <div>
        <span className="eyebrow">{selected.meta}</span>
        <h2>{selected.title}</h2>
        <p>
          {selected.description ||
            'A live visual study shaped by precision, timing, and atmosphere.'}
        </p>
      </div>
    </div>
  </div>
)}{selectedGallery && <GalleryLightbox project={selectedGallery} onClose={() => setSelectedGallery(null)} />}</div>;
}

export default App;
