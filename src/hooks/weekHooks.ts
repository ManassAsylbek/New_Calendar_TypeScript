import {useAppSelector} from "./redux";
import moment from "moment";

interface IDay {
    date: string
    d: string
}

export const useWeekDate = () => {
    const {date} = useAppSelector(state => state.dateSlice)

    let wno: any[] = [];
    let wd: string[] = []
    let d:moment.Moment;
    let objD: IDay = {d: '', date: ''}

    for (let i = 0; i < 7; i++) {

        d = moment(date).weekday(i)
        objD.date = moment(d).format()
        objD.d = (moment(d).format('DD'))
        wno.push({...objD})
        wd.push(moment(d).format('dd'))
    }
    return {wno,wd}
}