import { useState, useCallback, useEffect, useRef } from "react";

function PasswordGen() {
  const [length, setLength] = useState(8);
  const [addLowerCase, setAddLowerCase] = useState(false)
  const [addNumb, setAddNumb] = useState(false);
  const [addSymb, setAddSymb] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let baseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(addLowerCase) baseString += "abcdefghijklmnopqrstuvwxyz"

    if (addNumb) baseString += "0123456789";

    if (addSymb) baseString += "!@#$%^&*_-+=:;<>?/\||~";

    for (let i = 0; i < length; i++) {
      let passCal = Math.floor(Math.random() * baseString.length + 1);

      pass += baseString.charAt(passCal);
    }

    setPassword(pass);
  }, [length, addNumb, addSymb, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, addNumb, addSymb]);

  const passwordRef = useRef(null);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="border bg-slate-600 border-none text-white rounded-2xl px-5 py-3 flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold">Password Generator</h1>
      </div>
      <div className="flex flex-row justify-between gap-8 mx-5 my-5">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className="border px-4 py-2 text-center"
        />
        <button
          onClick={copyPassword}
          className="border px-4 py-2 active:scale-95 rounded-2xl"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 my-5">
        <div>
          <input
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="mx-3"
            type="range"
          />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div>
          <input
            checked={addLowerCase}
            onChange={() => setAddLowerCase(!addLowerCase)}
            className="mx-3"
            type="checkBox"
          />
          <label htmlFor="">Add LowerCase</label>
        </div>
        <div>
          <input
            checked={addNumb}
            onChange={() => setAddNumb(!addNumb)}
            className="mx-3"
            type="checkBox"
          />
          <label htmlFor="">Add Numbers</label>
        </div>
        <div>
          <input
            onChange={() => setAddSymb(!addSymb)}
            className="mx-3"
            type="checkBox"
          />
          <label htmlFor="">Add Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGen;

