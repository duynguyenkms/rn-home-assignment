import React, { useCallback } from 'react';
import { Todo } from '@/entities';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TodoItem } from './TodoItem';
import { Spacer, Text } from '@/components';
import { Color } from '@/themes';
import { Icons } from '@/assets/icons';
import { useTodoStore } from '@/store';

type TodoListProps = {
  title: string;
  todos: Todo[];
  emptyComponent: React.ReactNode;
  allowCompleteTask?: boolean;
};

const TodoList = ({
  title,
  todos,
  allowCompleteTask = false,
  emptyComponent,
}: TodoListProps) => {
  const checkedTodoIds = useTodoStore(state => state.checkedTodoIds);
  const completeTodos = useTodoStore(state => state.completeTodos);

  const renderItem = useCallback((info: ListRenderItemInfo<Todo>) => {
    const item = info.item;
    return <TodoItem todo={item} />;
  }, []);

  const renderSeparator = useCallback(() => {
    return <Spacer height={8} />;
  }, []);

  return todos.length > 0 ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text weight="medium">
          {title} ({todos.length})
        </Text>
        {checkedTodoIds.length > 0 && allowCompleteTask && (
          <TouchableOpacity
            style={styles.markCompletedButtonContainer}
            onPress={completeTodos}>
            <Text style={styles.markCompletedButtonTitle} size="small">
              Complete tasks
            </Text>
            <Spacer width={8} />
            <Icons.Check
              width={12}
              height={12}
              color={Color.primary}
              strokeWidth={4}
            />
          </TouchableOpacity>
        )}
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  markCompletedButtonContainer: {
    backgroundColor: Color.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markCompletedButtonTitle: {
    color: Color.primary,
  },
});
