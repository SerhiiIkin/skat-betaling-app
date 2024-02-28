import { useMemo, useState,  } from "react";

function App() {
    const [beløb, setBeløb] = useState("");
    const [trækprocent, setTrækprocent] = useState("");
    const [message, setMessage] = useState(false);
    const beløbBetal = useMemo(() => {
        const sum =
            (+beløb - +beløb * 0.08) * (+trækprocent / 100) + +beløb * 0.08;
        return Math.ceil(sum);
    }, [beløb, trækprocent]);

    async function onCopyBtnClick() {
        try {
            await navigator.clipboard.writeText(beløbBetal.toString());
            setMessage((prev) => !prev);
            setTimeout(() => {
                setMessage((prev) => !prev);
            }, 2000);
        } catch (err) {
            console.error("Failed to copy number: ", err);
        }
    }
    return (
        <main className="grid place-content-center h-screen gap-2 px-2">
            <h2 className="text-3xl">Betale skat</h2>
            <input
                type="text"
                value={beløb}
                onChange={(event) => setBeløb(event.target.value)}
                className="p-2 mb-2 border rounded "
                placeholder="beløb"
            />
            <div>
                <input
                    type="text"
                    value={trækprocent}
                    onChange={(event) => setTrækprocent(event.target.value)}
                    className="p-2 border rounded mr-2"
                    placeholder="trækprocent"
                />
                %
            </div>
            <p>
                Trækprocent can jeg se på
                <a
                    className=" pl-2 text-blue-400"
                    href="https://www.tastselv.skat.dk/fskindb2/DigitalSkat/Indberetning.aspx?pow=Tr5%2bqHRRcUFa730cnBCAnGX%2fiRPWqpdo1NAV3rb1cr3sLmiVIxoK6HjoEHVDXEK4tLvhsSgANVKv2o4JIpWaC5%2buvU%2fYpzI3fQiJ%2bKUnWUY%3d"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    forskudsopgørelse
                </a>
            </p>
            <div className=" p-2 bg-blue-500">
                <a
                    href="https://info.skat.dk/dk/data.aspx?oid=restskat"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Betale here!
                </a>
            </div>

            <div className="text-red-700">
                Skal betale: {beløbBetal} kr.
                <button
                    onClick={onCopyBtnClick}
                    className="relative text-black pl-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                    </svg>

                    <span className="absolute right-[-55px] top-1/2 -translate-y-1/2">{message && "Copied"}</span>
                </button>
            </div>
        </main>
    );
}

export default App;
