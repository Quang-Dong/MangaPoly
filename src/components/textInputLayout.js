import React from 'react';
import {StyleSheet} from 'react-native';

import {Neomorph} from 'react-native-neomorph-shadows';

const TextInputLayout = (props) => {
  return (
    <Neomorph
      inner
      swapShadows // <- change zIndex of each shadow color
      style={styles.container(props)}>
      {props.children}
    </Neomorph>
  );
};

export default TextInputLayout;

const styles = StyleSheet.create({
  container: (props) => ({
    shadowRadius: 7,
    borderRadius: 10,
    backgroundColor: '#E3F1FA',
    width: 250,
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: props.type ? 'flex-start' : 'center',
    flexDirection: props.type ? 'row' : 'column',
    alignItems: props.type ? 'center' : 'flex-start',
  }),
});
