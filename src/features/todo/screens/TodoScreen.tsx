import React, { useCallback, useEffect, useState } from 'react';
import { Icons } from '@/assets/icons';
import { FloatingActionButton, useModal } from '@/components';
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
  const [selectedPageIndex, setSelectedPageIndex] =
    useState<number>(TODO_PAGE_INDEX);

  const modal = useModal();

  const allTodos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const getTodos = useTodoStore(state => state.getTodos);
  const resetCheckedTodos = useTodoStore(state => state.resetCheckedTodos);

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

  const handleChangeSelectedPageIndex = useCallback(
    (index: number) => {
      setSelectedPageIndex(index);
      resetCheckedTodos();
    },
    [resetCheckedTodos],
  );

  const handleCreateTodo = useCallback(
    (todo: Todo) => {
      addTodo(todo);
    },
    [addTodo],
  );

  const onPressFloatingActionButton = useCallback(() => {
    modal.present({
      title: 'Create todo',
      component: <TodoForm mode="create" onSubmit={handleCreateTodo} />,
    });
  }, [modal, handleCreateTodo]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <ScreenContainer
      title="Todo App 🎯"
      action={renderLogoutButton()}
      fab={
        selectedPageIndex === 0 && (
          <FloatingActionButton onPress={onPressFloatingActionButton}>
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
                allowCompleteTask
                title="Todo Tasks"
                todos={todoTasks}
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
    </ScreenContainer>
  );
};

export default TodoScreen;
