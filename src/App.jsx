import { useEffect, useRef, useState } from 'react';
import logoIcon from './assets/logo.png';
import instagramIcon from './assets/insagram_logo.png';
import gmailIcon from './assets/gmail_logo.png';
import bookHero from './assets/portfolio/book-hero.webp';
import collapseDiagram from './assets/portfolio/collapse-diagram.webp';
import collapsePlan from './assets/portfolio/collapse-plan.webp';
import collapseStructure from './assets/portfolio/collapse-structure.webp';
import roomDetail from './assets/portfolio/room-detail.webp';
import roomWide from './assets/portfolio/room-wide.webp';
import roomStairs from './assets/portfolio/room-stairs.webp';

const purchaseOptions = [
  { title: 'איסוף עצמי', price: '98 ₪', note: 'רכישה ואיסוף בתיאום מראש', href: 'https://mrng.to/NjxWe42Lv1' },
  { title: 'כולל משלוח', price: '133 ₪', note: 'הספר יישלח לכתובת שתוזן בעת הרכישה', href: 'https://mrng.to/Y0cbfqulsZ', featured: true },
];

const slides = [
  { src: bookHero, alt: 'הספר הקריסה הבלתי נראית מוצג בכריכה סגורה ובמפתח פנימי', label: 'הספר', className: 'hero-slide--book' },
  { src: collapsePlan, alt: 'קולאז׳ אדריכלי מתוך פרויקט הקריסה הבלתי נראית', label: 'הבולען כמטאפורה', className: 'hero-slide--portrait' },
  { src: roomWide, alt: 'מודל התערוכה חדר 207 המציג עיר לצד שבר עמוק', label: 'חדר 207', className: 'hero-slide--room' },
];

