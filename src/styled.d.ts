import "styled-components";

type Theme = "light" | "dark";

interface ITheme {
  id: Theme;
  pageBackgroundColor: string;
  color: string;
  borderRadius: string;
}

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
