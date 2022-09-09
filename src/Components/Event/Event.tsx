import React from 'react';
import style from './Event.module.css'

const Event = () => {
    return (
        <div onClick={()=> {}} className={style.Event}>
            {
               /* eventDate.map((item,i) => <div className={style.item}
                                               onMouseEnter={(e) => handleWheel(e, item)}
                                               onMouseOut={()=> {}}>
                        <div style={{background: item.marker}} className={style.marker}
                             onMouseEnter={(e) => handleWheel(e, item)}
                             onMouseOut={()=> props.setInfoActive(false)}></div>
                        <div className={style.EventItem}
                             onClick={() => getEventValue(item)}
                             onMouseEnter={(e) => handleWheel(e, item)}
                             onMouseOut={()=> props.setInfoActive(false)}>{item.title}<div>
                            {item.startTime}
                        </div></div>
                    </div>
                )*/
            }
        </div>


    );
};

export default Event;