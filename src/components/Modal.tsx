import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RNModal from 'react-native-modal';
import { Icons } from '@/assets/icons';
import { Color } from '@/themes';
import { Text } from './Text';
import { Spacer } from './Spacer';

type ModalProps = React.PropsWithChildren<{
  title?: string;
  visible?: boolean;
  onClose?: () => void;
}>;

const Modal = ({ title, visible = false, onClose, children }: ModalProps) => {
  return (
    <RNModal isVisible={visible} onBackdropPress={onClose} avoidKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size="medium" weight="semiBold">
            {title}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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

export { Modal };

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
