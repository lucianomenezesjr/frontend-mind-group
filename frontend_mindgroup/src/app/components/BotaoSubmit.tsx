interface BotaoProps{
    label?: string
}

export default function BotaoSubmit(props:BotaoProps){
    return(
        <button type="submit" className="bg-[#18181B] rounded-[16px] h-14 hover:bg-gray-800 text-white">{props.label}</button>
    )
}