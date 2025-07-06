export default function InputBox({label, placeHolder, type, id, ref, action}) {

    return (
        <div className="flex flex-col gap-y-4 items-stretch">
            {label && <label className="text-gray-500 text-sm font-medium self-start" htmlFor={id}>{label}</label>}
            <input className="border border-gray-200 bg-white p-2" ref={ref} placeholder={placeHolder} id={id} type={type} onInput={(event) => {
                if(action) {
                    action(event.target.value);
                }
            }} />
        </div>
    )
}