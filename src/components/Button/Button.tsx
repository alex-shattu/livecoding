import {
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, { useCallback } from 'react';
import colors from '../../constants/colors';
import { sizes } from '../../constants';

type ButtonAppearance = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onClick: () => void;
  appearance?: ButtonAppearance;
};

export default function Button({
  label,
  onClick,
  appearance = 'primary',
}: ButtonProps) {
  const handlePress = useCallback(() => {
    onClick();
  }, [onClick]);

  const stylesByAppearance = React.useMemo((): {
    container: ViewStyle;
    text: TextStyle;
  } => {
    switch (appearance) {
      case 'primary':
        return {
          container: { backgroundColor: colors.primary },
          text: { color: colors.primaryButtonText },
        };
      case 'secondary':
        return {
          container: { backgroundColor: colors.secondary },
          text: {
            color: colors.secondaryButtonText,
          },
        };
      default:
        return {
          container: { backgroundColor: colors.primary },
          text: {
            color: colors.secondaryButtonText,
          },
        };
    }
  }, [appearance]);

  return (
    <Pressable
      style={[styles.container, stylesByAppearance.container]}
      onPress={handlePress}>
      <Text style={[styles.label, stylesByAppearance.text]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: sizes.controlsHeight,
    paddingHorizontal: 8,
    borderRadius: sizes.borderRadius,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {},
});
