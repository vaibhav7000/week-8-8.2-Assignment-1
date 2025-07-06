import { useState, useRef, useCallback } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";

import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import User from "../Components/User";
import { userAtom } from "../store/userAtom";
import { backendBaseURL } from "../utils/constants";
import { toast } from "react-toastify";


export default function DashBoard() {
    const navigate = useNavigate();

    const userDetails = useAtomValue(userAtom);
    const [users, setUsers] = useState(null);
    
    const searchDebounce = useRef(null);
    const searchInput = useRef();

    const searchAction = useCallback(async function() {
        clearTimeout(searchDebounce.current);
        searchDebounce.current = setTimeout(async function() {
            const response = await fetch(`${backendBaseURL}/api/v1/user/bulk`, {
                method: "GET",
                headers: {
                    "Authorization": userDetails.token,
                }
            })
            const output = await response.json();

            if(response.status === 403) {
                // navigate to signin because token is not valid
                toast(output.msg);
                navigate("signin", {
                    replace: true
                })
                return
            }

            if(response.status === 500 || response.status === 404) {
                toast(output.msg);
                return
            }

            if(response.status === 200) {
                setUsers(output.users);
            }
        }, 1000);

    }, []);

    const sendMoneyAction = useCallback(function(firstName, lastName, userId) {

    })

    return (
        <div className="mt-6">

            <div className="flex flex-col gap-y-6 px-4">
                <Heading label={`Your Banlance: $${userDetails.balance}`}/>

                <div className="text-xl font-semibold text-black">
                    {"Users"}
                </div>

                <InputBox placeHolder={"Search User"} ref={searchInput} type={"text"} action={searchAction}/>

                {users && users.map(user => {
                    return (<User key={user._id} id={user._id} firstName={user.firstName} lastName={user.lastName} action={sendMoneyAction}/>)
                })}

                {users && users.length === 0 &&
                    <div className="text-black text-lg font-semibold">
                        No User Found!
                    </div>
                }
            </div>
        </div>
    )
}