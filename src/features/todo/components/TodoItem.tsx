import React, { useCallback } from 'react';
import { Icons } from '@/assets/icons';
import { Menu, Spacer, Text } from '@/components';
import { Todo } from '@/entities';
import { useTodoStore } from '@/store';
import { Color } from '@/themes';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type TodoItemProps = {
  todo: Todo;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  onEdit: (item: Todo) => void;
};

const TodoItem = ({
  todo,
  checkable = false,
  checked = false,
  onCheck,
  onEdit,
}: TodoItemProps) => {
  const removeTodo = useTodoStore(state => state.removeTodo);

  const handleRemove = useCallback(() => {
    removeTodo(todo.id);
  }, [todo, removeTodo]);

  const handleEdit = useCallback(() => {
    onEdit(todo);
  }, [onEdit, todo]);

  const renderMoreButton = useCallback(() => {
    return (
      <View style={styles.moreButton}>
        <Icons.More width={24} height={24} color={Color.text.primary} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {checkable && (
        <BouncyCheckbox
          disableText
          useBuiltInState={false}
          isChecked={checked}
          size={20}
          fillColor={Color.primary}
          onPress={onCheck}
          style={styles.checkbox}
        />
      )}
      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text size="medium" weight="medium">
            {todo.title}
          </Text>
          {todo.description && (
            <Text type="secondary" size="small" weight="light">
              {todo.description}
            </Text>
          )}
        </View>
        <Spacer width={12} />
        <Menu
          items={[
            {
              key: 'edit_option',
              title: 'Edit',
              icon: (
                <Icons.Edit width={16} height={16} color={Color.text.primary} />
              ),
              danger: false,
              onPress: handleEdit,
            },
            {
              key: 'delete_option',
              title: 'Delete',
              icon: <Icons.Trash width={16} height={16} color={Color.danger} />,
              danger: true,
              onPress: handleRemove,
            },
          ]}>
          {renderMoreButton()}
        </Menu>
      </View>
    </View>
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
  removeButton: {
    backgroundColor: Color.dangerLight,
  },
  editButton: {
    backgroundColor: Color.infoLight,
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
