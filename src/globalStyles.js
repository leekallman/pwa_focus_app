
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face{
    font-family: CabinetGrotesk-Light;
    url('./assets. CabinetGrotesk-Light.woff') format('woff'),
    url('./assets. CabinetGrotesk-Light.woff2') format('woff2'),
    url('./assets. CabinetGrotesk-Light.ttf') format('truetype');
}
* {
font-family: CabinetGrotesk-Light;
box-sizing: border-box;
margin:0;
padding:0;
color: #fff;
font-size:20px;
}

`

export default GlobalStyles;
