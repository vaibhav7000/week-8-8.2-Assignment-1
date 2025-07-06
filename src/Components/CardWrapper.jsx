import { Outlet } from "react-router";

export default function CardWrapper() {

    return (
        <div className="flex justify-center items-center h-[100%] w-[100%] bg-blue-400">
            <div className="flex flex-col rounded-lg shadow-xl  w-[30%] px-10 py-10 bg-white">
                <Outlet/>
            </div>
        </div>

    )
}