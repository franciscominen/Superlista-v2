import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { useList } from "~/lib/hooks";

const OrderByCategoryButton = () => {
    const LIST = useList()
    const [isOrder, setIsOrder] = useState<boolean>(false)

    const orderByCategory = () => {
        setIsOrder(true)
        return LIST.sort((a, b) => (a.categoryID > b.categoryID) ? 1 : ((b.categoryID > a.categoryID) ? -1 : 0))
    }

    const unorderList = () => {
        setIsOrder(false)
        return LIST.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))
    }

    return (
        <>
            {
                !isOrder ?
                    <Link href='/mylist' >
                        <a>
                            <button onClick={orderByCategory} style={{ padding: '0', width: '46px', height: '46px' }}>
                                <Image src="/assets/unorder-icon.svg" alt='Order' width={28} height={28} />
                            </button>
                        </a>
                    </Link> :
                    <Link href='/mylist' >
                        <a>
                            <button onClick={unorderList} style={{ padding: '0', width: '46px', height: '46px' }}>
                                <Image src="/assets/order-icon.svg" alt='Order' width={28} height={28} />
                            </button>
                        </a>
                    </Link>
            }
        </>
    )
}

export default OrderByCategoryButton
