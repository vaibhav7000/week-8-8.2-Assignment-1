import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import {ClipLoader} from "react-spinners"
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { backendBaseURL } from "../utils/constants";
import AppBar from "../Components/AppBar";
import { userAtom } from "../store/userAtom";
import { ToastContainer } from "react-toastify";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ProtectedPage() {
    // check token and verify from the backend -> if not present than divert the use to signin page
    const {isLoading, isValidToken} = useVerifyAuthToken();
    const userDetails = useAtomValue(userAtom);
    const navigate = useNavigate();

    useEffect(function() {
        if(!isValidToken && !isLoading) {
            navigate("signup", {
                replace: true
            })
        }
    }, [isLoading]);


    if(isLoading) {
        return (
            <div className="h-[100vh] w-[100vw] items-center justify-center">
                <Loader isLoading={isLoading}/>
            </div>
        )
    }

    if(!isValidToken) {
        return null; // rendering nothing on screen
        // this is illegal in react because we are shifting to other componenent / page before completing the render of the main componenent in which we are present (all these to be present inside the useEffect hook);
        // navigate("/signup", {
        //     replace: true
        // });
        // return
    }

    return (
        <>
            <AppBar firstName={userDetails.firstName} lastName={userDetails.lastName} headline={"Payment Application"}/>
            <Outlet/>
            <ToastContainer/>
        </>
    )


}

function Loader({isLoading}) {
    return (
        <ClipLoader
            color={'#fb2c36'}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}


function useVerifyAuthToken() {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const setUserAtom = useSetAtom(userAtom);
    useEffect(() => {

        async function verifyToken() {
            const token = localStorage.getItem("token");

            if(!token) {
                setIsLoading(false);
                return;
            }

            // nodejs when sending the request to the backend server make lowercase to keys
            const response = await fetch(`${backendBaseURL}/api/v1/user/userdetails`, {
                method: "POST",
                headers: {
                    "Authorization": token
                }
            })

            const output = await response.json();

            if(response.status !== 200) {
                setIsLoading(false);
                setIsValidToken(false);
                return
            }

            setUserAtom({
                userId: output.userId,
                firstName: output.firstName,
                lastName: output.lastName,
                balance: output.balance,
                token
            })

            setIsLoading(false);
            setIsValidToken(true);
        }

        verifyToken();
    }, []);


    return {isLoading, isValidToken};
}