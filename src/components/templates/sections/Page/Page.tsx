import { Fragment } from 'react';
import ErrorBoundary from '@/components/organisms/error/ErrorBoundary';
import PageRouter from '@/routes/PageRouter';
import { ToastContainer, Flip } from 'react-toastify';
import BodyTransition from '@/components/atoms/BodyTransition';
import 'react-toastify/dist/ReactToastify.css';

import { createGlobalStyle } from 'styled-components';
import { themedPalette, themes } from '@/lib/styles/themes';

function Page() {
  return (
    <Fragment>
      <GlobalStyles />
      <BodyTransition />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
      <ErrorBoundary>
        <PageRouter />
      </ErrorBoundary>
    </Fragment>
  );
}

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${themedPalette.text1};
  box-sizing: border-box;

}

* {
  box-sizing: inherit;
}

code {
  font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input, button, textarea {
  font-family: inherit;
}

html, body, #root {
  height: 100%;
}

body {
  ${themes.light}
}

@media (prefers-color-scheme: dark) {
  body {
    ${themes.dark}
  }
}

body[data-theme='light'] {
  ${themes.light};
}

body[data-theme='dark'] {
  ${themes.dark};
}

`;


export default Page;
