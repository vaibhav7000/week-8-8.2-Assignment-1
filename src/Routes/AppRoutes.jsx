import { Routes, Route } from "react-router"
import SignUp from "../Pages/SignUp"
import SignIn from "../Pages/SignIn"
import ProtectedPage from "../Pages/ProtectPage"
import DashBoard from "../Pages/DashBoard"
import SendMoney from "../Pages/SendMoney"
import AuthWrapper from "../Components/AuthWrapper"

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<AuthWrapper/>}>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Route>
            <Route path="" element={<ProtectedPage>
                <DashBoard/>
            </ProtectedPage>}/>
            <Route path="sendmoney" element={<ProtectedPage>
                <SendMoney/>
            </ProtectedPage>} />
        </Routes>
    )
}