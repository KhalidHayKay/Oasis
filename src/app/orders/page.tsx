import { orderService } from '@/services/orderService';
import OrdersView from '@/view/orders';

export default async function Page() {
	const orders = await orderService.all();

	return <OrdersView orders={orders} />;
}
