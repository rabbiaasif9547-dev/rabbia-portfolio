
import { useState, useEffect, useRef } from "react";
import "./App.css";

const EMAIL = "yourname@gmail.com"; // Yahan apna email likho

const projects = [
  {
    number: "01",
    category: "RESTAURANT / UK",
    title: "Luna Bistro",
    description:
      "A modern London restaurant experience with a digital menu, food ordering demo and interactive cart.",
    tags: ["React", "CSS", "Interactive UI"],
    className: "luna",
    link: "#restaurant-demo",
  },
  {
    number: "02",
    category: "LUXURY / DUBAI",
    title: "Aurelia Estates",
    description:
      "A luxury Dubai property concept featuring premium listings, search filters and property details.",
    tags: ["React", "Responsive", "Real Estate"],
    className: "aurelia",
    link: "#property-demo",
  },
  {
    number: "03",
    category: "FINTECH / CONCEPT",
    title: "Nova Banking",
    description:
      "A fictional banking dashboard with interactive balance visibility, transaction cards and analytics.",
    tags: ["Dashboard", "UI Design", "React"],
    className: "nova",
    link: "#bank-demo",
  },
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey! 👋 Welcome to Rabbia's portfolio. What would you like to know?",
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function replyTo(text) {
    const value = text.toLowerCase();

    if (value.includes("project") || value.includes("work")) {
      return "Rabbia has three featured concepts: Luna Bistro, Aurelia Estates and Nova Banking. Explore them in the Projects section!";
    }

    if (value.includes("email") || value.includes("contact")) {
      return `You can contact Rabbia at ${EMAIL}. Press the Contact button to compose an email.`;
    }

    if (value.includes("skill") || value.includes("tech")) {
      return "Rabbia's portfolio showcases React, JavaScript, CSS, responsive layouts and interactive UI concepts.";
    }

    if (value.includes("hire") || value.includes("available")) {
      return "Thanks for your interest! Send Rabbia an email describing your project, requirements and timeline.";
    }

    if (value.includes("hello") || value.includes("hi")) {
      return "Hello! ✨ I'm Rabbia's portfolio assistant. Ask me about projects, skills or contact details.";
    }

    return "Thanks for your message! I'm a demo assistant, not a live human operator. For a personal reply, please email Rabbia directly.";
  }

  function sendMessage(text = message) {
    const clean = text.trim();
    if (!clean) return;

    setMessages((previous) => [
      ...previous,
      { from: "user", text: clean },
    ]);
    setMessage("");

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { from: "bot", text: replyTo(clean) },
      ]);
    }, 450);
  }

  return (
    <>
      {open && (
        <section className="chat-panel" aria-label="Portfolio chat">
          <header className="chat-header">
            <div className="chat-avatar">RA</div>
            <div>
              <strong>Rabbia's Assistant</strong>
              <span><i className="online-dot" /> Portfolio demo chat</span>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                className={`chat-message ${item.from}`}
                key={`${index}-${item.from}`}
              >
                {item.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="quick-replies">
            {["Projects", "Skills", "Contact"].map((item) => (
              <button key={item} onClick={() => sendMessage(item)}>
                {item}
              </button>
            ))}
          </div>

          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send message">➤</button>
          </form>
          <p className="chat-note">Automated demo · Not monitored live</p>
        </section>
      )}

      <button
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "×" : "✦"}
        {!open && <span>Let's chat</span>}
      </button>
    </>
  );
}

