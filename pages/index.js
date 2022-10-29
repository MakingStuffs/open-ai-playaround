import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [humanInput, setHumanInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [humanMessages, setHumanMessages] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ human: humanInput }),
    });
    const data = await response.json();
    setResponses(responses.concat(data.result));
    setHumanMessages(humanMessages.concat(humanInput));
    setHumanInput("");
  }

  return (
    <div>
      <Head>
        <title>Offensive ChatBot</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h3>Talk to me, you dick</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="human"
              placeholder="Enter your response"
              value={humanInput}
              onChange={(e) => setHumanInput(e.target.value)}
            />
            <input type="submit" value="Generate reply" />
          </form>
        </header>
        <div className={styles.results}>
          <ul className={styles.resultsList}>
            {humanMessages.map((message, i) => (
              <li
                className={styles.result}
                key={Math.random().toString(36).substring(2, 9)}
              >
                <span>{`You: ${message}`}</span>
                <span>{responses[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
