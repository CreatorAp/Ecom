import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllProducts from '../pages/AllProducts';
import  AllUsers  from '../pages/AllUsers';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';


const router = createBrowserRouter([
    {
            path: '/',
            element: <App/>,
            children: [
                {
                    path: "",
                    element: <Home></Home>
                },
                {
                    path: "Login",
                    element: <Login></Login>
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword></ForgotPassword>
                },
                {
                    path: "sign-up",
                    element: <SignUp></SignUp>
                },
                {
                    path: "admin-panel",
                    element: <AdminPanel></AdminPanel>,
                    children : [
                        {
                            path : "all-users",
                            element : <AllUsers/>
                        },
                        {
                            path : "all-products",
                            element : <AllProducts/>
                        }
                    ]
                },
                {
                    path: "all-user  all-user",
                    element: <AllUsers></AllUsers>
                },
                {
                    path: "product-category",
                    element: <CategoryProduct></CategoryProduct>
                },
                {
                    path: "product/:id",
                    element: <ProductDetails></ProductDetails>
                },
                {
                    path: "cart",
                    element: <Cart></Cart>
                },
                {
                    path: "search",
                    element: <SearchProduct></SearchProduct>
                },
                {
                    path: "success",
                    element: <Success></Success>
                },
                {
                    path: "cancel",
                    element: <Cancel></Cancel>
                },
                {
                    path: "order",
                    element: <OrderPage></OrderPage>
                },

         
            ]
    }
])



 export default router