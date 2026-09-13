const cards = [
  {
    id: '01',
    title: 'תהליך סמוי',
    subtitle: 'הקריסה לא מתחילה ברעש. היא מצטברת בשקט.',
    body: 'כמו בולען, גם שבר חברתי מתפתח מתחת לפני השטח עד לרגע החשיפה.',
  },
  {
    id: '02',
    title: 'זיכרון בחומר',
    subtitle: 'לא מוחקים את הסדק. לומדים לקרוא אותו.',
    body: 'הספר מציע שפה אדריכלית שמכילה טראומה במקום להסתיר אותה.',
  },
  {
    id: '03',
    title: 'עיר כעדות',
    subtitle: 'המרחב העירוני מתעד את מה שהחברה מנסה לשכוח.',
    body: 'תל אביב משמשת כמעבדה לשאלות של יציבות, שבר והמשכיות.',
  },
  {
    id: '04',
    title: 'ספר כאובייקט',
    subtitle: 'אובייקט עריכתי עם נוכחות חומרית חזקה.',
    body: 'שחור עמוק, קווים חדים וטיפוגרפיה שמחברת בין פואטיקה למבנה.',
  },
];

export default function App() {
  return (
    <div dir="rtl" lang="he" className="brutal-page">
      <nav className="main-nav" aria-label="ניווט ראשי">
        <a href="#top" className="logo-mark">
          NSL*
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
          <p className="hero-subtitle">
            מטאפורה אדריכלית לקריסה חברתית ופוליטית: שבר שנבנה לאט, מוסתר מהעין,
            ומתפרץ בבת אחת.
          </p>
          <div className="hero-tags">
            <span>בולען כמטאפורה</span>
            <span>זיכרון עירוני</span>
            <span>אדריכלות זוכרת</span>
          </div>
          <a href="#work" className="hero-cta">
            כניסה לחוויית הספר
          </a>
        </section>

        <section className="scroll-pane" id="work">
          <div className="cards-grid">
            {cards.map((card) => (
              <article className="book-card" key={card.id}>
                <header>
                  <span className="card-id">{card.id}</span>
                  <h2>{card.title}</h2>
                </header>
                <p className="card-subtitle">{card.subtitle}</p>
                <p className="card-body">{card.body}</p>
              </article>
            ))}
          </div>

          <section className="about-block" id="about">
            <h3>אודות</h3>
            <p>
              הדף נבנה בהשראת שפת העבודה של ניצן שלף לוי: שילוב בין חשיבה אדריכלית,
              קומפוזיציה חומרית, ורגישות למתח שבין שבר להמשכיות.
            </p>
          </section>

          <section className="quote-strip" aria-label="ציטוט מרכזי">
            <p>"התפוררות לא מתרחשת ברגע. היא מצטברת מתחת לפני השטח."</p>
          </section>

          <section className="contact-block" id="contact">
            <h3>בואו נבנה את זה יחד</h3>
            <p>אפשר להמשיך מכאן לדף השקה מלא, עם גלריה, פרקי תוכן וטפסי השארת פרטים.</p>
            <a href="mailto:omerelevy03@gmail.com" className="contact-link">
              כתבו לי
            </a>
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