const navItems = [['הספר', '#book'], ['הפרויקט', '#project'], ['חדר 207', '#room-207'], ['אודות ניצן', '#about'], ['רכישה', '#purchase']];
const externalLinks = [['Portfolio', 'https://nitzanshelef.myportfolio.com'], ['Instagram', 'https://www.instagram.com/nitzan_shelef/'], ['צרו קשר', 'mailto:nitzan2112@gmail.com']];

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
        <a className={`purchase-option${option.featured ? ' purchase-option--featured' : ''}`} href={option.href} target="_blank" rel="noreferrer" key={option.href}>
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const drawerCloseRef = useRef(null);
  const shopCloseRef = useRef(null);
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

  useEffect(() => { if (drawerOpen) drawerCloseRef.current?.focus(); }, [drawerOpen]);
  useEffect(() => { if (shopOpen) shopCloseRef.current?.focus(); }, [shopOpen]);

  const changeSlide = (direction) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  const closeOverlays = () => { setDrawerOpen(false); setShopOpen(false); };

  return (
    <div className="site-shell" dir="rtl" lang="he">
      <header className="site-header">
        <a className="wordmark" href="#book" aria-label="ניצן שלף לוי — לראש העמוד"><span>ניצן שלף לוי</span><small>Nitzan Shelef Levy</small></a>
        <img className="header-logo" src={logoIcon} alt="" aria-hidden="true" />
      </header>

      <button className="edge-control edge-control--contents" onClick={() => { setShopOpen(false); setDrawerOpen(true); }} aria-expanded={drawerOpen}>
        <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span><span>תוכן</span>
      </button>
      <button className="edge-control edge-control--shop" onClick={() => { setDrawerOpen(false); setShopOpen(true); }} aria-expanded={shopOpen}><span>SHOP</span><span aria-hidden="true">←</span></button>

      <button className={`page-backdrop${overlayOpen ? ' is-open' : ''}`} aria-label="סגירת חלון" tabIndex={overlayOpen ? 0 : -1} onClick={closeOverlays} />

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
          <div className="hero-slides" aria-live="polite">
            {slides.map((slide, index) => (
              <figure className={`hero-slide ${slide.className}${index === activeSlide ? ' is-active' : ''}`} key={slide.src} aria-hidden={index !== activeSlide}>
                <img src={slide.src} alt={index === activeSlide ? slide.alt : ''} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption>{slide.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="hero-copy"><p>ספר אדריכלות ופרוזה פואטית</p><h1>הקריסה<br />הבלתי נראית</h1><span>ניצן שלף לוי</span></div>
          <div className="hero-controls"><button onClick={() => changeSlide(-1)} aria-label="התמונה הקודמת">→</button><span>{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><button onClick={() => changeSlide(1)} aria-label="התמונה הבאה">←</button></div>
          <a className="scroll-cue" href="#project">לגלות את הספר <span aria-hidden="true">↓</span></a>
        </section>

        <section className="project-intro section-frame" id="project">
          <div className="section-index" data-reveal><span>01</span><p>הבולען כמטאפורה<br />להתמוטטות חברתית ופוליטית</p></div>
          <div className="project-copy" data-reveal>
            <p className="eyebrow">הפרויקט</p><h2>זה לא קרה ביום אחד.</h2>
            <p className="lead">הקריסה החלה הרבה לפני שהאדמה העירונית נפערה באמת. הערכים, האמון והערבות ההדדית כבר החלו לקרוס פנימה, עד לרגע השבר שחתך את המרחב העירוני והחברתי.</p>
            <p>דרך חקירה של מרחבים עירוניים בתל אביב, הספר שואל כיצד אפשר לתרגם תהליכים של שחיקה חברתית לשפה אדריכלית. במקום למחוק את מה שנשבר, הוא מציע אדריכלות שזוכרת — מרחב שמכיר בפצע ומאפשר לחיים להמשיך לצידו.</p>
          </div>
          <figure className="project-diagram" data-reveal><img src={collapseDiagram} alt="דיאגרמה אנכית של העיר והשבר מתוך הקריסה הבלתי נראית" loading="lazy" /></figure>
        </section>

        <section className="quote-section" aria-label="ציטוט מתוך הספר"><p data-reveal>״בולען מתפתח לאט, בסתר,<br />עד לרגע הקריסה.״</p></section>

        <section className="visual-study section-frame" aria-labelledby="visual-title">
          <div className="section-heading" data-reveal><span>02</span><div><p className="eyebrow">מתוך המחקר</p><h2 id="visual-title">לחיות לצד השבר</h2></div></div>
          <div className="study-grid">
            <figure className="study-image" data-reveal><img src={collapsePlan} alt="מפת תל אביב ובה שבר אדריכלי כהה" loading="lazy" /><figcaption>העיר זוכרת את הכישלונות ואת העבר, ומזמינה חיים לצידם.</figcaption></figure>
            <figure className="study-image study-image--structure" data-reveal><img src={collapseStructure} alt="מערכת אדריכלית לבנה הצומחת מעל המרקם העירוני" loading="lazy" /><figcaption>מערכת תנועה חדשה מחברת בין מבנים, אנשים וזיכרונות.</figcaption></figure>
            <div className="image-placeholder" data-reveal aria-label="מקום שמור לצילום עתידי"><span>IMAGE / 03</span><p>מקום שמור לצילום נוסף</p></div>
          </div>
        </section>

        <section className="room-section" id="room-207">
          <div className="room-heading section-frame" data-reveal><span className="room-number">207</span><div><p className="eyebrow">תערוכה — אוניברסיטת חיפה</p><h2>חדר 207</h2><p>המשך פיזי לפרויקט הגמר, שהוצג בתערוכת העבודות הנבחרות בבית הספר לעיצוב. במרכז החלל ניצב מודל בגודל שניים על מטר אחד, המחבר שלושה תרחישים: התרגלנו, פעלנו ונטשנו.</p></div></div>
          <div className="room-gallery"><figure data-reveal><img src={roomWide} alt="מבט רחב על מודל חדר 207" loading="lazy" /></figure><figure data-reveal><img src={roomDetail} alt="פרט מתוך מודל חדר 207 עם גרם מדרגות אדום" loading="lazy" /></figure><figure data-reveal><img src={roomStairs} alt="תקריב של גרם המדרגות במודל חדר 207" loading="lazy" /></figure></div>
        </section>

        <section className="about-section section-frame" id="about">
          <div className="about-mark" data-reveal><img src={logoIcon} alt="לוגו ניצן שלף לוי" /><span>03 / ABOUT</span></div>
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
