import React from 'react';

import {SafeAreaView} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = (props) => {
  return (
    <SafeAreaView>
      <Menu opened={props.opened} onBackdropPress={props.onBackdropPress}>
        <MenuTrigger>{props.children}</MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: 'transparent',
              elevation: 0,
            },
            optionsWrapper: {
              left: 150,
              borderRadius: 10,
              backgroundColor: 'white',
              elevation: 10,
            },
            optionWrapper: {
              height: 50,
              justifyContent: 'center',
            },
          }}>
          <MenuOption onSelect={() => alert(`Save`)} text="Sửa" />
        </MenuOptions>
      </Menu>
    </SafeAreaView>
  );
};

export default PopupMenu;
