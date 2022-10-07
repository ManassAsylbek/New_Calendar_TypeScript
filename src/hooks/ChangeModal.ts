import React, {useState} from "react";
import NewEvent from "../Components/newEvent/newEvent";
import Marker from "../Components/marker/Marker";

type TypeNewEvent = ReturnType <typeof NewEvent>|undefined
type TypeMarker = ReturnType <typeof Marker>|undefined

export const useChangeModal = () => {
    const [active,setActive] = useState(false)
    const [component,setComponent] = useState<any>()


    const setEvent = ()=> {
        setComponent(NewEvent)
    }
    const setEditEvent = ()=> {

    }
    const setMarker = ()=> {

        setComponent(Marker)
    }
    const setEditMarker = ()=> {

        setComponent(Marker)
    }


    return {active,setActive,component,setEvent,setEditEvent,setMarker,setEditMarker}


}