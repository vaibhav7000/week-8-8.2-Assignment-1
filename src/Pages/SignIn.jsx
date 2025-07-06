import { useEffect, useCallback, useRef } from "react";
import AuthWrapper from "../Components/AuthWrapper";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputBox from "../Components/InputBox";
import PrimaryButton from "../Components/PrimaryButton";
import NaviagteText from "../Components/NavigateText";



export default function SignIn() {

    useEffect(function() {
        inputReference[0].ref.current.focus();
    }, []);
    
    const inputReference = [{
        label: "Username",
        id: "email",
        type: "email",
        ref: useRef(),
        placeHolder: "vchawla7000@gmail.com"
    }, {
        label: "Password",
        id: "password",
        type: "password",
        ref: useRef(),
        placeHolder: ""
    }]

    const buttonAction = useCallback(async function() {
    
    }, []);

    return (
        <>
            <div className="flex flex-col gap-y-1 mb-4 items-center">
                <Heading label={"SignIn"}/>
                <SubHeading label={"Enter you information to access your account"} />
            </div>

            <div className="flex flex-col gap-y-4">
                {inputReference.map((input, index) => <InputBox key={index} label={input.label} placeHolder={input.placeHolder} type={input.type} id={input.id} ref={input.ref}/>)}
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
                <PrimaryButton label={"SignUp"} action={buttonAction}/>
                <NaviagteText label={"Don't have the account?"} to={"signup"} navigateText={"SignUp"}/>
            </div>
        </>
    )
}