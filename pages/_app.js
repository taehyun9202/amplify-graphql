import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import Amplify from "aws-amplify";
import config from "../aws-exports";
import Header from "../components/layouts/Header";
Amplify.configure(config);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
