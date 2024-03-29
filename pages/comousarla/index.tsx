import { NextPage } from "next";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { fade } from "~/ui/styles/animations";
import { Strong } from "~/ui/styles/sharedStyles";

const Embla = styled.div`
  margin: auto;
  overflow: hidden;
  width: 80%;
  height: 29em;
  display: flex;
  flex-direction: column;
  animation: ${fade} 0.4s ease-in 0.2s both;
`;

const SlideTitle = styled.h2`
  font-size: 18px;
  margin-top: 6px;
  margin: 0 0 16px 0;
`;

const SlideText = styled.p`
  font-size: 17px;
  text-align: center;
  line-height: 1.4;
  padding: 0 24px;
  margin: 16px 0;
`;

const Line = styled.figure`
  height: 0.6px;
  width: 90%;
  background-color: var(--darkgrey);
  margin: 0 auto 20px auto;
`;

const FinishButton = styled.button`
  font-size: 18px;
  background-color: var(--white);
  font-weight: bold;
  padding: 18px;
  width: 240px;
  border-radius: 20px;
  margin: 16px 0 12px 0;
`;

const CloseButton = styled.button`
  width: 100%;
  text-align: right;
  position: relative;
  right: 18px;
`;

const Dot = styled.button<{ selected: boolean }>`
  transition: all 0.2s;
  background-color: ${({ selected }) =>
    selected ? "var(--darkgrey)" : "var(--gray)"};
  width: 30px;
  height: 12px;
  border-radius: 14px;
`;

const HowToUse: NextPage = () => {
  const router = useRouter();
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<any>([]);

  const onClose = () => {
    router.push("/");
  };

  const scrollTo = useCallback(
    (index: any) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <main
        style={{
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Embla className="embla" ref={viewportRef}>
          <div className="embla__container">
            <div className="embla__slide slide_1">
              <CloseButton onClick={onClose}>
                <Image
                  src="/assets/icons/close-icon.svg"
                  alt="Filter"
                  height={26}
                  width={26}
                />
              </CloseButton>
              <SlideTitle>¡BUUENAS!</SlideTitle>
              <SlideText>
                Con <Strong>Superlista</Strong> podés
                <br />
                generar tu lista de productos
                <br />
                para ir al supermercado.
                <br />
                <br />
                Podrás crear listas de <Strong>manera colaborativa</Strong> con
                otras personas.
                <br />
                <br />
                Los productos son <Strong>generales</Strong>,<br />
                es decir que no llevan marcas,
                <br /> ni detalles extras.
              </SlideText>
            </div>
            <div className="embla__slide slide_2">
              <CloseButton onClick={onClose}>
                <Image
                  src="/assets/icons/close-icon.svg"
                  alt="Filter"
                  height={26}
                  width={26}
                />
              </CloseButton>
              <SlideTitle>MENÚ</SlideTitle>
              <Image
                src="/assets/howtouse/navbar.svg"
                alt="Filter"
                height={100}
                width={260}
              />
              <SlideText>
                En <Strong>Productos</Strong> encontrarás justamente eso,
                diferenciados
                <br /> por categoría. También hay
                <br /> un <Strong>buscador</Strong>.<br />
                <br />
                Los productos que agregues aparecerán en{" "}
                <Strong>Mi Lista</Strong>.
              </SlideText>
            </div>
            <div className="embla__slide slide_3">
              <CloseButton onClick={onClose}>
                <Image
                  src="/assets/icons/close-icon.svg"
                  alt="Filter"
                  height={26}
                  width={26}
                />
              </CloseButton>
              <SlideTitle>AGREGAR PRODUCTO</SlideTitle>
              <Image
                src="/assets/howtouse/product.svg"
                alt="Filter"
                height={125}
                width={120}
              />
              <SlideText>
                Para <Strong>agregar</Strong> un producto
                <br /> debés tocar el botón{" "}
                <Image
                  src="/assets/icons/add-icon.svg"
                  height={20}
                  width={20}
                  alt="+"
                />
                .<br />
                <br />
                Para agregar un producto con una <Strong>descripción</Strong>,
                tendrás que
                <br />
                presionar{" "}
                <Image
                  alt="edit"
                  src="/assets/icons/edit-icon.svg"
                  height={20}
                  width={20}
                  style={{ marginLeft: "4px" }}
                />
                .
              </SlideText>
            </div>
            <div className="embla__slide slide_4">
              <CloseButton onClick={onClose}>
                <Image
                  src="/assets/icons/close-icon.svg"
                  alt="Filter"
                  height={26}
                  width={26}
                />
              </CloseButton>
              <SlideTitle>MI LISTA</SlideTitle>
              <Image
                src="/assets/howtouse/list.svg"
                alt="Filter"
                height={60}
                width={260}
              />
              <SlideText>
                En <Strong>Mi Lista</Strong> podrás editar
                <br /> o eliminar productos.
              </SlideText>
              <Line></Line>
              <Image
                src="/assets/howtouse/share.svg"
                alt="Filter"
                height={60}
                width={260}
              />
              <SlideText>
                Podés <Strong>compartir</Strong> tu lista por <Strong>Whatsapp, link o PDF</Strong>, también podes actualizarla.
              </SlideText>
            </div>
            <div className="embla__slide slide_5">
              <SlideTitle>READY</SlideTitle>
              <SlideText>
                {" "}
                <Strong>Esperamos que te sea de ayuda</Strong>,<br /> cualquier
                inconveniente podes
                <br /> contactarte con Dios.
              </SlideText>
              <Image
                src="/assets/howtouse/banner.svg"
                alt="Filter"
                height={110}
                width={230}
              />
              <FinishButton onClick={onClose}>Comenzar</FinishButton>
            </div>
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_: any, index: any) => (
              <Dot
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              ></Dot>
            ))}
          </div>
        </Embla>
      </main>
      <style jsx>{`
        .embla__container {
          display: flex;
          gap: 14px;
        }
        .embla__slide {
          flex: 0 0 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 27em;
          margin: 0 0 20px 0;
          padding: 24px 0;
          border-radius: 25px;
        }
        .slide_1 {
          background: #abffa9;
        }
        .slide_2 {
          background: #ffecbb;
        }
        .slide_3 {
          background: #ffad93;
        }
        .slide_4 {
          background: #a9dbff;
        }
        .slide_5 {
          background: #d4a9ff;
          padding-top: 4.1em;
        }
        .embla__dots {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 75%;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default HowToUse;
