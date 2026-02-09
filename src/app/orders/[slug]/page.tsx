import { orderService } from '@/services/orderService';
import OrderDetail from '@/view/orders/detail';
import { FormatDate } from '@/view/orders/format';
import { ArrowLeft } from 'lucide-react';

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug: id } = await params;

	const order = await orderService.getById(id);

	return <OrderDetail order={order} />;
}
