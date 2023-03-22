import { MoralisType, mount } from './apiTests';

declare global {
  interface Window {
    Moralis: MoralisType;
  }
}

mount(window.Moralis);
