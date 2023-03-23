import styled from "styled-components";
import { ITodo } from "../types/todo";

const TodoItem = styled.li<{ isCompleted: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  /* box-shadow: 0px 10px 15px -2px #14213d21; */
  box-shadow: ${({ theme, isCompleted }) =>
    !isCompleted ? `0px 5px 15px -2px ${theme.color}4c` : "none"};
  color: ${({ theme }) => theme.pageBackgroundColor};
  background-color: ${({ theme, isCompleted }) =>
    `${theme.color}${isCompleted ? "4c" : ""}`};
  font-size: 1.1rem;
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? "line-through" : "unset"};
`;

type TodoCardProps = Pick<ITodo, "title" | "isCompleted"> & {
  toggleCompleted: () => void;
};

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  isCompleted,
  toggleCompleted,
}) => {
  return (
    <TodoItem
      tabIndex={0}
      onClick={toggleCompleted}
      isCompleted={!!isCompleted}
    >
      {title}
    </TodoItem>
  );
};

export default TodoCard;
