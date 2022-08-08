import { useProductsActions } from '~/hooks'
import { IProduct } from '~/resources/types'

interface Props extends IProduct {
    product: IProduct
}

const ProductCard = (product: Props) => {

    const { addProduct } = useProductsActions()

    return (
        <div>
            <button onClick={() => addProduct(product)}>+</button>
            <img src={product.img} alt="" />
            <h3>{ product.name }</h3>
        </div>
    )
}

export default ProductCard