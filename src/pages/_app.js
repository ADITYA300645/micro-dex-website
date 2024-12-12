import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
      <ThemeProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
      </ThemeProvider>
  );
}
