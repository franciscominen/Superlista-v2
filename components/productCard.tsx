import { IProduct } from '~/resources/types'

interface Props extends IProduct {

}

const ProductCard = ({ id, name, img }: Props) => {
    return (
        <div>
            <img src={img} alt="" />
            <h3>{ name }</h3>
        </div>
    )
}

export default ProductCard