import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import Amplify from "aws-amplify";
import config from "../aws-exports";
import { useRouter } from "next/router";
import HomeHeader from "../components/layouts/HomeHeader";

Amplify.configure(config);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      {!router.pathname.includes("blog") && <HomeHeader />}
      <Component {...pageProps} />
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
