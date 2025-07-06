export default function LogoName({firstName, lastName, customStyles}) {

    return (
        <div className="flex flex-row gap-x-4 items-center">
            <div className={`rounded-full cursor-pointer bg-gray-300 p-2 text-black text-sm font-medium flex items-center justify-center uppercase hover:${customStyles} transition-all duration-200 `}>
                {`${firstName[0]}${lastName[0]}`}
            </div>

            <div className="text-md text-black capitalize">
                {`${firstName} ${lastName}`}
            </div>
        </div>
    )
}