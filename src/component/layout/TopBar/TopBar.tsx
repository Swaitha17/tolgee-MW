import { Box, Slide, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { TolgeeLogo } from 'tg.component/common/icons/TolgeeLogo';
import { useConfig } from 'tg.globalContext/helpers';
import { LocaleMenu } from '../../LocaleMenu';
import { UserMenu } from '../../security/UserMenu/UserMenu';
import { AdminInfo } from './AdminInfo';
import { useTopBarHidden } from './TopBarContext';

export const TOP_BAR_HEIGHT = 52;

const StyledAppBar = styled(AppBar)(
  ({ theme }) =>
    ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...theme.mixins.toolbar,
      background: theme.palette.navbarBackground.main,
      boxShadow:
        theme.palette.mode === 'dark' ? 'none' : theme.mixins.toolbar.boxShadow,
    } as any)
);

const StyledToolbar = styled(Toolbar)`
  padding-right: 12.5px !important;
  padding-left: 12.5px !important;
  border: 2px solid #25C3FA !important;
`;

const StyledVersion = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  font-size: 11px;
`;

const StyledLogoTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  font-family: Righteous, Rubik, Arial, sans-serif;
  transition: filter 0.2s ease-in-out;
`;

const StyledLogoWrapper = styled(Box)`
  transition: filter 0.2s ease-in-out;
`;

const StyledTolgeeLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  outline: 0;

  &:focus ${StyledLogoWrapper} {
    filter: brightness(95%);
  }

  ,
&: focus ${StyledLogoTitle} {
    filter: brightness(95%);
  }
`;

// const StyledIconButton = styled(IconButton)`
//   width: 40px;
//   height: 40px;
// `;

type Props = {
  autoHide?: boolean;
  isAdminAccess?: boolean;
  isDebuggingCustomerAccount?: boolean;
};

export const TopBar: React.FC<Props> = ({
  autoHide = false,
  isAdminAccess = false,
  isDebuggingCustomerAccount = false,
}) => {
  const config = useConfig();
  const trigger = useTopBarHidden() && autoHide;
  const platformName = "";

  // const { mode, setMode } = useThemeContext();

  // const toggleTheme = () => {
  //   if (mode === 'dark') {
  //     setMode('light');
  //   } else {
  //     setMode('dark');
  //   }
  // };

  return (
    <div>
    <Slide appear={false} direction="down" in={!trigger}>
      <StyledAppBar>
        <StyledToolbar>
          <Box flexGrow={1} display="flex">
            <Box>
              <StyledTolgeeLink to={'/'}>
                <Box display="flex" alignItems="center">
                  <StyledLogoWrapper
                    pr={1}
                    display="flex"
                    justifyItems="center"
                  >
                    <TolgeeLogo />
                  </StyledLogoWrapper>
                  <StyledLogoTitle variant="h5" color="inherit">
                    {platformName}
                  </StyledLogoTitle>
                  {config.showVersion && (
                    <StyledVersion variant="body1">
                      {config.version}
                    </StyledVersion>
                  )}
                </Box>
              </StyledTolgeeLink>
            </Box>
            <AdminInfo
              adminAccess={isAdminAccess}
              debuggingCustomerAccount={isDebuggingCustomerAccount}
            />
          </Box>
          {/* <StyledIconButton onClick={toggleTheme} color="inherit"> */}
            {/* {mode === 'dark' ? <LightMode /> : <DarkMode />} */}
          {/* </StyledIconButton> */}
          <LocaleMenu />
          <UserMenu />
        </StyledToolbar>
      </StyledAppBar>
    </Slide>
    </div>
  );
};
