import { BrowserRouter, HashRouter } from "react-router-dom";

export default function RouterProvider({ children }) {
  const isDev = import.meta.env.DEV || true;
  // true saat npm run dev
  // false saat npm run build

  return isDev ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    <HashRouter>{children}</HashRouter>
  );
}
