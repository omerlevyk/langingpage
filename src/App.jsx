const heroPoints = [
  {
    label: 'שכבה נסתרת',
    text: 'מה שנשבר באמת מתחיל הרבה לפני שהעין מבחינה בכך.',
  },
  {
    label: 'זיכרון עירוני',
    text: 'העיר שומרת בתוכה עקבות, גם כשהן כמעט נעלמות.',
  },
  {
    label: 'אדריכלות זוכרת',
    text: 'המבנה לא מוחק את הפצע — הוא לומד לחיות לידו.',
  },
];

const visualTraits = [
  'שחור עמוק, ורוד מעושן, ולבן רך',
  'כותרת בסריף דרמטי וטקסט קריא ונקי',
  'פריסה עריכתית, מרווחת, ואטמוספרית',
];

export default function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          קריסת האין־נראה
        </a>
        <nav className="nav" aria-label="ניווט ראשי">
          <a href="#story">הסיפור</a>
          <a href="#concept">הרעיון</a>
          <a href="#visuals">שפה חזותית</a>
          <a className="nav-cta" href="#contact">
            בקרוב
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">דף נחיתה ספרותי / קונספט עיצובי</p>
            <h1>קריסת האין־נראה</h1>
            <p className="lead">
              ספר שמספר על התפוררות שקטה, על מתח שמצטבר מתחת לפני השטח, ועל הרגע שבו
              מה שנדמה יציב — נחשף כעדין ושביר.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#story">
                להיכנס לסיפור
              </a>
              <a className="button button-secondary" href="#visuals">
                לראות את השפה החזותית
              </a>
            </div>

            <ul className="hero-metrics" aria-label="עקרונות מרכזיים">
              <li>
                <span>01</span> מתח נסתר
              </li>
              <li>
                <span>02</span> זיכרון אורבני
              </li>
              <li>
                <span>03</span> אדריכלות ורגש
              </li>
            </ul>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="book-spine">קריסת האין־נראה</div>
            <div className="book-stack book-back"></div>
            <div className="book-stack book-front"></div>
            <div className="book-open">
              <div className="page-left">
                <div className="line-art line-1" />
                <div className="line-art line-2" />
                <div className="line-art line-3" />
              </div>
              <div className="page-right">
                <div className="quote-block">
                  <p>
                    "התפוררות לא מתרחשת ברגע.
                    <br />
                    היא מצטברת מתחת לפני השטח."
                  </p>
                </div>
              </div>
            </div>
            <div className="floating-card card-a">הרס איטי לפני הקריסה.</div>
            <div className="floating-card card-b">הזיכרון נשאר בתוך החומר.</div>
          </div>
        </section>

        <section className="intro-grid" id="story">
          <article className="panel panel-large">
            <p className="section-label">הסיפור</p>
            <h2>קריסה כהליך סמוי, איטי ומצטבר.</h2>
            <p>
              בהשראת פרויקט הסיום של ניצן, הדף מתייחס לבולען כמטפורה לקריסה חברתית
              ופוליטית — תהליך שנבנה בשקט, ורק בסוף נחשף בבת אחת.
            </p>
          </article>

          <article className="panel">
            <p className="section-label">טון</p>
            <h3>עריכתי, שקט וקולנועי</h3>
            <p>
              פריסה מינימלית, ניגודיות חזקה וקצב שמאפשר לטקסט ולתמונה לנשום.
            </p>
          </article>

          <article className="panel">
            <p className="section-label">אווירה</p>
            <h3>רגשית, מהורהרת ואדריכלית</h3>
            <p>
              דף שמרגיש כמו אובייקט ספרותי ולא כמו אתר שיווקי רגיל.
            </p>
          </article>
        </section>

        <section className="story-section" id="concept">
          <div className="story-header">
            <p className="section-label">הרעיון</p>
            <h2>מה הדף צריך לספר</h2>
          </div>

          <div className="story-cards">
            {heroPoints.map((item, index) => (
              <article key={item.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="visual-section" id="visuals">
          <div className="visual-copy">
            <p className="section-label">השפה החזותית</p>
            <h2>אלגנטיות חשוכה עם הרבה אוויר</h2>
            <p>
              להשתמש בטיפוגרפיה דרמטית, במרקם עדין, ובמרווחים נדיבים כדי לבנות חוויה
              יוקרתית, שקטה ומדויקת.
            </p>
          </div>

          <div className="visual-board">
            {visualTraits.map((trait, index) => (
              <div className={`swatch swatch-${index + 1}`} key={trait}>
                <span>{index === 0 ? 'פלטה' : index === 1 ? 'טיפוגרפיה' : 'פריסה'}</span>
                <strong>{trait}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <p>״הקרקע תחתינו כבר לא יציבה.״</p>
        </section>

        <section className="cta-section" id="contact">
          <div>
            <p className="section-label">השלב הבא</p>
            <h2>להפוך את הקונספט לדף נחיתה חי ונושם.</h2>
          </div>
          <a className="button button-primary" href="mailto:omerelevy03@gmail.com">
            להתחיל לבנות
          </a>
        </section>
      </main>
    </div>
  );
}
