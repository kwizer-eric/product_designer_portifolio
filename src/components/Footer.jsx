export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="brand">Visual Designer</div>
                    <div className="copy">© {new Date().getFullYear()}</div>
                </div>
            </div>
            <style>{`
        .footer {
          padding: var(--spacing-xl) var(--spacing-md);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .container {
          max-width: var(--container-width);
          margin: 0 auto;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-text-dim);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
        </footer>
    );
}
