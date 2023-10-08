import { OrderDetailsProvider } from "@context/OrderContext"

export const metadata = {
    title: 'Orders - Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function OrderLayout({ children }) {
    return (
        <OrderDetailsProvider>
            {children}
        </OrderDetailsProvider>

    )
}