function RestaurantDemo() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const menu = [
    { name: "Truffle Pasta", price: 18, category: "Mains", emoji: "🍝" },
    { name: "Margherita Pizza", price: 15, category: "Mains", emoji: "🍕" },
    { name: "Berry Cheesecake", price: 8, category: "Desserts", emoji: "🍰" },
    { name: "Iced Matcha", price: 6, category: "Drinks", emoji: "🍵" },
  ];

  const visibleMenu =
    category === "All"
      ? menu
      : menu.filter((item) => item.category === category);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="demo-shell restaurant-demo" id="restaurant-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">LIVE INTERACTIVE CONCEPT</span>
          <h3>🍋 Luna Bistro</h3>
          <p>Contemporary dining · London, UK</p>
        </div>
        <span className="demo-status">DEMO</span>
      </div>

      <div className="filter-row">
        {["All", "Mains", "Desserts", "Drinks"].map((item) => (
          <button
            key={item}
            className={category === item ? "filter-active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {visibleMenu.map((item) => (
          <article className="menu-item" key={item.name}>
            <span className="menu-emoji">{item.emoji}</span>
            <div>
              <strong>{item.name}</strong>
              <p>£{item.price.toFixed(2)}</p>
            </div>
            <button
              aria-label={`Add ${item.name} to cart`}
              onClick={() => setCart((old) => [...old, item])}
            >
              +
            </button>
          </article>
        ))}
      </div>

      <div className="demo-total">
        <div>
          <strong>Your order</strong>
          <p>{cart.length} item(s) · Demo checkout only</p>
        </div>
        <strong>£{total.toFixed(2)}</strong>
      </div>

      <button
        className="demo-action"
        onClick={() =>
          alert(
            cart.length
              ? `Demo order: ${cart.length} item(s), total £${total.toFixed(2)}. No real order was placed.`
              : "Add an item to your demo order first."
          )
        }
      >
        Review demo order ↗
      </button>
      {cart.length > 0 && (
        <button className="text-action" onClick={() => setCart([])}>
          Clear cart
        </button>
      )}
    </div>
  );
}

