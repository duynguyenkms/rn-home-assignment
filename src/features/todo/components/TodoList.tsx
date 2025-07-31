import React, { useCallback } from 'react';
import { Todo } from '@/entities';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { TodoItem } from './TodoItem';
import { Spacer, Text } from '@/components';

type TodoListProps = {
  title: string;
  todos: Todo[];
  checkable?: boolean;
  emptyComponent: React.ReactNode;
  onEditTodo: (todo: Todo) => void;
};

const TodoList = ({
  title,
  todos,
  checkable = false,
  emptyComponent,
  onEditTodo,
}: TodoListProps) => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Todo>) => {
      const item = info.item;
      return <TodoItem checkable={checkable} todo={item} onEdit={onEditTodo} />;
    },
    [onEditTodo, checkable],
  );

  const renderSeparator = useCallback(() => {
    return <Spacer height={8} />;
  }, []);

  return todos.length > 0 ? (
    <View style={styles.container}>
      <Text weight="medium">
        {title} ({todos.length})
      </Text>
      <Spacer height={12} />
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  ) : (
    emptyComponent
  );
};

export { TodoList };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
