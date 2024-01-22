import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Footer, NavBar, StepNavigator } from '.';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <NavBar />
      <div className="bg-gray-100 flex flex-col items-center h-screen">
        <div className="relative flex flex-col gap-8 m-5 max-w-xl">
          <StepNavigator step={1} />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
