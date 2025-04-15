import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <section className={styles.sec}>
      <div className={styles.loader}>
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ "--i": i + 1 }}></span>
        ))}
      </div>
    </section>
  );
};

export default Loader;
