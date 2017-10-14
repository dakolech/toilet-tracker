import * as React from 'react';
import './layout.css';

import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { FooterComponent } from '../footer/footer.component';

export function LayoutComponent() {
  return (
    <div>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </div>
  );
}
