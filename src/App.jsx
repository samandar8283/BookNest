import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Import pages
import Home from "./pages/Home.jsx"
import BookDetail from "./pages/BookDetail.jsx"
import Cart from "./pages/Cart.jsx"
import Favorites from "./pages/Favorites.jsx"
import Books from "./pages/Books.jsx"
import Profile from "./pages/Profile.jsx"
import Checkout from "./pages/Checkout.jsx"
import Terms from "./pages/Terms.jsx"
import HowToBuy from "./pages/HowToBuy.jsx"
import ProfileSettings from "./components/profile/ProfileSettings.jsx"
import OrdersList from "./components/profile/OrdersList.jsx"
import OrderDetails from "./components/profile/OrderDetails.jsx"
import NotificationsList from "./components/profile/NotificationsList.jsx"
import NotificationDetails from "./components/profile/NotificationDetails.jsx"

// Import admin pages
import AddBook from "./pages/admin/AddBook.jsx"

// Import other pages
import NotFound from "./pages/NotFound.jsx"

// Import layouts
import AdminLayout from "./layouts/AdminLayout.jsx"
import MainLayout from "./layouts/MainLayout.jsx"

// Import contexts
import { AlertProvider } from "./contexts/AlertContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { FavoriteProvider } from "./contexts/FavoriteContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";

function App() {
    const location = useLocation();
    return (
        <AlertProvider>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />}>
                    <Route path="add-book" element={<AddBook />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/*" element={
                    <AuthProvider>
                        <CartProvider>
                            <FavoriteProvider>
                                <OrderProvider>
                                    <MainLayout />
                                </OrderProvider>
                            </FavoriteProvider>
                        </CartProvider>
                    </AuthProvider>
                }>
                    <Route index element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="cart/checkout" element={<Checkout />} />
                    <Route path="cart/checkout/:bookId" element={<Checkout />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="profile/*" element={<Profile />}>
                        <Route index element={<Navigate to="orders" replace />} />
                        <Route path="settings" element={<ProfileSettings />} />
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:orderId" element={<OrderDetails />} />
                        <Route path="notifications" element={<NotificationsList />} />
                        <Route path="notifications/:notificationId" element={<NotificationDetails />} />
                    </Route>
                    <Route path="books" element={<Books />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="how-to-buy" element={<HowToBuy />} />
                    <Route path="books/details/:bookId" element={<BookDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AlertProvider>
    )
}

export default App