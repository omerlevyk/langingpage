import { useEffect, useRef, useState } from 'react';
import logoIcon from './assets/logo.png';
import instagramIcon from './assets/insagram_logo.png';
import gmailIcon from './assets/gmail_logo.png';
import coverImage from './assets/refinements/cover.webp';
import projectImage from './assets/refinements/photo-1.webp';
import openBookOne from './assets/refinements/open-book-1.webp';
import openBookTwo from './assets/refinements/open-book-2.webp';
import isoVideo from './assets/refinements/iso.mp4';
import isoVideoTwo from './assets/refinements/iso-02.mp4';
import sinkholeVideo from './assets/refinements/sinkhole.mp4';

const purchaseOptions = [
  { title: 'איסוף עצמי', price: '98 ₪', note: 'רכישה ואיסוף בתיאום מראש', href: 'https://mrng.to/NjxWe42Lv1' },
  { title: 'כולל משלוח', price: '133 ₪', note: 'הספר יישלח לכתובת שתוזן בעת הרכישה', href: 'https://mrng.to/Y0cbfqulsZ' },
];

const videos = [
  { src: isoVideo, label: 'ISO / 01', alt: 'הדמיה אדריכלית של הפרויקט הקריסה הבלתי נראית' },
  { src: isoVideoTwo, label: 'ISO / 02', alt: 'הדמיה אדריכלית נוספת של הפרויקט' },
  { src: sinkholeVideo, label: 'SINKHOLE / 03', alt: 'הדמיית הבולען והמרחב העירוני' },
];

const navItems = [
  ['הספר', '#book'], ['הפרויקט', '#project'], ['וידאו', '#films'],
  ['הספר מבפנים', '#book-gallery'], ['אודות ניצן', '#about'], ['רכישה', '#purchase'],
];

const externalLinks = [
  ['Portfolio', 'https://nitzanshelef.myportfolio.com'],
  ['Instagram', 'https://www.instagram.com/nitzan_shelef/'],
  ['contact', 'mailto:nitzan2112@gmail.com'],
];

