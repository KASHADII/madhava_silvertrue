import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import LinkButton from "./LinkButton";

const CartDrawer = ({ showLabel = false }) => {
  const { cartItems, totalQuantity, totalPrice, appliedDiscount, discountAmount, finalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <Drawer>
      <DrawerTrigger className="relative flex items-center gap-2">
        {totalQuantity > 0 && (
          <Badge className={`absolute px-1 py-0`}>{totalQuantity}</Badge>
        )}
        <ShoppingCart
          className="text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out cursor-pointer"
          strokeWidth={1.3}
          size={28}
        />
        {showLabel && (
          <span className="uppercase tracking-wide hidden sm:inline">Cart</span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>
            Total Items: {totalQuantity}
            {appliedDiscount ? (
              <div className="mt-2">
                <div className="text-sm">Subtotal: ₹{totalPrice}</div>
                <div className="text-sm text-green-600">Discount ({appliedDiscount.code}): -₹{discountAmount}</div>
                <div className="font-medium">Total: ₹{finalPrice}</div>
              </div>
            ) : (
              <div className="mt-2 font-medium">Total: ₹{totalPrice}</div>
            )}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col sm:flex-row justify-start gap-3 h-[70vh]overflow-y-scroll sm:overflow-y-hidden sm:h-auto mx-3">
          {cartItems.length === 0 ? (
            <h2 className="text-primary text-sm">
              Nothing To Show, Please add some products...
            </h2>
          ) : (
            cartItems.map((item) => <CartProduct key={item._id} {...item} />)
          )}
        </div>

        <DrawerFooter>
          <LinkButton to="/checkout" text="Checkout"/>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
