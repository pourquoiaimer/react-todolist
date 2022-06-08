import { useState, useEffect, useRef, useContext } from 'react'
import { writeData, AllData, getData, updataState } from '../js/main'

const Content = () => {
    const { isLogin, userInfo } = useContext(AllData)
    const [todoList, setTodoList] = useState(null)
    const inputContent = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (isLogin) {
            getData("asdff", setTodoList)
        }
    }, [isLogin])

    function changeStateLocal(event: any, changeState?: number) {
        let key = event.target.dataset.key;
        let oriData = { ...todoList }
        if (changeState === 0) {
            oriData[key].state = (event.target.checked ? 1 : 0)
        } else {
            delete oriData.key;
        }
        setTodoList(oriData)
    }



    function Todos() {
        if (todoList == null) {
            return null
        }
        let shows: any = [];
        for (const key in todoList) {
            let data = todoList[key]
            // console.log(data);

            let putData = (
                <tr className={(data.state == 1) ? "todos over" : "todos"} data-key={key}>
                    <td>
                        <input className='stateCheck' defaultChecked={data.state == 1} type="checkbox" onClick={(event) => { changeStateLocal(event, 0); updataState(event, 0, setTodoList) }} data-key={key} />
                        {data.state == 0 ? "未完成" : "已完成"}</td>
                    <td>{data.words}</td>
                    <td>{data.date}</td>
                    <td><span className='delete_btn' onClick={(event) => { if (confirm("確定要刪除嗎？")){ changeStateLocal(event, 1); updataState(event, 1, setTodoList) } }} data-key={key}>X</span></td>
                </tr >
            )
// return putData
shows.push(putData)
        }

return (
    shows
)
    }

return (
    (isLogin && todoList !== "") ? (<div id="content">
        <h1 className='title'>用 React 搭配 Firebase 製作的 TodoList (有使用typescript)</h1>
        <div className='input_area'>
            <textarea ref={inputContent} placeholder={"請輸入待辦內容，上限為100字"} maxLength={100} onKeyDown={(e)=>{if(e.key === "Enter"){e.preventDefault();writeData(inputContent.current, isLogin, setTodoList)}}}></textarea>
            <div className='btn' onClick={() => {
                writeData(inputContent.current, isLogin, setTodoList)
            }}>
                <span>新增待辦</span>
            </div>
        </div>
        <div className='show_area'>
            <table>
                <thead>
                    <tr>
                        <th className='todo_state'>狀態</th>
                        <th className='todo_content'>待辦內容</th>
                        <th className='todo_date'>日期</th>
                        <th className="todo_delete"></th>
                    </tr>
                </thead>
                <tbody>
                    <Todos />
                </tbody>
            </table>
        </div>
    </div>) : null

)

}
export default Content