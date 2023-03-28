import styled from "styled-components";
import { Anchor } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { todosService } from "services/appwrite";
import { addLocalTodo, deleteLocalTodo } from "store/features/todosSlice";

export const INPUT_HEIGHT = "45px";
const Form = styled.form`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 18px;
  position: relative;
  width: 100%;
  max-width: 600px;
  height: ${INPUT_HEIGHT};
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  font-size: 18px;
  border: ${({ theme }) =>
    theme.id === "light"
      ? `1px solid ${theme.color}`
      : "1px solid transparent"};
`;

const Input = styled.input`
  border: none;
  outline: none;
  &:placeholder-shown {
    text-overflow: ellipsis;
  }
`;

const Submit = styled.button`
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 18px;
    height: auto;
  }
`;

const TaskInput: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo) {
      const $id = uuidv4();
      dispatch(
        addLocalTodo({
          $id,
          countryCode: "",
          title: newTodo,
        })
      );
      try {
        await todosService.createTodo({ $id, title: newTodo });
      } catch (error) {
        // TODO: Show error toast
        dispatch(deleteLocalTodo($id));
      } finally {
        setNewTodo("");
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Input
        type="text"
        placeholder={`What are you crushing today ${user?.name ?? ""} ?`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        enterKeyHint="search"
        spellCheck="false"
        maxLength={280}
        value={newTodo}
        onChange={(e) => setNewTodo(e.currentTarget.value)}
      />
      <Submit>
        <Anchor />
      </Submit>
    </Form>
  );
};

export default TaskInput;
