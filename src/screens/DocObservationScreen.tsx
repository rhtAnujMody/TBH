import {Observer} from 'mobx-react-lite';
import BottomSheet from '@gorhom/bottom-sheet/';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContainer, AppTextInput} from '../components';
import AppBottomSheet from '../components/common/AppBottomSheet';
import {AppBottomSheetDropdown} from '../components/common/AppBottomSheetDropdown';
import AppInput from '../components/common/AppInput';
import Header from '../components/common/Header';
import {colors, typography} from '../theme';
import {useRoute} from '@react-navigation/native';
import {DoctorScreenRouteProp} from '../navigation/DoctorStack';
import DoctorRow from '../components/DoctorRow';
import {AppSVGs} from '../assets';
import useDoctorStore from '../stores/useDoctorStore';
type Props = {};

const DocObservationScreen = ({}: Props) => {
  const route = useRoute<DoctorScreenRouteProp>();
  const {id} = route.params;
  const doctorStore = useDoctorStore();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const hideBottomSheet = () => {
    doctorStore.toggleBottomSheet();
  };
  const handleBottomSheetClick = (from: string) => {
    doctorStore.toggleBottomSheet(from);
  };
  const data = [
    {
      name: 'Head',
      data: [
        {name: 'Sparse or brittle hair', id: '1'},
        {name: 'Fontanelles are tense / bulging / open', id: '2'},
      ],
    },
    {
      name: 'Eyes',
      data: [
        {name: 'Signs of hemorrhagic spots', id: '1'},
        {name: 'Night blindness', id: '2'},
        {name: 'Corneal ulcers or scars', id: '3'},
        {name: "Build up of keratin (Bitot's Spots)", id: '4'},
        {name: 'Dry eyes', id: '5'},
      ],
    },
    {
      name: 'Mouth',
      data: [
        {name: 'Cavities', id: '1'},
        {name: 'Ulcers', id: '2'},
        {name: 'Lips are discoloured / cracked / inflamed', id: '3'},
        {name: 'Bleeding gums', id: '4'},
        {
          name: 'Cracks at the corner of the mouth (Angular Cheilitus)',
          id: '5',
        },
        {name: 'Tongue appears discloured (pallor)', id: '6'},
      ],
    },
    {
      name: 'Skin',
      data: [
        {name: 'Dry, peeling skin', id: '1'},
        {name: 'Hyperpigmentation', id: '2'},
        {name: 'Slow healing of wounds', id: '3'},
        {name: 'Dermatitis', id: '4'},
      ],
    },
    {
      name: 'Nails',
      data: [
        {name: 'Discloured (pallor)', id: '1'},
        {name: 'Broken or brittle', id: '2'},
        {name: 'Ridged or fissures present', id: '3'},
        {name: 'Spoon-shaped dent (Koilonychia)', id: '4'},
        {name: 'Abnormally flat and large (Platynychia)', id: '5'},
      ],
    },
    {
      name: 'Body',
      data: [
        {name: 'Bow legs', id: '1'},
        {name: 'Protuberant abdomen with thin limbs', id: '2'},
        {name: 'Oedema in both feet', id: '3'},
      ],
    },
  ];
  return (
    <Observer>
      {() => (
        <>
          <AppContainer>
            <Header title={'Health Camp'} />
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding'})}
              style={{flex: 1, backgroundColor: colors.palette.primary}}>
              <View style={styles.backgroundStyle}>
                <ScrollView
                  contentContainerStyle={styles.contentContainerStyle}>
                  <TouchableOpacity activeOpacity={1}>
                    <View style={styles.container}>
                      <Text style={styles.headingText}>
                        Calculated Field Values
                      </Text>

                      {data.map((item, index) => {
                        return (
                          <DoctorRow
                            data={item.data}
                            textHeader={item.name}
                            parentStyle={{marginBottom: 10}}
                            key={index.toString()}
                          />
                        );
                      })}

                      <AppInput
                        onPress={() => {
                          handleBottomSheetClick('hospital');
                        }}
                        parentStyle={styles.textInputStyle}
                        value={doctorStore.hospital}
                        textHeader="Referred to Hospital/ Medical Care"
                        placeHolder="Referred to Hospital/ Medical Care"
                        rightIcon={AppSVGs.dropdown}
                      />
                      {doctorStore.hospital === 'Yes' && (
                        <AppTextInput
                          value={doctorStore.action}
                          parentStyle={styles.textInputStyle}
                          textHeader="Action Suggested"
                          placeHolder="Action Suggested"
                          onChangeText={doctorStore.setAction}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </AppContainer>
          <AppBottomSheet
            isVisible={doctorStore.openBottomSheet}
            onClose={hideBottomSheet}
            index={doctorStore.index}
            ref={bottomSheetRef}>
            <AppBottomSheetDropdown
              header={doctorStore.bottomSheetHeader}
              data={doctorStore.bottomSheetArray}
              onClose={() => {
                bottomSheetRef?.current?.close();
                doctorStore.toggleBottomSheet();
              }}
              onItemSelect={doctorStore.setValue}
              onPress={doctorStore.toggleBottomSheet}
              setValue={() => {}}
            />
          </AppBottomSheet>
        </>
      )}
    </Observer>
  );
};

export default DocObservationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //backgroundColor: '#FCFCFC',
  },
  containerWidth: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonStyle: {
    marginBottom: 10,
  },
  dovInputStyle: {
    backgroundColor: '#F7F7F7',
    borderColor: colors.gray,
    borderWidth: 1,
    paddingRight: 30,
    borderRadius: 25,
  },
  photoContainerStyle: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 16,
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  headingText: {
    ...typography.bold(16),
    marginBottom: 20,
  },
});
