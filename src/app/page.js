"use client";
import axios from "axios";
// import { RxSpeakerOff } from "react-icons/rx";
import { useState } from "react";
// import { RxSpeakerLoud } from "react-icons/rx";
import { BeatLoader } from "react-spinners";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speak, setSpeak] = useState(false);
  const getData = async (prompt) => {
    setMessage((prevMessage) => {
      const newMessage = [...prevMessage, prompt];
      return newMessage;
    });
    setPrompt("");
    setLoading(true);
    const res = await axios.post("/api/generateAnswer", { prompt });
    const data = await res.data;
    console.log(data);
    setLoading(false);
    setMessage((preMessages) => {
      const newMessages = [...preMessages, data.message];
      console.log(newMessages);
      return newMessages;
    });
  };
  return (
    <div className="flex flex-col justify-evenly items-center h-screen">
      {/* heading */}
      <h1 className="text-2xl font-bold -m-16 bg-gradient-to-r from-purple-500 to-purple-300 text-transparent bg-clip-text">
        Welcome to AI Chat Assistant
      </h1>
      {/* main chat window */}
      <div className=" w-[90vw] sm:[60vw] h-[63vh] -mt-20 text-center text-white font-bold rounded-lg flex flex-col gap-2 justify-start py-5 items-center bg-gradient-to-b from-gray-900 to-transparent px-3 overflow-y-scroll overflow-x-hidden ">
        {/* <span>{
          speak ? ():()
        }
        </span> */}

        {}
        {message.length === 0 ? (
          <span className="text-center mx-auto text-3xl my-auto">
            No message To Show
          </span>
        ) : (
          message.map((data, id) => {
            return (
              <p
                key={id}
                className={`px-2 py-1 font-semibold ${
                  id % 2 === 0
                    ? "ml-auto bg-purple-500 text-white"
                    : "mr-auto bg-white text-black"
                }  `}
              >
                {data}
              </p>
            );
          })
        )}
        {loading && (
          <BeatLoader
            color="black"
            className="px-2 py-1 mr-auto bg-white text-xs"
          ></BeatLoader>
        )}
        <div className="flex w-[80vw] sm:w-[60vw] fixed bottom-16 left-0 right-0 justify-between items-center mx-auto bg-gray-900 rounded-lg">
          <input
            type="text"
            placeholder="Search here"
            className="px-5 py-3 rounded-lg outline-none text-purple-300 bg-gray-900 w-full "
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></input>
          <button
            className="absolute bg-purple-500 right-0 px-5 py-3 rounded-tr-lg rounded-bl-lg"
            onClick={() => {
              getData(prompt);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
