import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import Amplify from "aws-amplify";
import config from "../aws-exports";
import { useRouter } from "next/router";

Amplify.configure(config);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
