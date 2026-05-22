import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { site } from '../../config/site';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/#insights', label: 'Insights', hash: 'insights' },
  { to: '/#birth-chart', label: 'Birth chart', hash: 'birth-chart' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleHashLink = (hash) => {
    if (!isHome) {
      navigate('/');
    }
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || !isHome
        ? 'border-b border-ink/5 bg-white/90 backdrop-blur-md shadow-soft'
        : 'bg-cream/80 backdrop-blur-sm'
        }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-[4.5rem]">
        <NavLink to="/" className="font-serif text-xl tracking-tight text-ink md:text-[1.35rem]">
          {site.name}
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) =>
            link.hash ? (
              <a
                key={link.to}
                href={`#${link.hash}`}
                className="text-sm font-medium text-ink-muted hover:text-ink"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashLink(link.hash);
                }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Call to action button (desktop) */}
        <div className="hidden md:block">
          <Button to="/services" size="sm">
            Book reading
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </Container>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-ink/5 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-4 px-5 py-6">
              {links.map((link) =>
                link.hash ? (
                  <a
                    key={link.to}
                    href={`#${link.hash}`}
                    className="text-lg font-medium text-ink"
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashLink(link.hash);
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink key={link.to} to={link.to} end={link.end} className="text-lg font-medium text-ink">
                    {link.label}
                  </NavLink>
                )
              )}
              <Button to="/services" className="w-full">
                Book reading
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
