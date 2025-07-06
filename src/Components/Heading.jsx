import { memo } from "react"

function Heading({label}) {

    return (
        <div className="text-2xl font-semibold text-black">
            {label}
        </div>
    )
}

const HeadingMemo = memo(function({label}) {

    return (
        <div className="text-2xl font-semibold text-black">
            {label}
        </div>
    )
})

export default HeadingMemo;