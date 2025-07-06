import { useRef, useEffect } from "react";
import { signUpValidator } from "../utils/validators";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useAtom } from "jotai";

import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputBox from "../Components/InputBox";
import PrimaryButton from "../Components/PrimaryButton";
import { useCallback } from "react";
import NaviagteText from "../Components/NavigateText";
import { backendBaseURL } from "../utils/constants";



export default function SignUp() {
    const navigate = useNavigate();

    const inputReference = [{
            label: "FirstName",
            placeHolder: "Vaibhav",
            type: "text",
            id: "firstName",
            ref: useRef()
        }, {
            label: "LastName",
            placeHolder: "Chawla",
            type: "text",
            id: "lastName",
            ref: useRef()
        }, {
            label: "Username",
            placeHolder: "vchawla7000@gmail.com",
            type: "email",
            id: "userName",
            ref: useRef()
        }, {
            label: "Password",
            placeHolder: "",
            type: "password",
            id: "password",
            ref: useRef()
        }];

    const buttonAction = useCallback(async function() {
        const firstName = inputReference[0].ref.current.value;
        const lastName = inputReference[1].ref.current.value;
        const username = inputReference[2].ref.current.value;
        const password = inputReference[3].ref.current.value;
        console.log(password);

        const result = signUpValidator({
            firstName, lastName, username, password
        })

        if(!result.success) {
            const issues = result.error.issues;

            issues.forEach((issue) => {
                toast(`${issue["path"][0]}: ${issue["message"]}`);
            })

            return
        }

        try {
            // making the backend call
            const response = await fetch(`${backendBaseURL}/api/v1/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password, firstName, lastName
                })    
            })
            const output = await response.json();

            if(response.status !== 201) {
                toast(output.msg);
                return
            }

            // token store and navigate to the dashbord
            toast(output.msg); // signup successfull
            const token = output.token;
            localStorage.setItem("token", `Bearer ${token}`);

            navigate("/", {
                replace: true
            })

        } catch (error) {
            toast("Something up with the backend server. Try again later");
        }
    }, []);

    useEffect(function() {
        inputReference[0]["ref"].current.focus();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-y-1 mb-4 items-center">
                <Heading label={"SignUp"}/>
                <SubHeading label={"Enter you information to create account"} />
            </div>

            <div className="flex flex-col gap-y-4">
                {inputReference.map((input, index) => <InputBox key={index} label={input.label} placeHolder={input.placeHolder} type={input.type} id={input.id} ref={input.ref}/>)}
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
                <PrimaryButton label={"SignUp"} action={buttonAction}/>
                <NaviagteText label={"Already have a account?"} to={"signin"} navigateText={"Sigin"}/>
            </div>

            <ToastContainer/>
        </>
    )
}