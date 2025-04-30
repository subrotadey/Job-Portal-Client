import { useEffect, useState } from "react";

const ThemeDropdown = () => {
  const themes = ["light", "dark", "retro", "cyberpunk", "valentine", "aqua"];
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "default";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-sm m-2 align-middle">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li key={t}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={t}
              value={t}
              checked={theme === t}
              onChange={handleChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
