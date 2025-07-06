import PrimaryButton from "./PrimaryButton";

export default function User({firstName, lastName, id, action}) {

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-x-4 items-center">
                <div className="rounded-full cursor-pointer bg-gray-300 p-2 text-black text-sm font-medium flex items-center justify-center">
                    {`${firstName[0]}${lastName[0]}`}
                </div>

                <div className="text-md text-black">
                    {`${firstName} ${lastName}`}
                </div>
            </div>

            <PrimaryButton label={"Send Money"} action={async () => {
                action(firstName, lastName, id)
            }}/>
        </div>
    )
}