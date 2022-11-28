import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = (props) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={()=>props.navigation.goBack()} />
    <Appbar.Content title={props.titulo} />
  </Appbar.Header>
);

export default Header;