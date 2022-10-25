import { PDFDownloadLink } from "@react-pdf/renderer"
import styled from "styled-components"
import { fade } from "~/ui/styles/animations"
import PDFFile from "./PDFList"

const ModalButton = styled.button`
    font-size: 18px;
    font-weight: 700;
    background-color: var(--white);
    color: #8D8D8D;
    padding: 16px 16px;
    border-radius: 22px;
    margin-bottom: 12px;
    border: 3px solid #D2D2D2;
    margin: 12px auto;
    display: block;
    opacity: 0;
    animation: ${fade} .3s forwards;
    cursor: pointer;
`

const PDFDownloadButton = () => {
    return (
        <>
            <PDFDownloadLink document={<PDFFile />} fileName='Superlista.ar | Mi Lista'>
                <ModalButton>PDF</ModalButton>
            </PDFDownloadLink >
        </>
    )
}

export default PDFDownloadButton
