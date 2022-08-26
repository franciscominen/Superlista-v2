import Link from 'next/link'
import { useUtils } from '~/lib/hooks';
import { StyledFooter } from '../styles/sharedStyles';

const Footer = () => {
    const { searchValue } = useUtils()
    console.log(searchValue);
    
    return (
        <>
            <StyledFooter>
                Superlista.ar | Todos los derechos reservados.
            </StyledFooter>
        </>
    );
}

export default Footer;