import Head from "next/head";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  let numbers = generateNumbers();
  let [currentTableIndex, setCurrentTableIndex] = useState(-1);
  let [results, setResults] = useState([]);
  const clickHandler = (includedInBox) => {
    results.push(includedInBox);
    setCurrentTableIndex(++currentTableIndex);
  };
  const restartHandler = () => {
    setResults([]);
    setCurrentTableIndex(-1);
  };

  return (
    <>
      <Head>
        <title>Magic 63</title>
      </Head>
      <div className="w-full flex justify-center content-center h-screen px-5">
        <div className="inline-flex flex-col justify-center">
          {currentTableIndex === -1 ? (
            <>
              <p className="text-lg text-center text-gray-700">
                請心中想一個數字 ( 0 ~ 63 )，然後按下「Start」
              </p>
              <button
                className="shadow m-5 transition ease-in-out duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-white p-2 m-2 bg-green-300 rounded hover:bg-green-500 cursor-pointer outline-none w-32 self-center"
                onClick={() => setCurrentTableIndex(0)}
              >
                Start
              </button>
            </>
          ) : results.length < numbers.length ? (
            <>
              <p className="text-lg text-center text-gray-700">
                請問你心想的數字有在下表中嗎？
              </p>
              <NumberTable numbers={numbers[currentTableIndex]} />
              <div className="self-center">
                <button
                  className="shadow transition ease-in-out duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-white p-2 m-2 bg-blue-300 rounded hover:bg-blue-500 cursor-pointer outline-none w-32"
                  onClick={() => clickHandler(true)}
                >
                  Yes
                </button>
                <button
                  className="shadow transition ease-in-out duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-white p-2 m-2 bg-red-300 rounded hover:bg-red-500 cursor-pointer outline-none w-32"
                  onClick={() => clickHandler(false)}
                >
                  No
                </button>
              </div>{" "}
            </>
          ) : (
            <>
              <p className="text-gray-700 text-5xl text-center p-3">
                你心裡的數字是{" "}
                {results
                  .map((included, idx) =>
                    included ? parseInt(min(numbers[idx])) : null
                  )
                  .reduce((a, b) => a + b)}{" "}
                ！
              </p>
              <button
                className="shadow transition ease-in-out duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-white p-2 m-2 bg-green-300 rounded hover:bg-green-500 cursor-pointer outline-none w-32 self-center"
                onClick={restartHandler}
              >
                Restart
              </button>
            </>
          )}
        </div>
        <footer className="fixed bottom-0 w-64 p-5">
          <hr />
          <div className="text-gray-500 mt-5 text-center">
            <a
              href="https://github.com/isaackwok/magic63"
              className="hover:text-green-500"
            >
              <FontAwesomeIcon icon={faGithub} /> by Isaac Kwok
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

function NumberTable(props) {
  let numbers = props.numbers;
  return (
    <table className="m-5 rounded bg-green-300 shadow">
      <tbody>
        {numbers.map((row) => (
          <tr key={row}>
            {row.map((num) => (
              <td
                key={num}
                className="p-3 border border-green-500 text-center hover:bg-green-500 hover:text-white m-3"
              >
                {num}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function generateNumbers() {
  let numbers = [[], [], [], [], [], []];
  let maxNum = 63;
  for (let n = 1; n <= maxNum; n++) {
    let binary = dec2bin(n).padStart(8, "0");
    for (let i = 0, j = 7; i < 8; i++, j--) {
      let digit = binary[j];
      if (digit == "1") numbers[i].push(n);
    }
  }
  return numbers.map((arr) => chunkArrayInGroups(shuffle(arr), 8));
}

function chunkArrayInGroups(arr, size) {
  var newArray = [];
  for (var i = 0; i < arr.length; i += size) {
    newArray.push(arr.slice(i, i + size));
  }
  return newArray;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function min(nums) {
  nums = nums.flat();
  let temp = nums[0];
  nums.forEach((n) => (n < temp ? (temp = n) : null));
  return temp;
}
