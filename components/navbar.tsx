import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <header>
                <nav>
                    <Link href='/products'>PRODUCTOS</Link>
                    <Link href='/mylist'>MI LISTA</Link>
                </nav>
            </header>
        </>
    );
}

export default Navbar;