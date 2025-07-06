import { useLocation } from "react-router";
import HeadingMemo from "../Components/Heading";
import LogoName from "../Components/LogoName";
import SubHeading from "../Components/SubHeading";
import InputBox from "../Components/InputBox";
import PrimaryButton from "../Components/PrimaryButton";

export default function SendMoney() {
    const location = useLocation().state;

    return (
        <>
            <div className="text-center">
                <HeadingMemo label={"Send Money"}/>
            </div>
            <div className="mt-6"></div>

            <div className="flex flex-col gap-y-4">
                <LogoName firstName={location.firstName} lastName={location.lastName} customStyles="bg-green-400"/>
                <div className="">{"Amount in $"}</div>
                <InputBox/>
                <PrimaryButton label={"Intiate Transfers"}/>
            </div>
        </>
    )
}