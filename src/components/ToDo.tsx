import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";


function ToDo({ text, category, id }: IToDo) {
  
  const setToDos = useSetRecoilState(toDoState);
  //const onClick = (newCategory:IToDo["category"]) => {};
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id); //findIndex 자바스크립트 내 함수 findIndex(함수작성)
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
    console.log(event);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        // <button onClick={() => onClick("DOING")}>Doing</button>//인자가 넘어가지 않기 때문에 이렇게 진행
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>삭제</button>
    </li>
  );
}

export default ToDo;
