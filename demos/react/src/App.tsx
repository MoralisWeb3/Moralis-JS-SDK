import { Nfts } from './views/Nfts';
import { Route, Routes } from 'react-router-dom';
import { Spacer, VStack } from '@chakra-ui/react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './views/Home';
import Main from './layout/Main';
import d from 'moralis/common-auth-utils';

function App() {
  return (
    <VStack minHeight="100vh">
      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="nfts" element={<Nfts />} />
        </Routes>
      </Main>
      <Spacer />
      <Footer />
    </VStack>
  );
}

export default App;
