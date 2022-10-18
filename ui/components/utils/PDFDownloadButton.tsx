import { PDFDownloadLink } from "@react-pdf/renderer"
import PDFFile from "./PDFList"

const PDFDownloadButton = () => {
    return (
        <>
            <PDFDownloadLink document={<PDFFile />} fileName='MiLista'>
                <button>PDF</button>
            </PDFDownloadLink >
        </>
    )
}

export default PDFDownloadButton
