import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 text-white">
      <div className="w-full px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          DocHub
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex gap-6">
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>

      </div>
    </nav>
    )
};