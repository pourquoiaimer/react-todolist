import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9ujQgg82LAZonPRvW_8moXBrxWb5vhNE",
  authDomain: "react-todolist-9dce1.firebaseapp.com",
  projectId: "react-todolist-9dce1",
  storageBucket: "react-todolist-9dce1.appspot.com",
  messagingSenderId: "1004812709148",
  appId: "1:1004812709148:web:2d0a6d9811bbb996405ed9",
  measurementId: "G-L9PX87SWT4",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
let userId = "asdff";

export function writeData(content: any, isLogin: boolean, setFn?: Function) {
  if (!isLogin) {
    alert("還沒登錄啊你");
    return;
  }

  let word = content.value;
  if (word.length == 0) {
    console.log("no word");
    return;
  }
  let newDate = new Date();
  let nowdate =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate();

  let timestamp = Date.now();
  let putTodo = {
    [timestamp]: {
      state: 0,
      words: content.value,
      date: nowdate,
    },
  };
  update(ref(db, "todoList/" + userId + "/"), putTodo);
  getData(userId, setFn);
  content.value = "";
}

export function updataState(event: any, changeState: number, setFn?: Function) { //changeState? 0=改狀態 : 1=刪除
  let key = event.target.dataset.key;
  let putChange: any;
  if (changeState === 0) {
    putChange = event.target.checked ? 1 : 0;
    let url = "todoList/" + userId + "/" + key + "/";
    update(ref(db, url), {
      state: putChange,
    });
  } else {
    let url = "todoList/" + userId + "/";
    update(ref(db, url), {
      [key]:null
    });
  }

  getData(userId, setFn);
}

export function getData(id: string, setFn?: Function) {
  get(child(ref(db), `todoList/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (setFn) {
          setFn(snapshot.val());
        }
      } else {
        setFn()
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

let defaultValue: any;
export const AllData = createContext(defaultValue);
