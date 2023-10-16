import {colors, typography} from '../theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  keyboardAwoidStyle: {
    flex: 1,
    backgroundColor: colors.palette.primary,
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
  hourContainer: {
    flexDirection: 'row',
  },
  hourMinute: {
    flex: 1,
    paddingRight: 10,
  },
  hourMinStyle: {
    flex: 1,
    paddingLeft: 10,
  },
  cardsContainer: {
    //marginHorizontal: 20,
    marginTop: 10,
    zIndex: 100,
  },
  adminMarginBotton: {marginBottom: 100},
  adminSearch: {backgroundColor: '#eeeeee'},
  dashedLineMargin: {marginVertical: 10},
  volunteerTitle: {
    ...typography.medium(12),
    marginBottom: -15,
  },
  hourMinContainer: {marginRight: 5, flex: 1},
});
