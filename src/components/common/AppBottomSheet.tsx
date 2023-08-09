import BottomSheet from '@gorhom/bottom-sheet/';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {};

const AppBottomSheet = forwardRef<BottomSheet, Props>(({}, ref) => {
  //const bottomSheetRef: RefObject<BottomSheet> = ref;

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View
      style={{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
      <BottomSheet
        ref={ref}
        index={1}
        enablePanDownToClose
        backdropComponent={() => {
          return (
            <Pressable
              style={{
                flex: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => {
                ref.current?.close();
              }}
            />
          );
        }}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={{flex: 1}}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
});

export default AppBottomSheet;

const styles = StyleSheet.create({});
