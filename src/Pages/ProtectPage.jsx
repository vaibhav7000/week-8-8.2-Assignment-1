import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {ClipLoader} from "react-spinners"

import { backendBaseURL } from "../utils/constants";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ProtectedPage({children}) {
    // check token and verify from the backend -> if not present than divert the use to signin page
    const {isLoading, isValidToken} = useVerifyAuthToken();

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
            {children}
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
    useEffect(() => {

        async function verifyToken() {
            const token = localStorage.getItem("token");

            if(!token) {
                setIsLoading(false);
                return;
            }

            const response = await fetch(`${backendBaseURL}/api/v1/user/authenticate`, {
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

            setIsLoading(false);
            setIsValidToken(true);
        }

        verifyToken();
    }, []);


    return {isLoading, isValidToken};
}