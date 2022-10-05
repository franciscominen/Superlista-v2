import { NextPage } from "next"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from "react"
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { fade } from "~/ui/styles/animations";

const Embla = styled.div`
    overflow: hidden;
    width: 80%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    animation: ${fade} .4s ease-in .2s both;
`

const SlideTitle = styled.h2`
    font-weight: bold;
    font-size: 20px;
    margin-top: 6px;
`

const SlideText = styled.p`
    font-size: 20px;
    text-align: center;
    line-height: 1.4;
    padding: 0 24px;
`

const Line = styled.figure`
    height: 0.6px;
    width: 90%;
    background-color: var(--darkgrey);
    margin: 0 auto 20px auto;
`

const FinishButton = styled.button`
    font-size: 18px;
    background-color: var(--white);
    font-weight: bold;
    padding: 18px;
    width: 240px;
    border-radius: 20px;
`

const CloseButton = styled.button`
    width: 100%;
    text-align: right;
    position: relative;
    right: 18px;
`

const Dot = styled.button<{ selected: boolean }>`
    transition: all .2s;
    background-color: ${({ selected }) => selected ? 'var(--darkgrey)' : 'var(--gray)'};
    width: 30px;
    height: 12px;
    border-radius: 14px;
`

const HowToUse: NextPage = () => {
    const router = useRouter()
    const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<any>([])

    const onClose = () => {
        router.push('/')
    }

    const scrollTo = useCallback((index: any) => embla && embla.scrollTo(index), [
        embla
    ]);

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
                            Con <strong>Superlista</strong> podés
                            generar tu lista de productos
                            para ir al supermercado.<br /><br />
                            En un futuro podrás crear listas de <strong>manera colaborativa</strong> con otras personas.<br /><br />
                            Los productos son <strong>generales</strong>,
                            es decir que no llevan marcas, ni detalles extras.
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
                            En <strong>Productos</strong> encontrarás justamente eso, diferenciados por categoría.
                            También hay<br /> un <strong>buscador</strong>.<br /><br />
                            Los productos que agregues
                            aparecerán en <strong>Mi Lista</strong>.
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
                            Para <strong>agregar</strong> un producto debés tocar el botón <Image src="/assets/icons/add-icon.svg" height={20} width={20} />.<br /><br />
                            Para agregar un producto con una <strong>descripción</strong>, tendrás que
                            presionar <Image src="/assets/icons/edit-icon.svg" height={20} width={20} style={{ marginLeft: '4px' }} />.
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
                        <SlideText>En <strong>Mi Lista</strong> podrás editar o eliminar productos.</SlideText>
                        <Line></Line>
                        <Image
                            src="/assets/howtouse/share.svg"
                            alt="Filter"
                            height={60}
                            width={260}
                        />
                        <SlideText>Tambien podrás <strong>compartirla</strong> mediante el link generado.</SlideText>
                    </div>
                    <div className="embla__slide slide_5">
                        <SlideTitle>READY</SlideTitle>
                        <SlideText> <strong>Esperamos que te sea<br /> de ayuda</strong>, cualquier inconveniente podes contactarte con Dios.</SlideText>
                        <Image
                            src="/assets/howtouse/banner.svg"
                            alt="Filter"
                            height={130}
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
                        >
                        </Dot>
                    ))}
                </div>
            </Embla>
            <style jsx>{`
            .embla__container {
                display: flex;
                gap: 14px;
            }
            .embla__slide {
                flex: 0 0 100%;
                text-align: center;
                height: 65vh;
                margin: 0 0 20px 0;
                padding: 24px 0;
                border-radius: 25px;
            }
            .slide_1 {
                background: #ABFFA9;
            }
            .slide_2 {
                background: #FFECBB;
            }
            .slide_3 {
                background: #FFAD93;
            }
            .slide_4 {
                background: #A9DBFF;
            }
            .slide_5 {
                background: #D4A9FF;
                padding-top: 3em;
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
    )
}

export default HowToUse
