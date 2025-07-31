import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Menu as RNMenu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Divider, Text } from '@/components';
import { Color } from '@/themes';

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  danger: boolean;
  onPress: () => void;
};

type MenuItemWithKeyProps = MenuItemProps & { key: string };

type MenuProps = React.PropsWithChildren<{
  items: MenuItemWithKeyProps[];
}>;

const Menu = ({ items, children }: MenuProps) => {
  return (
    <RNMenu>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}>
        {children}
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.container}>
        {items.map(({ key, ...props }) => (
          <React.Fragment key={key}>
            <MenuItem {...props} />
            <Divider direction="horizontal" />
          </React.Fragment>
        ))}
      </MenuOptions>
    </RNMenu>
  );
};

const MenuItem = ({ title, danger, icon, onPress }: MenuItemProps) => {
  return (
    <MenuOption
      onSelect={onPress}
      customStyles={{ OptionTouchableComponent: TouchableOpacity }}
      style={styles.menuItemContainer}>
      <View style={styles.menuItem}>
        {icon}
        <Text type={danger ? 'danger' : 'primary'}>{title}</Text>
      </View>
    </MenuOption>
  );
};

export { Menu, type MenuItemWithKeyProps };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.surface,
    borderRadius: 8,
  },
  menuItemContainer: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
