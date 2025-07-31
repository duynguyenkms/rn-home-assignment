import React, { useCallback, useMemo } from 'react';
import { Icons } from '@/assets/icons';
import {
  Menu,
  MenuItemWithKeyProps,
  Spacer,
  Text,
  useModal,
} from '@/components';
import { Todo } from '@/entities';
import { useTodoStore } from '@/store';
import { Color } from '@/themes';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TodoForm } from './TodoForm';
import { TodoDeleteConfirmation } from './TodoDeleteConfirmation';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const modal = useModal();
  const checkedTodoIds = useTodoStore(state => state.checkedTodoIds);
  const removeTodo = useTodoStore(state => state.removeTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const toggleCheckTodo = useTodoStore(state => state.toggleCheckTodo);

  const isChecked = checkedTodoIds.includes(todo.id);

  const textStyle: StyleProp<TextStyle> = {
    textDecorationLine: isChecked ? 'line-through' : 'none',
  };

  const onRemove = useCallback(() => {
    const modalId = modal.present({
      title: 'Delete Confirmation',
      component: (
        <TodoDeleteConfirmation
          onCancel={() => modal.dismiss(modalId)}
          onConfirm={() => {
            removeTodo(todo.id);
            modal.dismiss(modalId);
          }}
        />
      ),
    });
  }, [modal, removeTodo, todo.id]);

  const handleUpdate = useCallback(
    (newTodo: Todo) => {
      updateTodo(newTodo);
    },
    [updateTodo],
  );

  const onUpdate = useCallback(() => {
    const modalId = modal.present({
      title: 'Update todo',
      component: (
        <TodoForm
          mode="update"
          todo={todo}
          onClose={() => modal.dismiss(modalId)}
          onSubmit={handleUpdate}
        />
      ),
    });
  }, [handleUpdate, modal, todo]);

  const menuItems: MenuItemWithKeyProps[] = useMemo(() => {
    const items = [
      {
        key: 'delete_option',
        title: 'Delete',
        icon: <Icons.Trash width={16} height={16} color={Color.danger} />,
        danger: true,
        onPress: onRemove,
      },
    ];
    if (!todo.completed) {
      items.unshift({
        key: 'edit_option',
        title: 'Edit',
        icon: <Icons.Edit width={16} height={16} color={Color.text.primary} />,
        danger: false,
        onPress: onUpdate,
      });
    }
    return items;
  }, [onRemove, onUpdate, todo.completed]);

  const onCheck = useCallback(() => {
    toggleCheckTodo(todo.id);
  }, [todo.id, toggleCheckTodo]);

  const renderMoreButton = useCallback(() => {
    return (
      <View style={styles.moreButton}>
        <Icons.More width={24} height={24} color={Color.text.primary} />
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onCheck}
      disabled={todo.completed}>
      {!todo.completed && (
        <BouncyCheckbox
          disableText
          useBuiltInState={false}
          isChecked={isChecked}
          size={20}
          fillColor={Color.primary}
          onPress={onCheck}
          style={styles.checkbox}
        />
      )}
      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text size="medium" weight="medium" style={textStyle}>
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              type="secondary"
              size="small"
              weight="light"
              style={textStyle}>
              {todo.description}
            </Text>
          )}
        </View>
        <Spacer width={12} />
        <Menu items={menuItems}>{renderMoreButton()}</Menu>
      </View>
    </TouchableOpacity>
  );
};

export { TodoItem };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Color.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  textContainer: {
    flexShrink: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-start',
    padding: 8,
  },
  moreButton: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    padding: 2,
  },
  checkbox: {
    marginRight: 12,
  },
});
