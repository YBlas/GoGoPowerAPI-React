import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './containers/Layout';
import Logo from './components/Logo';
import Options from './containers/Options';
import Formulario from './components/Formulario';
import Morphin from './components/Morphin';

const App: FC = () => {
  return (
    <Layout>
      <Logo/>
      <Options>
        <Formulario/>
        <Morphin/>
      </Options>
    </Layout>

  )
}

export default App;
