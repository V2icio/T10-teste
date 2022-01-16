import { extendTheme } from '@chakra-ui/react';

import styles from './styles';
import Input from './components/input';
import Button from './components/button';

const overrides = {
  styles,
  components: {
    Input,
    Button,
  },
};
export default extendTheme(overrides);
