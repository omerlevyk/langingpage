import logoIcon from './assets/logo.png';
import instagramIcon from './assets/insagram_logo.png';
import gmailIcon from './assets/gmail_logo.png';
import bookCover from './assets/book-cover.jpeg';

export default function App() {
  return (
    <div dir="rtl" lang="he" className="brutal-page">
      <nav className="main-nav" aria-label="ניווט ראשי">
        <a href="#top" className="logo-mark">
          <img src={logoIcon} alt="NSL logo" />
        </a>
        <div className="nav-links">
          <a href="#work">הספר</a>
          <a href="#about">אודות ניצן</a>
          <a href="#contact">צור קשר</a>
        </div>
      </nav>

      <main className="split-layout" id="top">
        <section className="hero-pane">
          <p className="hero-label">פרויקט ספר / דף נחיתה קונספטואלי</p>
          <h1 className="hero-title">הקריסה הבלתי נראית</h1>
          <div className="hero-divider" />
          <p className="hero-author">ניצן שלף לוי</p>
          <p className="hero-subtitle">
            מטאפורה אדריכלית לקריסה חברתית ופוליטית: שבר שנבנה לאט, מוסתר מהעין,
            ומתפרץ בבת אחת.
          </p>
          <div className="hero-tags">
            <span>בולען כמטאפורה</span>
            <span>זיכרון עירוני</span>
            <span>אדריכלות זוכרת</span>
          </div>
          <div className="hero-strip" aria-hidden="true" />
          <div className="hero-icon-links" aria-label="קישורים מהירים">
            <a
              className="icon-link"
              href="https://nitzanshelef.myportfolio.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Logo Portfolio"
            >
              <img src={logoIcon} alt="לוגו ופורטפוליו" loading="lazy" />
            </a>
            <a
              className="icon-link"
              href="https://www.instagram.com/nitzan_shelef/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="אינסטגרם" loading="lazy" />
            </a>
            <a
              className="icon-link"
              href="mailto:nitzan2112@gmail.com"
              aria-label="Email"
            >
              <img src={gmailIcon} alt="מייל" loading="lazy" />
            </a>
          </div>
        </section>

        <section className="scroll-pane" id="work">
          <section className="book-media-column" aria-label="ויזואלים מתוך הספר">
            <figure className="book-image-block">
              <img src={bookCover} alt="ויזואל מתוך הספר" loading="lazy" />
              <figcaption>שבר שנרשם בחומר לפני שהוא נראה לעין.</figcaption>
            </figure>
            <figure className="book-image-block">
              <img src={bookCover} alt="ויזואל מתוך הספר" loading="lazy" />
              <figcaption>האדריכלות חושפת את המנגנון, שכבה אחר שכבה.</figcaption>
            </figure>
            <figure className="book-image-block">
              <img src={bookCover} alt="ויזואל מתוך הספר" loading="lazy" />
              <figcaption>העיצוב אינו מסתיר את הסדק, הוא מעיד עליו.</figcaption>
            </figure>
          </section>

          <section className="book-description" id="about">
            <p>
              זה לא קרה ביום אחד. הקריסה החלה הרבה לפני
              {' '}
              שהאדמה העירונית נפערה באמת. הערכים, האמון,
              {' '}
              הערבות ההדדית — כולם כבר החלו לקרוס פנימה
              {' '}
              בסתר, עד לרגע השבר החד שחתך את המרחב העירוני
              {' '}
              והחברתי.
              {' '}
              האדריכלית ניצן שלף לוי מביאה בפנינו ספר ביכורים
              {' '}
              נועז, מפתיע ורדיקלי, המשלב פרוזה פואטית וגרפיקה
              {' '}
              אדריכלית פנטסטית. יחד, הן מאפשרות לנו להביט
              {' '}
              פנימה, במבט חודר, אל תוך ה"בולען" הישראלי. זה
              {' '}
              אינו רק אסון גיאולוגי דמיוני, אלא עדשה חריפה אל
              {' '}
              תוך התמוטטות חברתית ופוליטית.
              {' '}
              שלף לוי מניחה בפנינו שפה חדשה: אדריכלות החיה לצד
              {' '}
              הפצע. ובוראת עבורנו קהילתיות אחרת ומערכת תנועה
              {' '}
              אנושית — המאלצת אותנו להיפגש, לראות ולהרגיש.
              {' '}
              במסע ארכיטקטוני־נפשי מרתק היא מבקשת מאיתנו
              {' '}
              שלא לעצום עיניים, ולהביט היישר אל תוך הסדק, על
              {' '}
              מנת לגלות בו כיוונים ואפשרויות חדשות — לחברה
              {' '}
              שרוצה, למרות הכל, לבנות את עצמה מתוך ההרס
            </p>
          </section>

          <footer className="site-footer">
            <span>© {new Date().getFullYear()} ניצן שלף לוי</span>
            <div>
              <a href="https://nitzanshelef.myportfolio.com" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
