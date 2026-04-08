import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="ml-auto bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
