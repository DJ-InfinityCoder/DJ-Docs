import React, { useEffect, useContext } from "react";
import styles from "./Page.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const MainContent = ({ content }) => {
  const { theme } = useContext(ThemeContext);

  const renderItem = (item, index) => {
    if (item.type == "title") {
      return (
        <>
          <h1
            className={`${styles.title} ${
              theme === "dark" ? styles.darkMode : ""
            }`}
            key={index}
          >
            {item.content}
            <hr className={styles.titleHr} />
          </h1>
        </>
      );
    }

    switch (item.type) {
      case "h2":
        return (
          <h2 className={styles.h2} key={index}>
            {item.content}
          </h2>
        );
      case "h3":
        return (
          <h3 className={styles.h3} key={index}>
            {item.content}
          </h3>
        );
      case "h4":
        return (
          <h4 className={styles.h4} key={index}>
            {item.content}
          </h4>
        );
      case "h5":
        return (
          <h5 className={styles.h5} key={index}>
            {item.content}
          </h5>
        );
      case "h6":
        return (
          <h6 className={styles.h6} key={index}>
            {item.content}
          </h6>
        );
      case "paragraph":
        return (
          <p className={styles.p} key={index}>
            {item.content}
          </p>
        );
      // case "nextButton":
      //   return (
      //     <button className={styles.nextButton} key={index}>
      //       <div className={styles.btnText}>{item.content}</div>
      //     </button>
      //   );
      case "img":
        return (
          <div className={styles.imgDiv}>
            <img
              className={styles.img}
              key={index}
              src={item.src}
              alt={item.alt}
            />
          </div>
        );
      case "ul":
        return (
          <ul className={styles.ul} key={index}>
            {item.content.map((listItem, listIndex) => (
              <li className={styles.li} key={listIndex}>
                {listItem}
              </li>
            ))}
          </ul>
        );
        case "ul_withContent":
          return (
            <ul className={styles.ul}>
              {item.content.map((list, index) => (
                <li className={styles.li} key={index}>
                  <strong>{list.title}</strong>
                  <p>{list.content}</p>
                </li>
              ))}
            </ul>
          );
      case "ol":
        return (
          <ol className={styles.ol} key={index}>
            {item.content.map((listItem, listIndex) => (
              <li className={styles.li} key={listIndex}>
                {listItem}
              </li>
            ))}
          </ol>
        );
      case "ol_withContent":
        return (
          <ol className={styles.ol}>
            {item.content.map((list, index) => (
              <li className={styles.li} key={index}>
                <strong>{list.title}</strong>
                <p>{list.content}</p>
              </li>
            ))}
          </ol>
        );
      case "div":
        return (
          <div className={styles.div} key={index}>
            {item.content}
          </div>
        );
      case "span":
        return (
          <span className={styles.span} key={index}>
            {item.content}
          </span>
        );
      case "table":
        return (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  {item.content[0].columns.map((column, columnIndex) => (
                    <th className={styles.td} key={columnIndex}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.content[0].rows.map((row, rowIndex) => (
                  <tr className={styles.tr} key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td className={styles.td} key={cellIndex}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "select":
        return (
          <select className={styles.select} key={index}>
            {item.options.map((option, optionIndex) => (
              <option className={styles.option} key={optionIndex}>
                {option}
              </option>
            ))}
          </select>
        );
      case "option":
        return (
          <option className={styles.option} key={index}>
            {item.content}
          </option>
        );
      case "br":
        return <br key={index} />;
      case "hr":
        return <hr className={styles.hr} key={index} />;
      case "strong":
        return (
          <strong className={styles.strong} key={index}>
            {item.content}
          </strong>
        );
      case "section":
        return (
          <section className={styles.section} key={index}>
            {item.content}
          </section>
        );
      case "code":
        return (
          <code className={styles.code} key={index}>
            {item.content}
          </code>
        );
      case "pre":
        return (
          <pre className={styles.pre} key={index}>
            <code>{item.content}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  const renderIntroContent = (introContent) => {
    return introContent.map((item, index) => renderItem(item, index));
  };

  const renderTopics = (mainContent) => {
    return (
      <div>
        {mainContent.map((section, sectionIndex) => {
          const contentId = section.heading
            ? section.heading
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .toLowerCase()
            : undefined;
          const sectionKey = `section-${sectionIndex}`;
          return (
            <div key={sectionKey} id={contentId}>
              <div className={styles.contentSection}>
                {section.heading && (
                  <h2 className={styles.h2}>{section.heading}</h2>
                )}
                {section.content.map((item, index) => renderItem(item, index))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href")?.replace("#", "");
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offset = 20;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", smoothScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", smoothScroll);
      });
    };
  }, [content]);

  return (
    <main
      className={`${styles.main} ${theme === "dark" ? styles.darkMode : ""}`}
    >
      {content[0]?.heading
        ? renderTopics(content)
        : renderIntroContent(content)}
    </main>
  );
};

export default MainContent;
