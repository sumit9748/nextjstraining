import { Fragment } from "react/jsx-runtime";
import Header from "./ui/Header";
import { FC } from "react";
import ContactList from "./ui/ContactList";

import { BrowserRouter, Routes, Route, Link } from "react-router";
import ContactForm from "./ui/ContactForm";

const App: FC<any> = () => (
  <Fragment>
    <BrowserRouter>
      <Header appTitle="Address Book"
        links={[
          { icon: "bi-person-lines-fill", text: "Contacts-List", path: "/" },
          { icon: "bi-person-lines-fill", text: "Contacts-List", path: "/add" }
        ]}
      />



      <Routes>
        <Route path="/" element={<ContactList />} />


        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>


  </Fragment >
)

export default App;