function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function PurchaseOptions({ compact = false }) {
  return (
    <div className={`purchase-options${compact ? ' purchase-options--compact' : ''}`}>
      {purchaseOptions.map((option) => (
        <a className="purchase-option" href={option.href} target="_blank" rel="noreferrer" key={option.href}>
          <span className="purchase-option__title">{option.title}</span>
          <span className="purchase-option__price">{option.price}</span>
          <span className="purchase-option__note">{option.note}</span>
          <span className="purchase-option__arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const drawerCloseRef = useRef(null);
  const shopCloseRef = useRef(null);
  const videoRefs = useRef([]);
  const touchStart = useRef(null);
  useReveal();
  const overlayOpen = drawerOpen || shopOpen;

  useEffect(() => {
    if (!overlayOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
        setShopOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!shopOpen) return undefined;
    const closeOnWheel = () => setShopOpen(false);
    window.addEventListener('wheel', closeOnWheel, { passive: true, once: true });
    return () => window.removeEventListener('wheel', closeOnWheel);
  }, [shopOpen]);

  useEffect(() => { if (drawerOpen) drawerCloseRef.current?.focus(); }, [drawerOpen]);
  useEffect(() => { if (shopOpen) shopCloseRef.current?.focus(); }, [shopOpen]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeVideo) video.play().catch(() => {});
      else video.pause();
    });
  }, [activeVideo]);

  const changeVideo = (direction) => setActiveVideo((current) => (current + direction + videos.length) % videos.length);
  const closeOverlays = () => { setDrawerOpen(false); setShopOpen(false); };
  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) changeVideo(distance > 0 ? -1 : 1);
    touchStart.current = null;
  };

  return (
    <div className="site-shell" dir="rtl" lang="he">
      <header className="site-header">
        <a className="wordmark" href="#book" aria-label="ניצן שלף לוי — לראש העמוד">ניצן שלף לוי</a>
      </header>

      <button className="edge-control edge-control--contents" onClick={() => { setShopOpen(false); setDrawerOpen(true); }} aria-expanded={drawerOpen}>
        <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span><span>תוכן</span>
      </button>
      <button className="edge-control edge-control--shop" onClick={() => { setDrawerOpen(false); setShopOpen(true); }} aria-expanded={shopOpen}><span>SHOP</span><span aria-hidden="true">→</span></button>

      <button className={`page-backdrop${overlayOpen ? ' is-open' : ''}${drawerOpen ? ' is-blurred' : ''}`} aria-label="סגירת חלון" tabIndex={overlayOpen ? 0 : -1} onClick={closeOverlays} />

      <aside className={`contents-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} aria-label="תוכן וקישורים">
        <button ref={drawerCloseRef} className="overlay-close" onClick={() => setDrawerOpen(false)} aria-label="סגירת תפריט">×</button>
        <p className="drawer-kicker">תוכן</p>
        <nav className="drawer-nav" aria-label="ניווט בעמוד">
          {navItems.map(([label, href], index) => <a href={href} key={href} onClick={() => setDrawerOpen(false)}><span>0{index + 1}</span>{label}</a>)}
        </nav>
        <div className="drawer-external">
          {externalLinks.map(([label, href]) => <a href={href} key={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{label}<span aria-hidden="true">↗</span></a>)}
        </div>
      </aside>

      <section className={`shop-panel${shopOpen ? ' is-open' : ''}`} aria-hidden={!shopOpen} aria-label="אפשרויות רכישה">
        <button ref={shopCloseRef} className="overlay-close shop-close" onClick={() => setShopOpen(false)} aria-label="סגירת חנות">×</button>
        <div className="shop-panel__intro"><span>הקריסה הבלתי נראית</span><h2>בחרו אפשרות רכישה</h2></div>
        <PurchaseOptions compact />
      </section>

      <main>
        <section className="hero" id="book" aria-label="הקריסה הבלתי נראית">
          <img className="hero-image" src={coverImage} alt="הספר הקריסה הבלתי נראית מוצג בכריכה סגורה ובמפתח פנימי" fetchPriority="high" />
        </section>

        <section className="project-intro section-frame" id="project">
          <div className="section-index" data-reveal><span>01</span><p>הבולען כמטאפורה<br />להתמוטטות חברתית ופוליטית</p></div>
          <div className="project-copy" data-reveal>
            <h2>העיצוב אינו מסתיר את הסדק, הוא מעיד עליו.</h2>
            <div className="back-cover-copy">
              <p>זה לא קרה ביום אחד. הקריסה החלה הרבה לפני שהאדמה העירונית נפערה באמת. הערכים, האמון, הערבות ההדדית — כולם כבר החלו לקרוס פנימה בסתר, עד לרגע השבר החד שחתך את המרחב העירוני והחברתי.</p>
              <p>האדריכלית ניצן שלף לוי מביאה בפנינו ספר ביכורים נועז, מפתיע ורדיקלי, המשלב פרוזה פואטית וגרפיקה אדריכלית פנטסטית. יחד, הן מאפשרות לנו להביט פנימה, במבט חודר, אל תוך ה״בולען״ הישראלי. זה אינו רק אסון גיאולוגי דמיוני, אלא עדשה חריפה אל תוך התמוטטות חברתית ופוליטית.</p>
              <p>שלף לוי מניחה בפנינו שפה חדשה: אדריכלות החיה לצד הפצע. ובוראת עבורנו קהילתיות אחרת ומערכת תנועה אנושית — המאלצת אותנו להיפגש, לראות ולהרגיש.</p>
              <p>במסע ארכיטקטוני־נפשי מרתק היא מבקשת מאיתנו שלא לעצום עיניים, ולהביט היישר אל תוך הסדק, על מנת לגלות בו כיוונים ואפשרויות חדשות — לחברה שרוצה, למרות הכל, לבנות את עצמה מתוך ההרס.</p>
            </div>
          </div>
          <figure className="project-image" data-reveal><img src={projectImage} alt="קולאז׳ אדריכלי אנכי מתוך הקריסה הבלתי נראית" loading="lazy" /></figure>
        </section>

        <section className="quote-section" aria-label="ציטוט מתוך הספר"><p data-reveal>בולען מתפתח לאט, בסתר, עד לרגע הקריסה.</p></section>

        <section className="video-section section-frame" id="films" aria-labelledby="video-title">
          <div className="section-heading" data-reveal><span>02</span><div><p className="eyebrow">תנועה בתוך השבר</p><h2 id="video-title">העיר בתנועה</h2></div></div>
          <div className="video-slider" data-reveal onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
            <div className="video-stage">
              {videos.map((video, index) => (
                <figure className={`video-slide${index === activeVideo ? ' is-active' : ''}`} aria-hidden={index !== activeVideo} key={video.src}>
                  <video ref={(node) => { videoRefs.current[index] = node; }} src={video.src} aria-label={video.alt} muted loop playsInline preload={index === 0 ? 'auto' : 'metadata'} />
                  <figcaption>{video.label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="video-controls">
              <button onClick={() => changeVideo(-1)} aria-label="הסרטון הקודם">→</button>
              <div>{videos.map((video, index) => <button className={index === activeVideo ? 'is-active' : ''} onClick={() => setActiveVideo(index)} aria-label={`הצגת סרטון ${index + 1}`} key={video.src} />)}</div>
              <button onClick={() => changeVideo(1)} aria-label="הסרטון הבא">←</button>
            </div>
          </div>
        </section>

        <section className="book-gallery" id="book-gallery" aria-labelledby="gallery-title">
          <div className="section-heading section-frame" data-reveal><span>03</span><div><p className="eyebrow">הספר מבפנים</p><h2 id="gallery-title">מבט אל בין הדפים</h2></div></div>
          <figure data-reveal><img src={openBookOne} alt="הספר הקריסה הבלתי נראית פתוח ומציג עמודים פנימיים" loading="lazy" /></figure>
          <figure data-reveal><img src={openBookTwo} alt="מבט נוסף על הספר הפתוח והכריכה" loading="lazy" /></figure>
        </section>

        <section className="about-section section-frame" id="about">
          <div className="about-mark" data-reveal><img src={logoIcon} alt="לוגו ניצן שלף לוי" /><span>04 / ABOUT</span></div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">אודות ניצן</p><h2>אדריכלית, אמנית ומעצבת.</h2>
            <p className="lead">ניצן שלף לוי יוצרת מרחבים משמעותיים דרך מחקר, יצירתיות וחדשנות. היא בוגרת תואר B.Arch באדריכלות מאוניברסיטת חיפה בהצטיינות.</p>
            <p>עבודתה נעה בין תכנון עירוני, עיצוב מפורט ומחקר אמנותי. היא מחפשת את נקודת המפגש שבין יצירתיות להיגיון — המקום שבו אדריכלות הופכת לכלי לביטוי, לשאלה ולפתרון.</p>
            <div className="award-list"><p><span>2025</span> חמישיית הגמר, אות האדריכלות הישראלית — ״אדריכלות המחר״</p><p><span>2024</span> מקום שלישי, אות האדריכלות הישראלית — ״אדריכלות המחר״</p></div>
            <a className="text-link" href="https://nitzanshelef.myportfolio.com" target="_blank" rel="noreferrer">לפורטפוליו המלא <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="purchase-section" id="purchase"><div className="purchase-heading" data-reveal><p>ספר ביכורים מאת ניצן שלף לוי</p><h2>הקריסה<br />הבלתי נראית</h2><span>בחרו איסוף עצמי או משלוח עד הבית</span></div><div data-reveal><PurchaseOptions /></div></section>
      </main>

      <footer className="site-footer"><div><span>© {new Date().getFullYear()} ניצן שלף לוי</span><span>כל הזכויות שמורות</span></div><div className="footer-links"><a href="https://nitzanshelef.myportfolio.com" target="_blank" rel="noreferrer">Portfolio</a><a href="https://www.instagram.com/nitzan_shelef/" target="_blank" rel="noreferrer"><img src={instagramIcon} alt="Instagram" /></a><a href="mailto:nitzan2112@gmail.com"><img src={gmailIcon} alt="Email" /></a></div></footer>
    </div>
  );
}
