import "./globals.css";
import Starfield from "./components/stars";
import Header from "./components/Header";

export const metadata = {
  title: "Planets Database",
  description: "Rare planets cataloged",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Starfield />
        <Header />
        <div id="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
