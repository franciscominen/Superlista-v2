import { CenterContainer, ModalButton } from "~/ui/styles/sharedStyles";
import SmallLoader from "./SmallLoader";
import PDFDownloadButton from "./PDFDownloadButton";

interface Props {
  loading: boolean;
  createListFunction: any;
}

const ShareMyListButton: React.FC<Props> = ({
  loading,
  createListFunction,
}) => {
  return (
    <>
      {loading ? (
        <SmallLoader />
      ) : (
        <CenterContainer>
          <ModalButton onClick={createListFunction}>COMPARTIR</ModalButton>
          <PDFDownloadButton />
        </CenterContainer>
      )}
    </>
  );
};

export default ShareMyListButton;
