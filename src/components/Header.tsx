import styled from "styled-components";
import { Map, Sun, Moon, Command, LogOut } from "react-feather";
import type { Icon, IconProps } from "react-feather";
import { themes } from "../styles/themes";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { toggleTheme } from "store/features/themeSlice";
import { accountService } from "services/appwrite";
import { setUser } from "store/features/authSlice";

export const NAV_HEIGHT = "70px";

const TopNav = styled.nav`
  width: 100%;
  height: ${NAV_HEIGHT};
  padding: 10px;
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

type IButtonWithIcon = React.ComponentPropsWithoutRef<"button"> &
  IconProps & {
    Icon: Icon;
  };

const ButtonWithIcon = ({ Icon, ...rest }: IButtonWithIcon) => (
  <StyledButtonWithIcon {...rest}>
    <Icon />
  </StyledButtonWithIcon>
);

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const theme = useAppSelector((state) => state.theme.theme);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <TopNav>
      {pathname !== "/login" && (
        <Link to={pathname === "/map" ? "/" : "/map"}>
          <ButtonWithIcon Icon={pathname === "/map" ? Command : Map} />
        </Link>
      )}
      <ButtonWithIcon
        Icon={theme === "dark" ? Sun : Moon}
        onClick={() => dispatch(toggleTheme())}
        color={themes[theme].color}
      />

      {user && (
        <ButtonWithIcon
          Icon={LogOut}
          name="logout"
          onClick={() => {
            accountService
              .deleteSession("current")
              .then(() => dispatch(setUser(null)));
          }}
        />
      )}
    </TopNav>
  );
};

export default Header;
