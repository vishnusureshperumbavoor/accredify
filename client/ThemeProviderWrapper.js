import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from './Theme';

function ThemeProviderWrapper({ children, theme }) {
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviderWrapper;
