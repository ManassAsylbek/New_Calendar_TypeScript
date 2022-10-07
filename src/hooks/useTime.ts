interface timeProps {
    (time: string | undefined): {
        startTime: string;
        endTime: string
    }
}

export const useTime: timeProps = (time) => {
    let startTime = "09:00"
    if (time)
        startTime = time;
    let endTime = startTime === "18:00" ? "18:00" : `${+startTime.split(':')[0] + 1}:00`

    return {startTime, endTime}
}