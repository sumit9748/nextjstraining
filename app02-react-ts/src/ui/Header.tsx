import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
    appTitle: string;
}
interface AppLink {
    icon: string;
    text: string;
    path: string;
}
interface HeaderProps {
    appTitle: string;
    links?: AppLink[];
}


const Header: FC<HeaderProps> = ({ appTitle, links }) => {
    const { pathname } = useLocation();
    return (

        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">{appTitle}</Link>
                {
                    links && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                links.map(link => (
                                    <li className="nav-link">
                                        <Link className={pathname === link.path ? "nav-link active" : "nav-link"} to={link.path}>
                                            <i className={link.icon} />{link.text}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}

export default Header;