function PropertyDemo() {
  const properties = [
    { name: "Palm Residence", location: "Palm Jumeirah", price: "AED 2.4M", type: "Apartment" },
    { name: "Marina Heights", location: "Dubai Marina", price: "AED 1.8M", type: "Apartment" },
    { name: "Desert Villa", location: "Arabian Ranches", price: "AED 3.2M", type: "Villa" },
  ];

  const [type, setType] = useState("All");

  return (
    <div className="demo-shell property-demo" id="property-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">LUXURY PROPERTY CONCEPT</span>
          <h3>Aurelia Estates</h3>
          <p>Discover a different side of Dubai.</p>
        </div>
        <span className="demo-status">DEMO</span>
      </div>

      <label className="property-filter">
        Property type
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option>All</option>
          <option>Apartment</option>
          <option>Villa</option>
        </select>
      </label>

      <div className="property-list">
        {properties
          .filter((item) => type === "All" || item.type === type)
          .map((item, index) => (
            <article className="property-card" key={item.name}>
              <div className={`property-art property-art-${index + 1}`}>
                <span>{item.type === "Villa" ? "⌂" : "▥"}</span>
              </div>
              <div className="property-info">
                <strong>{item.name}</strong>
                <p>📍 {item.location}</p>
                <div className="property-price">{item.price}</div>
                <button
                  onClick={() =>
                    alert(`${item.name}\n${item.location}\n${item.price}\n\nFictional portfolio listing. No real property is offered.`)
                  }
                >
                  View details ↗
                </button>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

function BankingDemo() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [period, setPeriod] = useState("Week");

  const transactions = [
    { name: "Coffee House", date: "Today", amount: "-£4.80", negative: true },
    { name: "Design Project", date: "Yesterday", amount: "+£240.00", negative: false },
    { name: "Music Subscription", date: "10 Oct", amount: "-£9.99", negative: true },
  ];

  return (
    <div className="demo-shell bank-demo" id="bank-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">FINTECH DASHBOARD CONCEPT</span>
          <h3>Nova Banking</h3>
          <p>Personal finance, reimagined.</p>
        </div>
        <span className="demo-status">DEMO</span>
      </div>

      <div className="bank-balance">
        <div className="balance-top">
          <span>Demo account balance</span>
          <button onClick={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? "Hide" : "Show"}
          </button>
        </div>
        <strong>{balanceVisible ? "£12,840.50" : "••••••••"}</strong>
        <span className="balance-caption">Fictional sample data · Not a real bank</span>
      </div>

      <div className="bank-stats">
        <div>
          <span>Income</span>
          <strong>+£2,450</strong>
        </div>
        <div>
          <span>Spending</span>
          <strong>-£680</strong>
        </div>
      </div>

      <div className="transaction-heading">
        <strong>Recent activity</strong>
        <select value={period} onChange={(event) => setPeriod(event.target.value)}>
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <p className="period-caption">Showing sample transactions · {period}</p>

      {transactions.map((item) => (
        <div className="transaction-row" key={item.name}>
          <div className="transaction-icon">{item.negative ? "↗" : "↙"}</div>
          <div className="transaction-name">
            <strong>{item.name}</strong>
            <span>{item.date}</span>
          </div>
          <strong className={item.negative ? "expense" : "income"}>
            {item.amount}
          </strong>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nReply email: ${form.email}\n\nProject details:\n${form.project}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Smith"
          />
        </label>
        <label>
          Your email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jane@example.com"
          />
        </label>
      </div>

      <label>
        Tell me about your project
        <textarea
          required
          rows="4"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          placeholder="I have an idea for..."
        />
      </label>

      <button className="primary-button" type="submit">
        Send email enquiry ↗
      </button>
      <p className="form-note">
        This opens your default email app. Replace the example email with your own.
      </p>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      );
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="portfolio">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">R</span>
          <span>RABBIA<span className="brand-dot">.exe</span></span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {[
            ["About", "#about"],
            ["Projects", "#projects"],
            ["Demos", "#demos"],
            ["Skills", "#skills"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let's talk ↗
          </a>
        </div>
      </nav>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span className="pulse-dot" />
              CREATIVE DEVELOPER · PAKISTAN {time}
            </div>

            <p className="hero-intro">Hello, world. I'm</p>
            <h1>
              Rabbia
              <span className="gradient-text"> Asif.</span>
            </h1>
            <h2>
              I build digital
              <br />
              <span className="outline-text">experiences.</span>
            </h2>

            <p className="hero-description">
              Frontend developer creating expressive interfaces, memorable
              digital identities and interactive experiences that feel alive.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-button">
                Explore my work <span>↗</span>
              </a>
              <a href="#contact" className="secondary-button">
                Contact me <span>↗</span>
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="mini-avatars">
                <span>R</span><span>✦</span><span>⌘</span>
              </div>
              <p>Code meets creativity. <strong>Always learning.</strong></p>
            </div>
          </div>

          <div className="orbit-scene" aria-label="Animated orbital design">
            <div className="orbit-label orbit-label-top">DESIGN / DEVELOP</div>
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-middle" />
            <div className="orbit orbit-inner" />
            <div className="orbit-core">
              <div className="core-spark">✳</div>
              <div className="core-monogram">RA</div>
              <span>CREATIVE MIND</span>
            </div>
            <div className="orbit-planet planet-one">✦</div>
            <div className="orbit-planet planet-two" />
            <div className="orbit-planet planet-three">✳</div>
            <div className="floating-card card-code">
              <span className="code-dot" />
              <span>const creativity = true;</span>
            </div>
            <div className="floating-card card-stack">
              <span>✺</span>
              <div><strong>React + CSS</strong><small>Building interfaces</small></div>
            </div>
            <span className="orbit-coord">31°32′ N · 74°21′ E</span>
          </div>

          <div className="hero-index">
            <span>PORTFOLIO / 2026</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="ticker" aria-label="Specialties">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <div className="ticker-group" key={index}>
                {["CREATIVE DEVELOPMENT", "UI / UX", "REACT", "INTERACTIVE DESIGN", "DIGITAL EXPERIENCES"].map((item) => (
                  <span key={item}>{item} <b>✳</b></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrap about-section" id="about">
          <div className="section-label"><span>01 / ABOUT ME</span><span>THE HUMAN BEHIND THE PIXELS</span></div>
          <div className="about-grid">
            <h2>
              Curious mind.
              <br />
              <span className="gradient-text">Creative code.</span>
            </h2>
            <div className="about-copy">
              <p>
                I'm Rabbia Asif, a developer interested in turning bold ideas
                into polished web experiences. I love combining clean code,
                thoughtful interactions and distinctive visual design.
              </p>
              <p>
                My portfolio features fictional client-style concepts designed
                to demonstrate my approach to real-world digital products.
              </p>
              <a href="#contact" className="inline-link">Have a project in mind? Let's talk ↗</a>
            </div>
          </div>
          <div className="stats-grid">
            <div><strong>03</strong><span>Featured concepts</span></div>
            <div><strong>∞</strong><span>Ideas in progress</span></div>
            <div><strong>100%</strong><span>Curiosity powered</span></div>
          </div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <div className="section-label"><span>02 / SELECTED WORK</span><span>CONCEPTS WITH CHARACTER</span></div>
          <div className="section-heading">
            <h2>Made to be <span className="gradient-text">explored.</span></h2>
            <p>Three fictional product concepts. Real, interactive frontend demos below.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.number}>
                <div className="project-art">
                  <span className="project-number">{project.number} / CONCEPT</span>
                  {project.className === "luna" && (
                    <div className="luna-art">
                      <span className="luna-circle">L</span>
                      <span className="art-caption">GOOD FOOD<br />GOOD MOOD.</span>
                      <span className="art-decoration">✳</span>
                    </div>
                  )}
                  {project.className === "aurelia" && (
                    <div className="building-art">
                      <div /><div /><div />
                      <span>AE</span>
                    </div>
                  )}
                  {project.className === "nova" && (
                    <div className="nova-art">
                      <span className="nova-orb">N</span>
                      <div className="nova-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                      <span className="nova-balance">£12,840.50</span>
                    </div>
                  )}
                  <span className="art-arrow">↗</span>
                </div>
                <div className="project-content">
                  <span className="eyebrow">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a href={project.link} className="project-link">Explore live demo <span>↘</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap demos-section" id="demos">
          <div className="section-label"><span>03 / TRY IT YOURSELF</span><span>INTERACTIVE PLAYGROUND</span></div>
          <div className="section-heading">
            <h2>Not just a screenshot. <span className="gradient-text">Try it.</span></h2>
            <p>These demos run inside this portfolio. Try the filters, cart and dashboard controls.</p>
          </div>

          <div className="demo-grid">
            <RestaurantDemo />
            <PropertyDemo />
            <BankingDemo />
          </div>
          <p className="demo-disclaimer">
            These are fictional portfolio prototypes. No real payments, banking,
            property transactions or restaurant orders are processed.
          </p>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <div className="section-label"><span>04 / MY TOOLKIT</span><span>TOOLS & TECHNOLOGIES</span></div>
          <div className="section-heading">
            <h2>My creative <span className="gradient-text">toolkit.</span></h2>
            <p>Technologies demonstrated across the portfolio concepts.</p>
          </div>
          <div className="skills-grid">
            {[
              ["01", "React", "Component-driven interfaces"],
              ["02", "JavaScript", "Interactive functionality"],
              ["03", "CSS", "Responsive visual systems"],
              ["04", "HTML", "Accessible page structure"],
              ["05", "UI / UX", "User-focused design"],
              ["06", "Vite", "Fast frontend development"],
            ].map(([number, name, detail]) => (
              <div className="skill-card" key={name}>
                <span>{number}</span><h3>{name}</h3><p>{detail}</p><b>↗</b>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="section-label"><span>05 / GET IN TOUCH</span><span>GOOD IDEAS START HERE</span></div>
            <div className="contact-grid">
              <div className="contact-copy">
                <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
                <h2>Let's make<br />something <span className="gradient-text">matter.</span></h2>
                <p>
                  Have an idea, a project or an opportunity? Send me a message
                  and let's talk about what we could build together.
                </p>
                <a className="email-link" href={`mailto:${EMAIL}`}>
                  <span>✉</span>{EMAIL}<b>↗</b>
                </a>
                <p className="contact-small">Replace the example email with your own before publishing.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a href="#home" className="brand">
          <span className="brand-icon">R</span>
          <span>RABBIA<span className="brand-dot">.exe</span></span>
        </a>
        <p>Designed with curiosity. Built with React.</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <span className="footer-copy">© 2026 Rabbia Asif</span>
      </footer>

      <ChatWidget />
    </div>
  );
}

export default App;
