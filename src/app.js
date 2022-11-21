import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Context from "./contexts/Context";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import InputPage from "./pages/InputPage/InputPage";
import OutputPage from "./pages/OutputPage/OutputPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [config, setConfig] = useState({});

  return (
    <Context.Provider value={{ userInfo, setUserInfo, config, setConfig }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
