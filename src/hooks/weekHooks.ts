import {useAppSelector} from "./redux";
import moment from "moment";

type objDType = {
    id:number;
    data:string;
    d:string
}

interface IDay {
    date: string
    d: string
    id:number
}
interface IWeekDate {():{wno: IDay[]; wd: string[]; day: string; day_date: string}
}
export const useWeekDate:IWeekDate = () => {
    const {date} = useAppSelector(state => state.dateSlice)

    const day = moment(date).format('dd')
    const day_date = moment(date).format('DD')

    let wno: IDay[] = [];
    let wd: string[] = []
    let d:moment.Moment;
    let objD: IDay = {d: '', date: '',id: 0}

    for (let i = 0; i < 7; i++) {
        d = moment(date).weekday(i)
        objD.id = i
        objD.date = moment(d).format("YYYY-MM-DD")
        objD.d = (moment(d).format('DD'))
        wno.push({...objD})
        wd.push(moment(d).format('dd'))
    }
    return {wno,wd,day,day_date}
}