import { NavLink, Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Toll Plazas" },
  { to: "/collect", label: "Collect Toll" },
  { to: "/admin", label: "Admin" },
  { to: "/history", label: "History" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const compact = location.pathname === "/";

  return (
    <div className="min-h-screen bg-slate-100">
      <header className={`sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur ${compact ? "" : "shadow-sm"}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded bg-amber-400 font-black text-slate-950">NH</div>
            <div>
              <p className="text-lg font-black uppercase tracking-wide text-slate-950">NHAI Toll Plaza</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">India Highway Toll Operations</p>
            </div>
          </Link>
          <nav className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded px-3 py-2 text-sm font-bold transition ${
                    isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
