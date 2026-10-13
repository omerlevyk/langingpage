import { useEffect, useRef, useState } from 'react';

import logoIcon from './assets/logos/logo.png';
import instagramIcon from './assets/logos/insagram_logo.png';
import gmailIcon from './assets/logos/gmail_logo.png';

import isoVideo from './assets/videos/iso.mp4';
import isoVideoTwo from './assets/videos/iso-02.mp4';
import sinkholeVideo from './assets/videos/sinkhole.mp4';

import projectImage from './assets/refinements/photo-3.png';
import heroPhotoFour from './assets/photos/web/photo04.webp';
import heroPhotoEleven from './assets/photos/web/photo11.webp';
import heroPhotoEight from './assets/photos/web/photo08.webp';
import galleryPhotoNine from './assets/photos/web/photo09.webp';
import galleryPhotoTwelve from './assets/photos/web/photo12.webp';
import galleryPhotoUvph4025 from './assets/photos/web/UVPH4025.webp';
import galleryPhotoThree from './assets/photos/web/photo03.webp';
import galleryPhotoTwo from './assets/photos/web/photo02.webp';

import nitzanMobilePortrait from './assets/photos/web/photo13.webp';
import nitzanPortrait from './assets/photos/web/photo14.webp';

const links = {
  portfolio: 'https://nitzanshelef.myportfolio.com',
  instagram: 'https://www.instagram.com/nitzan_shelef/',
  email: 'mailto:nstudio.nsl@gmail.com',
  pickupPurchase: 'https://mrng.to/NjxWe42Lv1',
  deliveryPurchase: 'https://mrng.to/Y0cbfqulsZ',
};

const purchaseOptions = [
  { title: 'לרכישת הספר', price: '98 ₪', note: 'רכישה ואיסוף בתיאום מראש', href: links.pickupPurchase },
  { title: 'לרכישת הספר + משלוח', price: '133 ₪', note: 'הספר יישלח לכתובת שתוזן בעת הרכישה', href: links.deliveryPurchase },
];

const videos = [
  { src: isoVideo, label: 'ISO / 01', alt: 'הדמיה אדריכלית של הפרויקט הקריסה הבלתי נראית' },
  { src: isoVideoTwo, label: 'ISO / 02', alt: 'הדמיה אדריכלית נוספת של הפרויקט' },
  { src: sinkholeVideo, label: 'SINKHOLE / 03', alt: 'הדמיית הבולען והמרחב העירוני' },
];

const heroImages = [
  { src: heroPhotoFour, alt: 'שני עותקים של הספר הקריסה הבלתי נראית מונחים זה על גבי זה' },
  { src: heroPhotoEleven, alt: 'הכריכה הקדמית והכריכה האחורית של הספר הקריסה הבלתי נראית' },
  { src: heroPhotoEight, alt: 'תקריב של הספר הקריסה הבלתי נראית לצד עמודיו הפתוחים' },
];

const bookGalleryImages = [
  { src: galleryPhotoNine, alt: 'הספר הקריסה הבלתי נראית פתוח בעמודי הפתיחה' },
  { src: galleryPhotoTwelve, alt: 'הספר פתוח בכפולת עמודים מאוירת בשחור ולבן' },
  { src: galleryPhotoUvph4025, alt: 'יד מדפדפת בספר הפתוח ומציגה כפולת עמודים מאוירת' },
  { src: galleryPhotoThree, alt: 'ידיים אוחזות בספר הפתוח מעל כפולת עמודים אדריכלית' },
  { src: galleryPhotoTwo, alt: 'תקריב של כפולת עמודים כהה מתוך הספר' },
];

const navItems = [
  ['הקריסה הבלתי נראית', '#project'],
  ['הבלוען', '#films'],
  ['זה לא קרה ביום אחד', '#book-gallery'],
  ['אודות', '#about'],
  ['לרכישה', '#purchase'],
];

const externalLinks = [
  ['Portfolio', links.portfolio],
  ['Instagram', links.instagram],
  ['contact', links.email],
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
        </a>
      ))}
    </div>
  );
}

