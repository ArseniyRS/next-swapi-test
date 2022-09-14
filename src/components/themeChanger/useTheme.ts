import { useEffect, useState } from "react";

export enum EThemeVars {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export const useTheme = () => {
  const [theme, setTheme] = useState<EThemeVars>(EThemeVars.LIGHT);
  useEffect(() => {
    const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeDefault = isDarkTheme ? EThemeVars.DARK : EThemeVars.LIGHT;
    setTheme((localStorage.getItem("app-theme") as EThemeVars) || themeDefault);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
