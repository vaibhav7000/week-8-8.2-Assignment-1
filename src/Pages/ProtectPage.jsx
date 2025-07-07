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
    const {isLoading, isValidToken, error} = useVerifyAuthToken();
    const userDetails = useAtomValue(userAtom);
    const navigate = useNavigate();

    useEffect(function() {
        if(error) {
            return
        }

        if(!isValidToken && !isLoading) {
            navigate("signup", {
                replace: true
            })
        }
    }, [isLoading]);

    if(error) {
        return (<div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <ErrorState/>
        </div>)
    }

    if(isLoading) {
        return (
            <div className="h-[100vh] w-[100vw] flex items-center justify-center">
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
        <div className="h-[100vh] overflow-y-scroll w-[100vw] overflow-x-hidden">
            <AppBar firstName={userDetails.firstName} lastName={userDetails.lastName} headline={"Payment Application"}/>
            <Outlet/>
            <ToastContainer/>
        </div>
    )


}

function Loader({isLoading}) {
    return (
        <ClipLoader
            color={'#fb2c36'}
            loading={isLoading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

function ErrorState() {

    return (
        <div className="text-2xl text-black">
            Servers are down! Try again after some time 😔
        </div>
    )
}


function useVerifyAuthToken() {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const setUserAtom = useSetAtom(userAtom);
    const [error, setErrorOccured] = useState(false);
    useEffect(() => {

        async function verifyToken() {
            const token = localStorage.getItem("token");

            if(!token) {
                setIsLoading(false);
                return;
            }

            try {
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
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setErrorOccured(true);
            }
        }

        verifyToken();
    }, []);


    return {isLoading, isValidToken, error};
}