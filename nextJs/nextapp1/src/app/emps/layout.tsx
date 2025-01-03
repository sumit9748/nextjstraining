import Tabs from "@/ui/Tabs";

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <section>
            <h4>Employees</h4>
            <Tabs links={[
                {path:"/emps",icon:"bi bi-person-ruled",text:"Employees List"},
                {path:"/emps/add",icon:"bi bi-person-ruled",text:"New Employees"},
            ]}/>
            <div className="border border-top-0 p-4">
                {children}
            </div>
        </section>
    )
}