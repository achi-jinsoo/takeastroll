import Button from "../component/Button";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import { useContext,useEffect } from "react";
import {DiaryDispatchContext} from "../App";
import { setPageTitle } from "../utill";

const New = () => {
    useEffect(()=>{
        setPageTitle('산책 log 쌓기');
    },[]);
    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const onSubmit = (data) =>{
        const {date,content,emotionId} = data;
        onCreate(date,content,emotionId);
        navigate('/',{replace:true});
    }
    return (
        <div>
            <Header
                title={"산책 log 쌓기"}
                leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    );
}
export default New;