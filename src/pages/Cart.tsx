/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useGetCart from "../hooks/api/useGetCart";
import { Product } from "../types";
import useRemoveFromCart from "../hooks/api/useRemoveFromCart";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import useCreateOrder from "../hooks/api/useCreateOrder";
import useClearCart from "../hooks/api/useClearCart";
import useGetProfile from "../hooks/api/useGetProfile";
import { Link, useNavigate } from "react-router-dom";
import { CreateOrderData, OnApproveData } from "@paypal/paypal-js";

function Cart() {
  const { profile } = useGetProfile();
  const [{  isPending }] = usePayPalScriptReducer();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, isError, isLoading } = useGetCart();
  const { createOrderAsync } = useCreateOrder();
  const { clearCartAsync } = useClearCart();
  const { removeProductFromCart, isPending: isLoadingRemove } =
    useRemoveFromCart();
    const navigate = useNavigate();
  // Calculate total price whenever cart items change
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
      const total = cart.reduce(
        (sum: number, item: Product) => sum + item.price,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  //paypal
  const onCreateOrder = (_data: CreateOrderData, actions: { order: any; }) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2), // Total amount
            currency_code: "USD", // Currency code
            breakdown: {
              item_total: {
                value: totalPrice.toFixed(2), // Sum of all item amounts
                currency_code: "USD",
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.name, // Item name
            unit_amount: {
              value: item.price.toFixed(2), // Price per unit
              currency_code: "USD",
            },
            quantity: 1,
          })),
          custom_id: cartItems.map((item) => item._id).join(","),
        },
      ],
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApproveOrder = (_data: OnApproveData, actions:any) => {
    return actions.order
      .capture()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((details: any) => {
        const name = details.payer.name.given_name;
        const orderDetails = {
          email: details.payer.email_address,
          items_IDs: details.purchase_units[0].custom_id,
          totalPrice: details.purchase_units[0].amount.value,
          shippingPrice: 0,
        };

        alert(`Transaction completed by ${name}`);
        //create order on backend
        createOrderAsync(orderDetails);
        navigate('/profile')
      })
      .then(() => {
        clearCartAsync();
        setCartItems([]);
        setTotalPrice(0);
        // navigate("/orders");
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  // Handle item removal
  const handleRemoveItem = async (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
    setTotalPrice((prevPrice) => {
      const item = cartItems.find((item) => item._id === itemId);
      return prevPrice - (item?.price || 0);
    });
    await removeProductFromCart(itemId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold text-red-500">
        Error loading cart. Please try again later.
      </div>
    );
  }

  return (
    <div className="cart grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
      <div className="cart__items-list flex flex-col justify-center items-center gap-5">
        <h1 className="cart__title text-3xl font-bold">Your Cart</h1>
        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="cart__item w-full h-80 flex flex-row shadow-md border-2 border-gray-200 rounded-lg p-4"
            >
              <div className="cart__item-image w-96 h-64">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="cart__item-details flex-1 pl-4">
                <h2 className="cart__item-name text-lg font-bold">
                  {item.name}
                </h2>
                <p className="cart__item-price text-lg font-medium">
                  ${item.price.toFixed(2)}
                </p>
                <p className="cart__item-description text-sm text-gray-600">
                  {item.description}
                </p>
                <p className="cart__item-brand text-sm font-medium text-gray-700">
                  {item.brand}
                </p>
                <button
                  className="cart__item-remove bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-3"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  {isLoadingRemove ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        )}
      </div>
      <div className="cart__total flex flex-col justify-center items-center gap-5 self-start mt-2">
        <h2 className="cart__total-title text-3xl font-bold">Total Price</h2>
        <p className="text-2xl font-medium">${totalPrice.toFixed(2)}</p>
        {isPending ? (
          <div>Loading...</div>
        ) : cartItems.length > 0 &&
          profile.address &&
          profile.country &&
          profile.city ? (
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "black",
              shape: "rect",
              height: 50,
            }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        ) : (
          <Link to="/profile ">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 px
            -4 rounded-lg"
            >
              Please complete your profile to proceed. Click here to update
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
