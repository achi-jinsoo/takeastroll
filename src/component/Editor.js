import { useState , useEffect ,useCallback} from "react";
import { getFormattedDate ,emotionList} from "../utill";
import "./Editor.css";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor =({initData, onSubmit})=>{

    const navigate = useNavigate();
    const handleIOnGoBack = ()=>{
        navigate(-1);
    }
    const [state,setState] = useState({
        emotionId :3,
        content :'',
        date :getFormattedDate(new Date()),
    })
    const handleChaneDate = (e) =>{
        setState({
            ...state,
            date : e.target.value,
        })
    }
    const handleChangeContent = (e)=>{
        setState({
            ...state,
            content :e.target.value,
        })
    }
    const handleSubmit = ()=>{
        onSubmit(state);
    }
    const handleChangeEmotion = useCallback((emotionId)=>{
        setState((state)=>({
            ...state,
            emotionId,
        }));
    },[]);
    useEffect(()=>{
        if(initData) {   
            setState({
                ...initData,
                date:getFormattedDate(new Date(parseInt(initData.date))),
            });  
        }
    },[initData]);

    return (
        <div className="Editor">
            <div className="editor_section">
                {/* 날짜 */}
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date}
                    onChange={handleChaneDate} />
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {
                        emotionList.map((item)=>(
                            <EmotionItem key={item.id} {...item} onClick={handleChangeEmotion} 
                            isSelected ={state.emotionId == item.id}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="editor_section">
                {/* 일기 */}
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea placeholder="오늘은 어땠나요?"
                    value={state.content} onChange={handleChangeContent}/>
                </div>
            </div>
            <div className="editor_section botton_section">
                <Button text={"취소하기"} onClick={handleIOnGoBack}/>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Editor;