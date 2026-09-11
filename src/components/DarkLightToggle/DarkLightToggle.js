"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";
import VisuallyHidden from "@/components/VisuallyHidden";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import styles from "./DarkLightToggle.module.css";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);

    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key]);
    });
  }
  return (
    <button className={styles.action} onClick={handleClick}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
