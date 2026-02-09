import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  if (!items.length) return <p>Your cart is empty 🛒</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="flex justify-between items-center border p-4 rounded"
        >
          <div>
            <h3 className="font-semibold">{product.title}</h3>
            <p>${product.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(product.id)}
              className="px-2 border"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => increaseQty(product.id)}
              className="px-2 border"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}