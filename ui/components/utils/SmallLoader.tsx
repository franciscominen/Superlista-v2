import { CenterContainer } from "~/ui/styles/sharedStyles";

const SmallLoader = () => {
  return (
    <>
      <CenterContainer>
        <span className="loader"></span>
      </CenterContainer>

      <style jsx>{`
        .loader {
          width: 40px;
          height: 40px;
          margin: 10px 0;
          border: 2px solid var(--dark);
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 0.7s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default SmallLoader;
