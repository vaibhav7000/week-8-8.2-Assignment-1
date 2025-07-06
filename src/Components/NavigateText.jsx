import { Link } from "react-router";

export default function NaviagteText({label, navigateText, to}) {
    return (
        <div className="flex flex-row gap-x-2 items-center justify-center">
            <div className="text-md text-gray-500 font-normal">
                {label}
            </div>

            <div>
                <Link className="text-blue-600 text-md font-semibold underline" to={`/${to}`} replace>
                    {navigateText}
                </Link>
            </div>
        </div>
    )
}