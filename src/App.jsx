import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

 function App() {
  const [lenth, setLenth] = useState(8);
  const [number, setNumber] = useState(false);
  const [charcter, setCharecter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyTextonClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charcter) str += "!@#$%^&*+=?/.,";
    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [lenth, number, charcter, setPassword]);
  useEffect(() => {
    passgen();
  }, [lenth, number, charcter, setPassword]);
  return (
    <>
      <div className="bg-zinc-900 w-full h-screen flex justify-center ">
        <div className="bg-zinc-500 w-3/5 h-2/4 mt-12">
          <div className="text-3xl m-auto text-center mb-12 mt-4">
            Password Generetor
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
              className="outline-none p-2 rounded-l-lg shrink-0 bg-zinc-200 w-2/4  "
            />
            <button
              onClick={copyTextonClipboard}
              className="bg-zinc-400 rounded-r-lg "
            >
              Copy
            </button>
          </div>
          <div className="mt-5 flex justify-center">
            <input
              type="range"
              min={6}
              max={50}
              value={lenth}
              className="cursor-pointer"
              onChange={(e) => {
                setLenth(e.target.value);
              }}
            />
            <label htmlFor="">{lenth}</label>
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={(prev) => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="">Number</label>
            <input
              type="checkbox"
              defaultChecked={charcter}
              id="charecterInput"
              onChange={(prev) => {
                setCharecter((prev) => !prev);
              }}
            />
            <label htmlFor="">Special Charecter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
