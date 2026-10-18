import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/SurveyForm', label: 'Survey' },
  { to: '/UltrasoundImage', label: 'Ultrasound' },
  { to: '/find-care', label: 'Find a doctor' },
];

const linkClass = ({ isActive }) =>
  `inline-flex min-h-[44px] items-center border-b-2 transition-colors ${
    isActive
      ? 'border-rose-700 font-semibold text-rose-700'
      : 'border-transparent font-medium text-ink-700 hover:text-rose-700'
  }`;

const outlineBtn =
  'inline-flex min-h-[44px] items-center justify-center rounded-md border-[1.5px] border-rose-700 bg-white px-5 py-3 font-semibold leading-tight text-rose-700 transition-colors hover:bg-rose-50';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('user_id') && localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/login');
  };

  const authButton = isLoggedIn ? (
    <button onClick={handleLogout} className={outlineBtn}>
      Log out
    </button>
  ) : (
    <Link to="/login" onClick={() => setIsOpen(false)} className={outlineBtn}>
      Log in
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center gap-6 border-b border-ink-200 bg-paper px-4 font-sans text-ink-900 sm:px-6 lg:px-8">
      <Link to="/" className="font-display text-2xl font-semibold leading-none text-rose-700">
        Arogya
      </Link>

      {/* Desktop links */}
      <ul className="hidden items-center gap-6 md:flex">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:block">{authButton}</div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-md md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-ink-200 bg-paper px-4 pb-4 pt-2 shadow-[0_12px_40px_rgba(74,22,40,.16)] md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[48px] items-center rounded-md px-3 ${
                      isActive
                        ? 'bg-rose-50 font-semibold text-rose-700'
                        : 'font-medium text-ink-700'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex [&>*]:w-full">{authButton}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
