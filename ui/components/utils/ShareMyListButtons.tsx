import { CenterContainer, ModalButton } from "~/ui/styles/sharedStyles";
import SmallLoader from "./SmallLoader";
import PDFDownloadButton from "./PDFDownloadButton";

interface Props {
  loading: boolean,
  condition: boolean,
  createListFunction: any,
  updateListFunction: any,
}

const ShareMyListButtons: React.FC<Props> = ({
  loading,
  condition,
  createListFunction,
  updateListFunction,
}) => {
  const shareButton = (
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
  const updateButton = (
    <>
      {loading ? (
        <SmallLoader />
      ) : (
        <CenterContainer>
          <ModalButton onClick={updateListFunction}>ACTUALIZAR</ModalButton>
          <PDFDownloadButton />
        </CenterContainer>
      )}
    </>
  );

  return <>{condition ? updateButton : shareButton}</>;
};

export default ShareMyListButtons;
