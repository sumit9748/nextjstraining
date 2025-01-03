import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"

import "./global.css"
import Script from "../../node_modules/next/script"
import Header from "@/ui/Header";

export default function RootLayout({children}:Readonly<{children:React.ReactNode;}>){
  return(
    <html lang="un">
      <body>
        <Script src="bootstrap/dist/js/bootstrap.min.js"/>
        <Header appTitle="My first nextjs app"
        links={[
          {path:"/",icon:"bi bi-house",text:"Home"},
          {path:"/about",icon:"bi bi-file-ruled",text:"About us"},
          {path:"/depts",icon:"bi bi-file-person",text:"Departments"},
          {path:"/emps",icon:"bi bi-person-fill",text:"Employees"}
        ]}/>
        <div className="container-fluid p-4">
          {children}
        </div>
      </body>
    </html>
  )
}