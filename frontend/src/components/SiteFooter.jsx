export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="hero-label">Sample Cafe</p>
          <p>一杯ごとに、ちいさなひと休みを。</p>
        </div>
        <div>
          <p className="hero-label">Contact</p>
          <a href="mailto:demo@example.com">demo@example.com</a>
        </div>
        <div>
          <p className="hero-label">Visit</p>
          <p>Open daily / 09:00-22:00</p>
        </div>
      </div>
      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} Sample Cafe</span>
        <span>React Single Page Experience</span>
      </div>
    </footer>
  );
}
