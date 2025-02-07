import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./LandingPage.module.css";
import SubjectCard from "./SubjectCard";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Sun,
  Moon,
  Bolt,
  Grid,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Bharat Kumar",
    role: "CS Student",
    text: "DJ Docs has transformed my learning experience. The structured content is amazing!",
    image: "https://avatar.iran.liara.run/public/36",
  },
  {
    name: "Kamlesh Gurjur",
    role: "CS Student",
    text: "This platform makes it super easy to find and study the right materials.",
    image: "https://avatar.iran.liara.run/public/13",
  },
  {
    name: "Vikash Reddy",
    role: "CS Student",
    text: "I love the ease of navigation and clear explanations of each topic.",
    image: "https://avatar.iran.liara.run/public/31",
  },
  {
    name: "Dilip Meghwal",
    role: "CS Student",
    text: "The best platform for structured CS documentation. Highly recommended!",
    image: "https://avatar.iran.liara.run/public/38",
  },
  {
    name: "Dushyant Singh Rao",
    role: "CS Student",
    text: "Dark mode and organized topics make my study sessions way more efficient.",
    image: "https://avatar.iran.liara.run/public/40",
  },
  {
    name: "Arjun Patel",
    role: "CS Student",
    text: "The interactive features really help me stay focused while learning.",
    image: "https://avatar.iran.liara.run/public/25",
  },
  {
    name: "Kaushlendra Chaurasiya",
    role: "CS Student",
    text: "I love the search functionality. Everything I need is just a click away!",
    image: "https://avatar.iran.liara.run/public/8",
  },
  {
    name: "Suman Yadav",
    role: "CS Student",
    text: "I can access all my study materials in one place. It's so convenient!",
    image: "https://avatar.iran.liara.run/public/12",
  },
  {
    name: "Neha Sharma",
    role: "CS Student",
    text: "The well-organized topics and search functionality are top-notch!",
    image: "https://avatar.iran.liara.run/public/17",
  },
];

