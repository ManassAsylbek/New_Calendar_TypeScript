import {useAppSelector} from "./redux";
import {IEvent} from "../Intarface/IEvent";

interface IFilterEvent {
    (): {
        sent: IEvent[]
        incoming: IEvent[]
    }
}

export const useFilterEvent:IFilterEvent = () => {
    const {events} = useAppSelector(state => state.eventSlice)
    const {id} = useAppSelector(state => state.authSlice)
    let sent = [] as unknown as IEvent[]
    let incoming = []  as unknown as IEvent[]
    if(events){
        sent = events.filter(event=>event.author?.id ===id)
        incoming = events.filter(event=>event.author?.id !==id)
    }


    return {sent, incoming}
}