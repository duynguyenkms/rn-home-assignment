import React, { useCallback, useRef, useState } from 'react';
import uuid from 'react-native-uuid';
import { TextInput as RNTextInput } from 'react-native';
import { Todo } from '@/entities';
import { Button, Spacer, TextInput } from '@/components';

type TodoFormMode = 'create' | 'update';

type TodoFormProps = {
  mode?: TodoFormMode;
  todo?: Todo;
  onSubmit: (todo: Todo) => void;
  onClose?: () => void;
};

const TodoForm = ({
  mode = 'create',
  todo,
  onClose,
  onSubmit,
}: TodoFormProps) => {
  const [title, setTitle] = useState<string>(todo?.title ?? '');
  const [description, setDescription] = useState<string>(
    todo?.description ?? '',
  );

  const titleRef = useRef<RNTextInput>(null);
  const descriptionRef = useRef<RNTextInput>(null);

  const isFormValid = title.length > 0;

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleSubmit = useCallback(() => {
    let id;
    let completed;
    if (mode === 'create') {
      id = uuid.v4();
      completed = false;
    } else {
      id = todo?.id ?? '';
      completed = todo?.completed ?? false;
    }

    onSubmit({ id, title, description, completed });

    if (mode === 'create') {
      setTitle('');
      setDescription('');
      titleRef.current?.focus();
    } else {
      onClose?.();
    }
  }, [onClose, mode, todo, title, description, onSubmit]);

  return (
    <>
      <TextInput
        label="Title"
        placeholder="Enter title..."
        autoFocus
        ref={titleRef}
        value={title}
        onChangeText={handleTitleChange}
        onSubmitEditing={() => {
          descriptionRef.current?.focus();
        }}
      />
      <Spacer height={12} />
      <TextInput
        ref={descriptionRef}
        label="Description (optional)"
        placeholder="Enter description..."
        value={description}
        onChangeText={handleDescriptionChange}
        onSubmitEditing={() => {
          if (isFormValid) {
            handleSubmit();
          }
        }}
      />
      <Spacer height={20} />
      <Button
        title="Confirm"
        fullWidth
        onPress={handleSubmit}
        enabled={isFormValid}
      />
    </>
  );
};

export { TodoForm };