export default function App() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let initialTimeoutId;
    let intervalId;

    const configureRotation = () => {
      window.clearTimeout(initialTimeoutId);
      window.clearInterval(intervalId);
      if (reducedMotion.matches) {
        setActiveHeroImage(0);
        return;
      }

      const advanceImage = () => {
        setActiveHeroImage((current) => (current + 1) % heroImages.length);
      };

      initialTimeoutId = window.setTimeout(() => {
        advanceImage();
        intervalId = window.setInterval(advanceImage, 10000);
      }, 7500);
    };

    configureRotation();
    reducedMotion.addEventListener('change', configureRotation);
    return () => {
      window.clearTimeout(initialTimeoutId);
      window.clearInterval(intervalId);
      reducedMotion.removeEventListener('change', configureRotation);
    };
  }, []);

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
    <div
      className="site-shell"
      dir="rtl"
      lang="he"
      onContextMenu={(event) => { if (event.target instanceof HTMLImageElement || event.target instanceof HTMLVideoElement) event.preventDefault(); }}
      onDragStart={(event) => { if (event.target instanceof HTMLImageElement || event.target instanceof HTMLVideoElement) event.preventDefault(); }}
    >
      <h1 className="sr-only">ניצן שלף לוי — Nitzan Shelef Levy — StudioNSL — הקריסה הבלתי נראית</h1>
      <p className="sr-only">ניצן שלף (ניצן שלף לוי / Nitzan Shelef / Nitzan Shelef Levy), אדריכלית ואמנית, מייסדת StudioNSL (studionsl). "הקריסה הבלתי נראית" — ספר אדריכלות ופרוזה פואטית.</p>
      <header className="site-header">
        <a className="wordmark" href="#book" aria-label="ניצן שלף לוי — לראש העמוד">ניצן שלף לוי</a>
      </header>

      <button
        className="edge-control edge-control--contents"
        onMouseEnter={() => { setShopOpen(false); setDrawerOpen(true); }}
        onFocus={() => { setShopOpen(false); setDrawerOpen(true); }}
        onClick={() => { setShopOpen(false); setDrawerOpen(true); }}
        aria-expanded={drawerOpen}
        aria-label="תוכן"
      >
        <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <button className="edge-control edge-control--shop" onClick={() => { setDrawerOpen(false); setShopOpen(true); }} aria-expanded={shopOpen}><span>לרכישה</span><span aria-hidden="true">→</span></button>

      <button className={`page-backdrop${overlayOpen ? ' is-open is-blurred' : ''}`} aria-label="סגירת חלון" tabIndex={overlayOpen ? 0 : -1} onClick={closeOverlays} />

      <aside className={`contents-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} aria-label="תוכן וקישורים" onMouseLeave={() => setDrawerOpen(false)}>
        <button ref={drawerCloseRef} className="overlay-close" onClick={() => setDrawerOpen(false)} aria-label="סגירת תפריט">×</button>
        <p className="drawer-kicker">תוכן</p>
        <nav className="drawer-nav" aria-label="ניווט בעמוד">
          {navItems.map(([label, href], index) => <a href={href} key={href} onClick={() => setDrawerOpen(false)}><span>0{index + 1}</span>{label}</a>)}
        </nav>
        <div className="drawer-external">
          {externalLinks.map(([label, href]) => <a href={href} key={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{label}</a>)}
        </div>
      </aside>

      <section className={`shop-panel${shopOpen ? ' is-open' : ''}`} aria-hidden={!shopOpen} aria-label="אפשרויות רכישה">
        <button ref={shopCloseRef} className="overlay-close shop-close" onClick={() => setShopOpen(false)} aria-label="סגירת חנות">×</button>
        <div className="shop-panel__intro"><span>הקריסה הבלתי נראית</span><h2>בחרו אפשרות רכישה</h2></div>
        <PurchaseOptions compact />
      </section>

      <main>
        <section className="hero" id="book" aria-label="הקריסה הבלתי נראית">
          {heroImages.map((image, index) => (
            <img
              className={`hero-image${index === activeHeroImage ? ' is-active' : ''}`}
              src={image.src}
              alt={image.alt}
              aria-hidden={index !== activeHeroImage}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              key={image.src}
            />
          ))}
        </section>

        <section className="project-intro section-frame" id="project">
          <div className="section-index" data-reveal><span className="section-number">01</span><p>הקריסה הבלתי נראית</p></div>
          <div className="project-copy" data-reveal>
            <div className="back-cover-copy">
              <p>זה לא קרה ביום אחד. הקריסה החלה הרבה לפני שהאדמה העירונית נפערה באמת. הערכים, האמון, הערבות ההדדית — כולם כבר החלו לקרוס פנימה בסתר, עד לרגע השבר החד שחתך את המרחב העירוני והחברתי.</p>
              <p>האדריכלית ניצן שלף לוי מביאה בפנינו ספר ביכורים נועז, מפתיע ורדיקלי, המשלב פרוזה פואטית וגרפיקה אדריכלית פנטסטית. יחד, הן מאפשרות לנו להביט פנימה, במבט חודר, אל תוך ה״בולען״ הישראלי. זה אינו רק אסון גיאולוגי דמיוני, אלא עדשה חריפה אל תוך התמוטטות חברתית ופוליטית.</p>
              <p>שלף לוי מניחה בפנינו שפה חדשה: אדריכלות החיה לצד הפצע. ובוראת עבורנו קהילתיות אחרת ומערכת תנועה אנושית — המאלצת אותנו להיפגש, לראות ולהרגיש.</p>
              <p>במסע ארכיטקטוני־נפשי מרתק היא מבקשת מאיתנו שלא לעצום עיניים, ולהביט היישר אל תוך הסדק, על מנת לגלות בו כיוונים ואפשרויות חדשות — לחברה שרוצה, למרות הכל, לבנות את עצמה מתוך ההרס.</p>
            </div>
          </div>
          <figure className="project-image" data-reveal><img src={projectImage} alt="קולאז׳ אדריכלי אנכי מתוך הקריסה הבלתי נראית" loading="lazy" /></figure>
        </section>

        <section className="video-section" id="films" aria-label="הבולען כמטאפורה להתמוטטות חברתית ופוליטית">
          <div className="video-slider" data-reveal onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
            <div className="video-stage">
              <div className="media-label media-label--video"><span className="section-number">02</span><p>הבולען כמטאפורה<br />להתמוטטות חברתית ופוליטית</p></div>
              {videos.map((video, index) => (
                <figure className={`video-slide${index === activeVideo ? ' is-active' : ''}`} aria-hidden={index !== activeVideo} key={video.src}>
                  <video className={video.src === isoVideoTwo ? 'video--crop-bars' : undefined} ref={(node) => { videoRefs.current[index] = node; }} src={video.src} aria-label={video.alt} muted loop playsInline preload={index === 0 ? 'auto' : 'metadata'} />
                </figure>
              ))}
              <div className="video-controls">
                <button onClick={() => changeVideo(-1)} aria-label="הסרטון הקודם">→</button>
                <div>{videos.map((video, index) => <button className={index === activeVideo ? 'is-active' : ''} onClick={() => setActiveVideo(index)} aria-label={`הצגת סרטון ${index + 1}`} key={video.src} />)}</div>
                <button onClick={() => changeVideo(1)} aria-label="הסרטון הבא">←</button>
              </div>
            </div>
          </div>
        </section>

        <section className="book-gallery" id="book-gallery" aria-label="זה לא קרה ביום אחד">
          {bookGalleryImages.map((image, index) => (
            <figure data-reveal key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              {index === 0 && <div className="media-label media-label--book"><span className="section-number">03</span><p>זה לא קרה ביום אחד</p></div>}
            </figure>
          ))}
        </section>

        <section className="about-section section-frame" id="about">
          <div className="about-mark" data-reveal>
            <div className="about-portrait-frame">
              <picture>
                <source media="(max-width: 560px)" srcSet={nitzanMobilePortrait} />
                <img className="about-portrait" src={nitzanPortrait} alt="ניצן שלף לוי" loading="lazy" />
              </picture>
            </div>
            <div className="about-label section-index"><span className="section-number">04</span></div>
          </div>
          <div className="about-copy" data-reveal>
            <div className="about-intro">
              <h3>אדריכלית, אמנית ומעצבת.</h3>
              <p className="lead">ניצן שלף לוי בוגרת תואר B.Arch באדריכלות מאוניברסיטת חיפה בהצטיינות.</p>
              <p>עבודתה נעה בין תכנון עירוני, עיצוב מפורט ומחקר אמנותי.<br />  שלף לוי מחפשת את נקודת המפגש שבין יצירתיות להיגיון — המקום שבו אדריכלות הופכת לכלי לביטוי, לשאלה ולפתרון.</p>
            </div>
            <div className="about-details">
              <div className="award-list"><p><span>2025</span> חמישיית הגמר, אות האדריכלות הישראלית — ״אדריכלות המחר״</p><p><span>2024</span> מקום שלישי, אות האדריכלות הישראלית — ״אדריכלות המחר״</p></div>
              <a className="text-link" href={links.portfolio} target="_blank" rel="noreferrer">לפורטפוליו המלא</a>
            </div>
          </div>
        </section>

        <section className="purchase-section" id="purchase"><div className="purchase-heading" data-reveal><p>ספר ביכורים מאת ניצן שלף לוי</p><h2>הקריסה<br />הבלתי נראית</h2></div><div data-reveal><PurchaseOptions /></div></section>
      </main>

      <footer className="site-footer"><div><span>© {new Date().getFullYear()} ניצן שלף לוי</span><span>צילום: יובל אורבך</span></div><div className="footer-links"><a href={links.portfolio} target="_blank" rel="noreferrer"><img src={logoIcon} alt="Portfolio" /></a><a href={links.instagram} target="_blank" rel="noreferrer"><img src={instagramIcon} alt="Instagram" /></a><a href={links.email}><img src={gmailIcon} alt="Email" /></a></div></footer>
    </div>
  );
}
