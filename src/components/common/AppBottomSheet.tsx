import BottomSheet from '@gorhom/bottom-sheet/';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  isVisible: boolean;
  index: number;
};

const AppBottomSheet = forwardRef<BottomSheet, Props>(
  ({children, isVisible = false, onClose, index}, ref) => {
    const snapPoints = useMemo(() => ['25%', '28%', '50%', '75%'], []);

    // callbacks
    const handleSheetChanges = useCallback(() => {}, []);
    if (!isVisible) {
      return null;
    }

    const backdropComponent = () => {
      return (
        <Pressable
          style={styles.backdropStyle}
          onPress={() => {
            ref.current?.close();
          }}
        />
      );
    };

    return (
      <View style={styles.containerStyle}>
        <BottomSheet
          ref={ref}
          onClose={onClose}
          index={index}
          enablePanDownToClose
          backdropComponent={backdropComponent}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          {children}
        </BottomSheet>
      </View>
    );
  },
);

export default AppBottomSheet;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backdropStyle: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'gray',
    opacity: 0.7,
    elevation: 5,
  },
});
