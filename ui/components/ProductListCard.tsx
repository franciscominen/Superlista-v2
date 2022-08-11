import { useState } from 'react'
import { useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import NoteModal from './NoteModal'


interface Props extends IProduct {
    product: IProduct
}

const ProductListCard = (product: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { removeProduct } = useProductsActions()

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>EDIT</button>
            <button onClick={() => removeProduct(product.id)}>-</button>
            <img src={product.img} alt="" />
            <h3>{product.name}</h3>
            <p>{product.nota}</p>
            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />
        </div>
    )
}

export default ProductListCard
