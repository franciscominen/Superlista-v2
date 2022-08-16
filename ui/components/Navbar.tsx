import Link from 'next/link'
import { Container } from '../styles/sharedStyles';

const Navbar = () => {
    return (
        <>
            <header>
                <Container>
                    
                </Container>
                <nav>
                    <Link href='/products'>PRODUCTOS</Link>
                    <Link href='/mylist'>MI LISTA</Link>
                </nav>
            </header>
        </>
    );
}

export default Navbar;