import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const cartService = {
	async get() {
		const response = await http.get<{ data: CartItem[] }>(routes.api.cart.all);
		return response.data;
	},

	async add(data: AddToCartRequest) {
		const response = await http.post<CartItem>(routes.api.cart.add, data);
		return response;
	},

	async sync(items: CartItem[]) {
		const backendItems = items.map((item) => ({
			product_id: item.productId,
			quantity: item.quantity,
			color: item.color,
		}));
		const response = await http.post<{ data: CartItem[] }>(routes.api.cart.sync, {
			items: backendItems,
		});
		return response.data;
	},

	async incrementItemQuantity(id: number, by: number) {
		const response = await http.patch<{ data: CartItem }>(
			routes.api.cart.incrementQuantity(id),
			{ by }
		);
		return response.data;
	},

	async decrementItemQuantity(id: number, by: number) {
		const response = await http.patch<{ data: CartItem }>(
			routes.api.cart.decrementQuantity(id),
			{ by }
		);
		return response.data;
	},

	async remove(id: number) {
		const response = await http.delete<{ message: string }>(
			routes.api.cart.remove(id)
		);
		return response;
	},

	async clear() {
		const response = await http.delete<{ message: string }>(
			routes.api.cart.clear
		);
		return response;
	},
};