const LandingPage = ({ subjects }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubjectsClick = (subjectCode) => {
    window.open(`/${subjectCode}`, "_blank");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingDocsRef = useRef(null);
  const handleExploreClick = () => {
    if (trendingDocsRef.current) {
      trendingDocsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I search for a document?",
      answer:
        "Use the search bar at the top of the page to find the subject you need.",
    },
    {
      question: "Can I contribute to the docs?",
      answer: "We are not currently accepting contributions at this time.",
    },
    {
      question: "How often is the content updated?",
      answer:
        "We regularly update documents to ensure they are current and accurate.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Currently, we offer only the web version, but it's fully responsive!",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach out to us via the 'Contact Us' page or send an email to support@djdocs.com.",
    },
    {
      question: "Is the content free?",
      answer:
        "Yes, all content is available for free to help students and professionals.",
    },
    {
      question: "Can I download the documents?",
      answer:
        "Currently, documents are only available for viewing on the website. We are working on offering download options in the future.",
    },
    {
      question: "Do I need to create an account to access the documents?",
      answer:
        "No, you can access all the documents without creating an account.",
    },
    {
      question: "How can I suggest new topics for documentation?",
      answer:
        "You can submit new topics via the 'Suggest a Topic' feature in your account settings.",
    },
    {
      question: "Are there any ads on the website?",
      answer:
        "No, we don't display ads on our website. We want the focus to remain on learning.",
    },
    {
      question: "How can I change the theme of the website?",
      answer:
        "You can toggle between light and dark mode using the theme switch button in the header.",
    },
    {
      question: "How do I navigate through different subjects?",
      answer:
        "You can explore the subjects via the homepage or use the search bar for direct access.",
    },
    {
      question: "Can I print documents?",
      answer: "No, you can't print the documentation",
    },
  ];

  const [isFAQVisible, setIsFAQVisible] = useState(false);
  const toggleFAQContainer = () => {
    setIsFAQVisible(!isFAQVisible);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    topicName: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitSuggestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/suggested-topics`,
        formData
      );
      alert("Topic suggested successfully!");
      setFormData({ username: "", email: "", topicName: "", description: "" });
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmitSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/subscriptions`, {
        name,
        email,
      });
      alert("Subscribed successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);  
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("heroImage");

    if (storedImage) {
      setImageUrl(storedImage);
    } else {
      const imageURL =
        "https://raw.githubusercontent.com/DJ-InfinityCoder/Coding-Quotes/main/cd.png";
      setImageUrl(imageURL);
      localStorage.setItem("heroImage", imageURL); // Save the image to localStorage
    }
  }, []);

  return (
    <div className={`${styles.app} ${theme === "dark" ? styles.darkMode : ""}`}>
      <header className={styles.navbar}>
        <h1 className={styles.logo}>DJ Docs</h1>
        <div className={styles.navRight}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search docs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button onClick={toggleTheme} className={styles.toggleButton}>
            {theme === "dark" ? (
              <Moon size={22} color="white" />
            ) : (
              <Sun size={22} />
            )}
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Welcome to DJ Docs</h2>
            <p className={styles.slogan}>
              DJ Docs – Code Smarter, Learn Faster
            </p>
            <p>
              Discover well-organized documentation for all your subjects. Start
              learning and coding more efficiently today!
            </p>
            <button className={styles.exploreBtn} onClick={handleExploreClick}>
              Explore Now
            </button>
          </div>
          <div className={styles.heroImage}>
            {imageUrl && <img src={imageUrl} alt="Coding Quote" />}
          </div>
        </section>

        <section className={styles.keyFeatures}>
          <h3 className={styles.sectionTitle}>Key Features</h3>
          <div className={styles.featuresContainer}>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <Search size={50} color="var(--teal)" />
              </div>
              <h4>Easy Search</h4>
              <p>Find documentation quickly with our smart search feature.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <Bolt size={50} color="var(--teal)" />
              </div>
              <h4>Fast & Lightweight</h4>
              <p>No unnecessary bloat, loads instantly and efficiently.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <Grid size={50} color="var(--teal)" />
              </div>
              <h4>Well-Organized Topics</h4>
              <p>
                Browse through clearly structured subjects for easy learning.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <Moon size={50} color="var(--teal)" />
              </div>
              <h4>Dark Mode</h4>
              <p>
                Switch to dark mode for a comfortable reading experience at
                night.
              </p>
            </div>
          </div>
        </section>

        <section ref={trendingDocsRef} className={styles.trendingDocs}>
          <h3 className={styles.sectionTitle}>Trending Documents</h3>
          <div className={styles.cardsContainer}>
            {filteredSubjects.slice(0, 5).map((subject) => (
              <SubjectCard
                key={subject.subjectCode}
                name={subject.subjectName}
                subjectCode={subject.subjectCode}
                onSubjectClick={handleSubjectsClick}
                imageUrl={subject.subjectImage}
              />
            ))}
          </div>
        </section>

        <section className={styles.testimonials}>
          <h3 className={styles.sectionTitle}>What Our Users Say</h3>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              nextEl: `.${styles.nextButton}`,
              prevEl: `.${styles.prevButton}`,
            }}
            className={styles.testimonialsContainer}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={styles.avatar}
                  />
                  <p className={styles.testimonialText}>“{testimonial.text}”</p>
                  <span className={styles.testimonialName}>
                    {testimonial.name}
                  </span>
                  <span className={styles.testimonialRole}>
                    {testimonial.role}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={`${styles.navButton} ${styles.prevButton}`}>&lt;</div>
          <div className={`${styles.navButton} ${styles.nextButton}`}>&gt;</div>
        </section>

        <section className={styles.faq}>
          <h3 className={styles.sectionTitle}>Frequently Asked Questions</h3>
          <div className={styles.btnContainer}>
            <button className={styles.faqBtn} onClick={toggleFAQContainer}>
              {isFAQVisible ? "Hide FAQs" : "Show FAQs"}
            </button>
          </div>

          {isFAQVisible && (
            <div className={styles.faqContainer}>
              {faqData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  className={`${styles.faqItem} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                >
                  <div className={styles.question}>
                    <div className={styles.questionContainer}>
                      <strong>{item.question}</strong>
                      <span className={styles.icon}>
                        {activeIndex === index ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </span>
                    </div>
                  </div>
                  {activeIndex === index && <p>{item.answer}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.suggestions}>
          <h3 className={styles.sectionTitle}>Suggest a Topic</h3>
          <p>
            Have a topic in mind? Share it with us and help improve our docs!
          </p>
          <form onSubmit={handleSubmitSuggestion} className={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="topicName"
              placeholder="Topic Name"
              value={formData.topicName}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submitButton}>Submit Suggestion</button>
          </form>
        </section>

        <section className={styles.subsription}>
          <h3 className={styles.sectionTitle}>Stay Updated</h3>
          <p>
            Subscribe to receive the latest docs and updates directly in your
            inbox.
          </p>
          <form onSubmit={handleSubmitSubscribe} className={styles.form}>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 DJ Docs. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
