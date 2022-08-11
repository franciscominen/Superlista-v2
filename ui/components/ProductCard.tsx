import { useState } from 'react'
import { useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import NoteModal from './NoteModal'

interface Props extends IProduct {
    product: IProduct
}

const ProductCard = (product: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { addProduct } = useProductsActions()

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className='productCard_container'>
                <button onClick={() => setShowModal(true)}>EDIT</button>
                <button onClick={() => addProduct(product)}>+</button>
                <img src={product.img} alt="" />
                <h3>{product.name}</h3>
            </div>
            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />
        </>
    )
}

export default ProductCard
