// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/dhb4.jpg";
import PublicNavbar from "../components/navbars/PublicNavbar";
// import aboutImg from "../assets/about.jpg";
// import contactImg from "../assets/contact.png";

import { motion as Motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, FaShieldAlt, FaFileUpload, FaSearch, FaCheckCircle  } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

import { API_BASE_URL } from "../utils/apiConfig";

export default function Home() {
  const navigate = useNavigate();

  // 🔥 Contact form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Message sent successfully ✅");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <PublicNavbar />
      {/* HERO */}
      <div
        className="min-h-screen bg-no-repeat bg-center bg-contain md:bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="backdrop-blur-sm bg-black/40 min-h-screen flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Welcome to Document Recovery Hub
          </h1>

          <p className="text-lg mb-8 text-center">
            Manage your documents easily and securely.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/user/login")}
              className="btn-blue"
            >
              User Login
            </button>
            <button
              onClick={() => navigate("/user/register")}
              className="btn-green"
            >
              User Register
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="btn-blue"
            >
              Admin Login
            </button>
            <button
              onClick={() => navigate("/admin/register")}
              className="btn-green"
            >
              Admin Register
            </button>
          </div>
        </div>
      </div>
      {/* ABOUT */}
      <section
        id="about"
        className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* 🔥 TITLE + TYPEWRITER */}
          <Motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400">
              About Document Recovery Hub
            </h2>

            <p className="text-lg text-gray-300 mt-4">
              <Typewriter
                words={[
                  "Secure Document Recovery Platform",
                  "Fast, Reliable & Transparent System",
                  "Digital Solution for Lost Documents",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
              />
            </p>
          </Motion.div>

          {/* 🔥 MAIN CONTENT */}
          <Motion.div
            className="max-w-4xl mx-auto text-justify text-gray-300 leading-relaxed space-y-6 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <p className="text-gray-300 text-lg leading-relaxed text-justify">
              Document Recovery Hub is a secure and user-friendly digital
              platform designed to help individuals recover lost or damaged
              official documents quickly and efficiently. Our system simplifies
              the entire process by allowing users to submit requests online,
              upload necessary documents such as FIR copies, and track the
              status of their applications in real time. With a transparent
              approval workflow managed by authorized administrators, users
              receive verified and authenticated documents without unnecessary
              delays. The platform is built to reduce manual paperwork,
              eliminate long waiting times, and provide a seamless digital
              experience. By integrating modern technologies, we ensure data
              security, reliability, and ease of use for every user.We are
              committed to reducing paperwork, minimizing delays, and creating a
              hassle-free experience for users. 
            </p> */}

            <p>
              Document Recovery Hub is a secure and user-friendly digital
              platform designed to help individuals recover lost or damaged
              official documents efficiently. Our system simplifies the process
              by allowing users to submit requests, upload FIR copies, and track
              their application status in real time.
            </p>

            <p>
              With a transparent approval workflow and strong security measures,
              users receive verified documents without delays. Our goal is to
              reduce paperwork, save time, and provide a seamless digital
              experience. Whether it’s an educational certificate, identity
              proof, or any official document, Document Recovery Hub ensures a
              fast, secure, and transparent recovery process.
            </p>
          </Motion.div>

          {/* 🔥 FEATURE CARDS */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* CARD 1 */}
            <Motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center"
            >
              <FaShieldAlt className="text-3xl text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Secure</h3>
              <p className="text-sm text-gray-400 mt-2">
                Your data is protected with strong security measures.
              </p>
            </Motion.div>

            {/* CARD 2 */}
            <Motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center"
            >
              <FaFileUpload className="text-3xl text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Easy Upload</h3>
              <p className="text-sm text-gray-400 mt-2">
                Upload FIR and documents in just a few clicks.
              </p>
            </Motion.div>

            {/* CARD 3 */}
            <Motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center"
            >
              <FaSearch className="text-3xl text-yellow-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Track Status</h3>
              <p className="text-sm text-gray-400 mt-2">
                Monitor your request progress in real time.
              </p>
            </Motion.div>

            {/* CARD 4 */}
            <Motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center"
            >
              <FaCheckCircle className="text-3xl text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Verified Docs</h3>
              <p className="text-sm text-gray-400 mt-2">
                Get officially approved and verified documents.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      {/* 🔥 CONTACT SECTION (PREMIUM UI - NO IMAGE) */}
      <section
        id="contact"
        className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white px-6 py-12"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-10 gap-8 w-full">
          {/* 🔹 LEFT SIDE (CONTACT INFO - 30%) */}
          <Motion.div
            className="md:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-blue-400">Get in Touch</h2>

            <p className="text-gray-400">
              Have questions or need help? Reach out to us anytime.
            </p>

            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Email:</strong> support@documenthub.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Location:</strong> Coimbatore, Tamil Nadu
              </p>
            </div>

            {/* 🔥 SOCIAL ICONS */}
            <div className="flex gap-4 text-2xl mt-4">
              <a href="https://wa.me/" target="_blank">
                <FaWhatsapp className="hover:text-green-400 transition" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <FaInstagram className="hover:text-pink-400 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <FaLinkedin className="hover:text-blue-400 transition" />
              </a>
              <a href="https://github.com" target="_blank">
                <FaGithub className="hover:text-gray-400 transition" />
              </a>
            </div>
          </Motion.div>

          {/* 🔹 RIGHT SIDE (FORM - 70%) */}
          <Motion.div
            className="md:col-span-7 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input-dark"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="input-dark"
                />
              </div>

              {/* PHONE */}
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-dark"
              />

              {/* MESSAGE */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="input-dark h-28"
              ></textarea>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/30"
              >
                Send Message
              </button>
            </form>
          </Motion.div>
        </div>
      </section>

      {/* 🔥 FOOTER CTA SECTION */}
      <section className="bg-gray-950 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* TOP TEXT */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let’s work together today
            </h2>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Start Project →
            </button>
          </div>

          {/* LINKS SECTION */}
          <div className="grid md:grid-cols-3 gap-8 text-gray-400">
            {/* SITEMAP */}
            <div>
              <h3 className="text-white font-semibold mb-3">Sitemap</h3>
              <ul className="space-y-2">
                <li
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-blue-400 cursor-pointer transition"
                >
                  Home
                </li>

                <li
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-blue-400 cursor-pointer transition"
                >
                  About
                </li>

                <li
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-blue-400 cursor-pointer transition"
                >
                  Contact
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-white font-semibold mb-3">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* BRAND */}
            <div className="flex flex-col justify-between ">
              <h3 className="text-white font-bold tracking-widest text-lg text-end">
                DOCHUB
              </h3>
              <p className="text-sm mt-4 text-end">
                © 2026 SanThosH. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
