interface BotaoProps{
    label?: string
}

export default function BotaoSubmit(props:BotaoProps){
    return(
        <button className="bg-[#18181B] rounded-[16px] h-14 text-white">{props.label}</button>
    )
}