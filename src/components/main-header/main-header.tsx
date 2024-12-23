import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import classes from './main-header.module.css';
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground/>
            <header className={classes.header}>
                <Link href={'/'} className={classes.logo}>
                    <Image src={logoImg}
                           alt="A plate with food on it"
                           priority
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={"/meals"}>Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href={"/community"}>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>

    );
}
