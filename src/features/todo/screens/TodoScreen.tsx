import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icons } from '@/assets/icons';
import { FloatingActionButton, Modal } from '@/components';
import { Todo } from '@/entities';
import { ScreenContainer, SegmentedPage } from '@/layouts';
import { useAuthStore, useTodoStore } from '@/store';
import { Color } from '@/themes';
import {
  TodoList,
  TodoEmpty,
  TodoForm,
  CompletedTaskEmpty,
} from '../components';
import { TouchableOpacity } from 'react-native';

const TODO_PAGE_INDEX = 0;

const TodoScreen = () => {
  const [showCreateTodoModal, setShowCreateTodoModal] =
    useState<boolean>(false);
  const [showUpdateTodoModal, setShowUpdateTodoModal] =
    useState<boolean>(false);
  const [selectedPageIndex, setSelectedPageIndex] =
    useState<number>(TODO_PAGE_INDEX);

  // Temporary todo object ref to hold data for update form
  const updatingTodoRef = useRef<Todo>(undefined);

  const {
    todos: allTodos,
    addTodo,
    updateTodo,
    getTodos,
  } = useTodoStore(state => state);

  const todoTasks = allTodos.filter(todo => !todo.completed);
  const completedTasks = allTodos.filter(todo => todo.completed);

  const logout = useAuthStore(state => state.logout);

  const renderLogoutButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={logout}>
        <Icons.Logout width={24} height={24} color={Color.primary} />
      </TouchableOpacity>
    );
  }, [logout]);

  const handleChangeSelectedPageIndex = useCallback((index: number) => {
    setSelectedPageIndex(index);
  }, []);

  const handleShowCreateTodoForm = useCallback(() => {
    setShowCreateTodoModal(true);
  }, []);

  const handleSubmitCreateTodo = useCallback(
    (todo: Todo) => {
      addTodo(todo);
    },
    [addTodo],
  );

  const handleSubmitUpdateTodo = useCallback(
    (todo: Todo) => {
      updateTodo(todo);
      updatingTodoRef.current = undefined;
    },
    [updateTodo],
  );

  const handleEditTodo = useCallback((todo: Todo) => {
    updatingTodoRef.current = todo;
    setShowUpdateTodoModal(true);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <ScreenContainer
      title="Welcome ✨"
      action={renderLogoutButton()}
      fab={
        selectedPageIndex === 0 && (
          <FloatingActionButton onPress={handleShowCreateTodoForm}>
            <Icons.Plus color={Color.surface} width={24} height={24} />
          </FloatingActionButton>
        )
      }>
      <SegmentedPage
        selectedIndex={selectedPageIndex}
        onChange={handleChangeSelectedPageIndex}
        items={[
          {
            title: 'Todo',
            render: () => (
              <TodoList
                title="Todo Tasks"
                todos={todoTasks}
                onEditTodo={handleEditTodo}
                emptyComponent={<TodoEmpty />}
              />
            ),
          },
          {
            title: 'Completed',
            render: () => (
              <TodoList
                title="Completed Tasks"
                todos={completedTasks}
                onEditTodo={handleEditTodo}
                emptyComponent={
                  <CompletedTaskEmpty
                    onActionPress={() => setSelectedPageIndex(TODO_PAGE_INDEX)}
                  />
                }
              />
            ),
          },
        ]}
      />
      <Modal
        visible={showCreateTodoModal}
        onClose={() => setShowCreateTodoModal(false)}
        title="Create todo">
        <TodoForm mode="create" onSubmit={handleSubmitCreateTodo} />
      </Modal>
      <Modal
        visible={showUpdateTodoModal}
        onClose={() => setShowUpdateTodoModal(false)}
        title="Update todo">
        <TodoForm
          mode="update"
          todo={updatingTodoRef.current}
          onClose={() => setShowUpdateTodoModal(false)}
          onSubmit={handleSubmitUpdateTodo}
        />
      </Modal>
    </ScreenContainer>
  );
};

export default TodoScreen;
