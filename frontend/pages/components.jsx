
export function Card({ children, className }) {
  return (
    <div className={`${className} rounded flex bg-white border-gray-300 border p-12 gap-10 drop-shadow`}>{children}</div>
  )
}

export function Input({ className, label, type }) {
  return (
    <div className={className}>
      <p>{label} <a className="text-red-900">*</a></p>
      <input title="ankan" type={type} className="rounded w-full text-md p-2 border-red-700 border" />
    </div>
  )
}

export function StepNavigator({ step }) {
  const current_style_up = "rounded text-black font-bold flex border-blue-700 border-2 bg-white max-h-8 justify-center items-center max-w-8 p-1"
  const default_style_up = "flex border-gray-300  border-2 bg-gray-100 text-gray-400 max-h-8 justify-center items-center max-w-8 p-1"
  const current_style_down = "text-black"
  return (
    <div className="flex gap-10 text-gray-400">
      <div id="1">
        <div id="t" className={step === 1 ? current_style_up : default_style_up}>1</div>
        <div className={step === 1 ? current_style_down : ""}>Enter Details</div>
      </div>
      <div id="2">
        <div id="t" className={step === 2 ? current_style_up : default_style_up}>2</div>
        <div className={step === 2 ? current_style_down : ""}>Verification</div>
      </div>
      <div id="3">
        <div id="t" className={step === 3 ? current_style_up : default_style_up}>3</div>
        <div className={step === 3 ? current_style_down : ""}>Connect Wallet</div>
      </div>
      <div id="4">
        <div id="t" className={step === 4 ? current_style_up : default_style_up}>4</div>
        <div className={step === 4 ? current_style_down : ""}>Vote</div>
      </div>
    </div>
  )
}

export function NavBar() {
  return (
    <>
      <nav className="h-10 bg-white"></nav>
      <div className="h-5 bg-blue-700 shadow shadow-neutral-300"></div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="flex relative bg-blue-900 h-full w-full">
    </footer>
  )
}
