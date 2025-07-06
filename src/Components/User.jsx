import PrimaryButton from "./PrimaryButton";
import LogoName from "./LogoName";

export default function User({firstName, lastName, id, action}) {

    return (
        <div className="flex flex-row justify-between items-center">
            <LogoName firstName={firstName} lastName={lastName}/>

            <PrimaryButton label={"Send Money"} action={async () => {
                action(firstName, lastName, id)
            }}/>
        </div>
    )
}