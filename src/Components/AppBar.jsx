export default function AppBar({firstName, lastName, headline, userId}) {

    return (
        <div className="flex flex-row justify-between p-4 border border-gray-400">
            <div className="text-2xl font-bold text-black">
                {headline}
            </div>

            <div className="flex flex-row gap-x-2 items-center justify-center">
                <div className="text-md text-black capitalize">
                    Hello, {`${firstName} ${lastName}`}
                </div>

                <div className="rounded-full cursor-pointer bg-gray-300 p-2 text-black text-sm font-medium flex items-center justify-center uppercase">
                    {`${firstName[0]}${lastName[0]}`}
                </div>
            </div>
        </div>
    )
}