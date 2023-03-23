import styled from "styled-components";
import { Map, Menu, Sun, Moon } from "react-feather";
import type { Icon, IconProps } from "react-feather";
import { Theme } from "../styled";
import { themes } from "../styles/themes";

export const NAV_HEIGHT = "40px";

const TopNav = styled.nav`
  width: 100%;
  height: ${NAV_HEIGHT};
  display: grid;
  grid-template-columns: 1fr repeat(2, auto);
  column-gap: 15px;
  align-items: center;
  & svg {
    stroke: ${({ theme }) => theme.color};
  }
`;

const StyledButtonWithIcon = styled.button<{ size?: number | string }>`
  margin: 0;
  padding: 0;
  height: ${({ size }) => (size !== undefined ? size + "px" : "24px")};
  width: ${({ size }) => (size !== undefined ? size + "px" : "24px")};
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

interface HeaderProps {
  toggleDarkMode: () => void;
  theme: Theme;
}

type IButtonWithIcon = React.ComponentPropsWithoutRef<"button"> &
  IconProps & {
    Icon: Icon;
  };

const ButtonWithIcon = ({ Icon, ...rest }: IButtonWithIcon) => (
  <StyledButtonWithIcon {...rest}>
    <Icon />
  </StyledButtonWithIcon>
);

const Header: React.FC<HeaderProps> = ({ theme, toggleDarkMode }) => (
  <TopNav>
    <ButtonWithIcon Icon={Map} disabled name="Coming soon..." />
    <ButtonWithIcon
      Icon={theme === "dark" ? Sun : Moon}
      onClick={toggleDarkMode}
      color={themes[theme].color}
      size={50}
    />
    <ButtonWithIcon Icon={Menu} disabled name="Coming soon..." />
  </TopNav>
);

export default Header;
