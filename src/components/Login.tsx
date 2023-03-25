import styled from "styled-components";
import { GitHub } from "react-feather";
import { ReactComponent as Astronaut } from "assets/vagabond.svg";
import { ReactComponent as GoogleLogo } from "assets/google-logo.svg";
import { useAppSelector } from "store";
import { Navigate } from "react-router-dom";
import { accountService } from "services/appwrite";

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const AuthProvidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 10px;
`;

const AuthProviderButton = styled.button`
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  background-color: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.pageBackgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  outline: none;
  padding: 10px;
  justify-items: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 250px;
  cursor: pointer;
  transition: all 150ms ease;
  &:hover {
    box-shadow: ${({ theme }) => `0px 5px 15px -2px ${theme.color}4c`};
    transform: translate(1px, -1px);
  }
`;

const AppLogo = styled.div`
  width: 250px;
  height: 250px;
  & svg {
    width: 250px;
    height: 250px;
  }
`;

const Google = styled(GoogleLogo)`
  & path {
    stroke: ${({ theme }) => theme.pageBackgroundColor};
  }
`;

const Login: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  if (user) return <Navigate to="/" />;

  const handleLogin = async (provider: "google" | "github") =>
    await accountService.createOAuth2Session(provider, "http://localhost:5173");

  return (
    <ViewContainer>
      <AppLogo>
        <Astronaut />
      </AppLogo>
      <AuthProvidersContainer>
        <AuthProviderButton onClick={() => handleLogin("github")}>
          Continue with Github <GitHub />
        </AuthProviderButton>

        <AuthProviderButton onClick={() => handleLogin("google")}>
          Continue with Google <Google />
        </AuthProviderButton>
      </AuthProvidersContainer>
    </ViewContainer>
  );
};

export default Login;
