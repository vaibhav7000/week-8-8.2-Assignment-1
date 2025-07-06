export default function PrimaryButton({action, label}) {

    return (
        <button className="bg-black p-2 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-green-400 self-stretch transition-colors duration-300" onClick={action}>
            {label}
        </button>
    )
}