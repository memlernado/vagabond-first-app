import type { ITheme } from "../styled";

const common = {
  borderRadius: "10px",
};

const light: ITheme = {
  ...common,
  id: "light",
  pageBackgroundColor: "#ffffff",
  // color: "#38383b",
  color: "#14213d",
};

const dark: ITheme = {
  ...common,
  id: "dark",
  // pageBackgroundColor: "#38383b",
  pageBackgroundColor: "#14213d",
  color: "#ffffff",
};

export const themes = {
  light,
  dark,
};
