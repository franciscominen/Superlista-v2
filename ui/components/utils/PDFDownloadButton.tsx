import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFList from "./PDFList";
import Image from "next/image";
import styled from "styled-components";
import { scaleInCenter } from "~/ui/styles/animations";

const ShareButton = styled.button`
  background: var(--white);
  border-radius: 0 15px 15px 15px;
  border: 2px solid var(--gray);
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0 6px;
  animation: ${scaleInCenter} 0.3s ease both;
`;

const PDFDownloadButton = () => {
  return (
    <>
      <PDFDownloadLink
        document={<PDFList />}
        fileName="Superlista.ar-MiLista.pdf"
      >
        <ShareButton>
          <Image
            src="/assets/icons/pdf-icon.svg"
            alt="Copy Link"
            height={30}
            width={30}
            style={{ position: "relative", top: "2px" }}
          />
        </ShareButton>
      </PDFDownloadLink>
    </>
  );
};

export default PDFDownloadButton;
