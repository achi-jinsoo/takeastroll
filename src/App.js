import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import React, { useReducer, useRef, useEffect, useState } from 'react';
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const mockData = [
  { id: 'mock1', date: new Date().getTime()-1, content: 'mock1', emotionId: 1, },
  { id: 'mock2', date: new Date().getTime()-2, content: 'mock2', emotionId: 2, },
  { id: 'mock3', date: new Date().getTime()-3, content: 'mock3', emotionId: 3, },
]

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item
      );
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((item) => String(item.id) !== String(action.targetId));
      localStorage.setItem('diary', JSON.stringify(newState));
      return newState;
    }
    default: return state;
  }
}

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  useEffect(() => {
    let rawData = localStorage.getItem('diary');
    if(!rawData){
      localStorage.setItem('diary', JSON.stringify(mockData));
      setIsDataLoaded(true);
    }
    rawData = localStorage.getItem('diary');
    const loacalData = JSON.parse(rawData);
    if(loacalData.length == 0){
      setIsDataLoaded(true);
      return;
    }
    loacalData.sort((a,b)=>Number(b.id)-Number(a.id));
    idRef.current =loacalData[0].id+1;
    dispatch({type:'INIT',data:loacalData});
    setIsDataLoaded(true);
  }, [])
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    });
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    });
  }
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  }
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete
          }}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }

}

export default App;
