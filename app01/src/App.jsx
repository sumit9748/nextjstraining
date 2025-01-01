
import { Header } from "./ui/Header.jsx";
import { Fragment } from "react";
import { useState } from "react"
import { Counter } from "./ui/Counter.jsx";


const App = () => {
  const [st, setSt] = useState(0);
  return (
    <Fragment>
      <Header title="sumit" />
      <section className="container-fluid p4">

        <h3>My first react JS app</h3>
        <p>Hi i am sumit</p>
        <div className="row" onClick={() => setSt(prev => prev + 1)}>
          <Counter st={st} />
        </div>
      </section>
    </Fragment>
  )
}
export default App;