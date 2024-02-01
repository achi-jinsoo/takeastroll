import Header from "../component/Header";
import Button from "../component/Button";
import { useState, useContext ,useEffect} from "react";
import {DiaryStateContext} from "../App";
import{getMonthRamgeByDate,setPageTitle} from "../utill";
import DiaryList from "../component/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [privotDate,setPrivotDate] =useState(new Date());
    const [filteredData , setFilterdData] = useState([]);
    const onInMonth = ()=>{
        setPrivotDate(new Date(privotDate.getFullYear(),privotDate.getMonth()+1));
    }
    const onDeMonth = ()=>{
        setPrivotDate(new Date(privotDate.getFullYear(),privotDate.getMonth()-1));
    }
    const headerTitle = `
    ${privotDate.getFullYear()}년 ${privotDate.getMonth()+1}월
    `
    useEffect(()=>{
        if(data.length >=1){
            const {beginTimeStamp,endTimeStamp} = getMonthRamgeByDate(privotDate);
            setFilterdData(
                data.filter((item) =>beginTimeStamp <= item.date && item.date <= endTimeStamp)
            )
        }else{
            setFilterdData([])
        }

        setPageTitle('감정 일기장');
    },[data,privotDate])
    return (
    <div>
       <Header 
        title={headerTitle}
        leftChild={<Button text={'<'} onClick={onDeMonth}/>}
        rightChild={<Button text={'>'} onClick={onInMonth}/>}
       />
       <DiaryList data={filteredData}/>
    </div>
    );
}
export default Home;