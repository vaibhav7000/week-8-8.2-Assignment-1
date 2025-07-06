import { Outlet } from "react-router"

export default function AuthWrapper() {

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-blue-300">
            <div className="flex flex-col px-6 py-4 items-stretch shadow-xl bg-white rounded-xl">
                <Outlet/>
            </div>
        </div>

    )
}