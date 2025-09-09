import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/custom/Navbar";
import Footer from "./components/custom/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import CreateProducts from "./components/custom/CreateProducts";
import AllProducts from "./components/custom/AllProducts";
import Analytics from "./components/custom/Analytics";
import Orders from "./components/custom/Orders";
import Settings from "./components/custom/Settings";
import Categories from "./components/custom/Categories";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MyOrders from "./pages/MyOrders";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import Catalogue from "./pages/Catalogue";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ReturnPolicy from "./pages/ReturnPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Discounts from "./components/custom/Discounts";
import DiscountForm from "./pages/DiscountForm";
import DiscountProductSelection from "./pages/DiscountProductSelection";
import ProductList from "./components/custom/ProductList";
import SupportMessages from "./components/custom/SupportMessages";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Home />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Signup />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Login />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:productName",
      element: <RootLayout children={<Product />} />,
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Checkout />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <RootLayout children={<MyOrders />} />{" "}
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/login",
      element: (
        
          <RootLayout children={<AdminLogin />} />
        
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<CreateProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/all-products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<AllProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/product-list",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<ProductList />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/analytics",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Analytics />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/orders",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Orders />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/support",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<SupportMessages />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/settings",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Settings />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/categories",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Categories />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/discounts",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Discounts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/discounts/create",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<DiscountForm />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/discounts/edit",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<DiscountForm />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/discounts/create/products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<DiscountProductSelection />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/discounts/edit/products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<DiscountProductSelection />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/catalogue",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Catalogue />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/about",
      element: (
        <ProtectedRoute>
          <RootLayout children={<About />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/faq",
      element: (
        <ProtectedRoute>
          <RootLayout children={<FAQ />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/return-policy",
      element: (
        <ProtectedRoute>
          <RootLayout children={<ReturnPolicy />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <ProtectedRoute>
          <RootLayout children={<PrivacyPolicy />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/terms-conditions",
      element: (
        <ProtectedRoute>
          <RootLayout children={<TermsConditions />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/*",
      element: <Error />,
    },
    {
      path: "/success",
      element: <Success />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}
