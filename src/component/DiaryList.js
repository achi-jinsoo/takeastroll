import "./DiaryList.css";
import Button from "./Button";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
const sortOptionList =[
    {value:'latest',name:'최신순'},
    {value:'oldest',name:'오래된 순'},
]
const DiaryList =({data})=>{
    const[sortType,setSortType] = useState('latest');
    const onChangeSortType = (e) =>{
        setSortType(e.target.value);
    }
    const navigate =useNavigate();
    const onClickNew = () =>{
        navigate('/new');
    }
    const [sortedData,setSortedData] =useState([]);

    useEffect(()=>{
        const compare = (a,b) =>{
            if(sortType == 'latest'){
                return Number(b.date) -Number(a.date);
            }else{
                return Number(a.date) -Number(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    },[data,sortType]);
    return <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">
                <select value={sortType} onChange={onChangeSortType}>
                    {sortOptionList.map((item,i)=>(
                        <option key={i} value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="right_col">
                <Button type={"positive"} text={'새 일기 쓰기'} onClick={onClickNew}/>
            </div>
        </div>
        <div className="list_wrapper">
            {sortedData.map((item)=>(
                <DiaryItem key={item.id}{...item}/>
            ))}
        </div>
    </div>
}
export default DiaryList;