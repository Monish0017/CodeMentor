import { Platform } from 'react-native';

const fonts = {
  regular: Platform.select({
    ios: 'HelveticaNeue',
    android: 'Roboto',
  }),
  medium: Platform.select({
    ios: 'HelveticaNeue-Medium',
    android: 'Roboto-Medium',
  }),
  bold: Platform.select({
    ios: 'HelveticaNeue-Bold',
    android: 'Roboto-Bold',
  }),
  light: Platform.select({
    ios: 'HelveticaNeue-Light',
    android: 'Roboto-Light',
  }),
};

export default fonts;