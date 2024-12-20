import { BrowserRouter, Routes, Route } from "react-router";
import { Nav, PhoneLayout } from "@/components";
import { Contexts } from "@/context";
import { Home, Tag, Book } from "@/pages";

const App = () => {
  return (
    <Contexts>
      <PhoneLayout>
        <div className="app">
          <BrowserRouter>
            <Nav />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tag/:id" element={<Tag />} />
                <Route path="/book/:id" element={<Book />} />
              </Routes>
            </div>
            <img
              src="/bottom_nav.png"
              alt="bottom navigation"
              className="w-100"
            />
          </BrowserRouter>
        </div>
      </PhoneLayout>
    </Contexts>
  );
};

export default App;
