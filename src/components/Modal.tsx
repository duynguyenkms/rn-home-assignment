import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import RNModal from 'react-native-modal';
import { Icons } from '@/assets/icons';
import { Color } from '@/themes';
import { Text } from './Text';
import { Spacer } from './Spacer';
import { usePortal } from './Portal';

type ModalProps = React.PropsWithChildren<{
  id: string;
  title?: string;
}>;

type PresentOptions = {
  title?: string;
  component: React.ReactNode;
};

const Modal = ({ id, title, children }: ModalProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  const { dismiss } = useModal();

  const handleClose = useCallback(() => {
    setVisible(false);
    dismiss(id);
  }, [dismiss, id]);

  return (
    <RNModal
      isVisible={visible}
      onBackdropPress={handleClose}
      avoidKeyboard
      animationIn="fadeIn">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size="medium" weight="semiBold">
            {title}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <View>
              <Icons.Close width={20} height={20} color={Color.text.primary} />
            </View>
          </TouchableOpacity>
        </View>
        <Spacer height={12} />
        {children}
      </View>
    </RNModal>
  );
};

const useModal = () => {
  const portal = usePortal();

  const present = ({ title, component }: PresentOptions): string => {
    return portal.present(id => (
      <Modal id={id} title={title}>
        {component}
      </Modal>
    ));
  };

  return { present, dismiss: portal.dismiss };
};

export { Modal, useModal };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: Color.border,
    padding: 4,
    borderRadius: '100%',
    right: 0,
    top: 0,
  },
});
