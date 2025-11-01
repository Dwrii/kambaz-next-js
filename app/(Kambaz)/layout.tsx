"use client";
import "./styles.css";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";

interface KambazLayoutProps {
  children: ReactNode;
}

export default function KambazLayout({ children }: KambazLayoutProps) {
  return (
      <Provider store={store}>
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">{children}</div>
      </div>
    </div>
    </Provider>
  );
}
