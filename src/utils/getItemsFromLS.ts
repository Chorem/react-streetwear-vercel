import { CartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getItemsFromLS = () => {
	const items = localStorage.getItem("cart");
	const json = items ? JSON.parse(items) : []
	const totalPrice = calcTotalPrice(json);

	return {
		json: json as CartItem[],
		totalPrice
	}
}