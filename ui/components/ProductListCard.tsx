import { useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'

interface Props extends IProduct {
    product: IProduct
}

const ProductListCard = (product: Props) => {

    const { removeProduct } = useProductsActions()

    return (
        <div>
            <button onClick={() => removeProduct(product.id)}>-</button>
            <img src={product.img} alt="" />
            <h3>{ product.name }</h3>
        </div>
    )
}

export default ProductListCard
