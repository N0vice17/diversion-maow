import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Footer, NavBar, StepNavigator } from './components';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai';

console.log(process.env.APP_ID)
console.log(process.env.CONTRACT_ID)

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.APP_ID}
    >
      <NavBar />
      <div className="bg-gray-100 flex flex-col items-center h-screen w-screen">
        <div className="relative flex flex-col gap-8 m-5 max-w-xl w-full">
          <StepNavigator />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
