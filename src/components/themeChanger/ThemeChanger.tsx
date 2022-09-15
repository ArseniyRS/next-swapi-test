import React from "react";
import { EThemeVars, useTheme } from "./useTheme";
import styles from "./ThemeChanger.module.scss";
const config = [
  {
    type: EThemeVars.LIGHT,
    color: "rgb(97, 240, 41)",
  },
  {
    type: EThemeVars.DARK,
    color: "rgb(255 0 76)",
  },
];

function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const buttons = config.map((themeType) => (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      key={themeType.type}
      type="button"
      style={{ background: themeType.color }}
      className={theme === themeType.type ? styles.theme__active : undefined}
      onClick={() => setTheme(themeType.type)}
    />
  ));
  return (
    <div className={styles.theme}>
      <span>
        choose
        <br /> side
      </span>
      <div className={styles.theme__buttons}>{buttons}</div>
    </div>
  );
}
export default ThemeChanger;
