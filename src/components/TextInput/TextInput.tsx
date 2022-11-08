import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import React from 'react';
import { colors, sizes } from '../../constants';

type TextInputProps = {
  value?: string;
  onChange?: (text: string) => void;
};

const TextInput = ({ value = '', onChange = () => {} }: TextInputProps) => {
  const handleChangeText = React.useCallback(
    (text: string) => {
      onChange(text);
    },
    [onChange],
  );

  return (
    <View style={styles.container}>
      <RNTextInput
        onChangeText={handleChangeText}
        value={value}
        style={styles.input}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    height: sizes.controlsHeight,
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 2,
    height: sizes.controlsHeight,
    borderRadius: sizes.borderRadius,
    paddingHorizontal: sizes.step * 2,
    color: colors.primaryText,
  },
});
