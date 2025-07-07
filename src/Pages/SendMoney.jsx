import { useLocation, useNavigate } from "react-router";
import { useRef } from "react";

import HeadingMemo from "../Components/Heading";
import LogoName from "../Components/LogoName";
import InputBox from "../Components/InputBox";
import PrimaryButton from "../Components/PrimaryButton";
import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../store/userAtom";
import { toast } from "react-toastify";
import { backendBaseURL } from "../utils/constants";


export default function SendMoney() {
    const location = useLocation().state;
    const inputRef = useRef();
    const [userDetails, setUserDetails] = useAtom(userAtom);
    const navigate = useNavigate();

    const keyDownAction = useCallback(function(event) {
        const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "ArrowLeft", "ArrowRight"];
        if(!allowedKeys.includes(event.key)){
            event.preventDefault();
            return
        }
    }, []);

    const intiateFundsAction = useCallback(async function() {
        const value = inputRef.current.value;
        const funds = parseInt(value);

        if(!funds) {
            toast("Enter Valid amount");
            return
        }

        if(userDetails.balance < funds) {
            toast("You does not these funds");
            return
        }


        const recieverId = location.userId;
        const senderId = userDetails.userId;

        // making the api call
        try {
            const response = await fetch(`${backendBaseURL}/api/v1/account/transfer`, {
                method: "POST",
                headers: {
                    "Authorization": userDetails.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: funds,
                    sendTo: recieverId
                })
            })

            const output = await response.json();
            
            if(response.status === 200) {
                toast(output.msg);
                setUserDetails({
                    ...userDetails, balance: userDetails.balance - funds
                })
                navigate("/");
                return
            }
            toast(output.msg);
        } catch (error) {
            
        }

    }, []);

    return (
        <>
            <div className="text-center">
                <HeadingMemo label={"Send Money"}/>
            </div>
            <div className="mt-6"></div>

            <div className="flex flex-col gap-y-4">
                <LogoName firstName={location.firstName} lastName={location.lastName} customStyles="bg-green-400"/>
                <div className="">{"Amount in $"}</div>
                <InputBox ref={inputRef} placeHolder={"Enter money"} type={"number"} customStyles="[&::-webkit-inner-spin-button]:appearance-none" keyDown={keyDownAction}/>
                <PrimaryButton label={"Intiate Transfers"} action={intiateFundsAction}/>
            </div>
        </>
    )
}