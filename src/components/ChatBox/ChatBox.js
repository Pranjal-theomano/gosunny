import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import styles from "./ChatBox.module.scss";
import { Image, Row } from "react-bootstrap";
import sendIcon from "../../assets/sendButton.png";
import botIcon from "../../assets/logo.png";
import greenCloseIcon from "../../assets/greenClose.svg";
import { useUIContext } from "../../context/UiContext";
import autosize from "autosize";
const ChatBox = ({ exampleQuestions = [] }) => {
  const { isVisible = true, toggleVisibility = () => {} } = useUIContext() || {};

  const initialMessage = {
    text: "Hi, I'm Sunny. Our team built me based on their 50 years of experience helping homeowners like you get solar. Do you have any more questions about solar leases, our installation process, or anything else?",
    sender: "bot",
  };
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [defaultMessages, setDefaultMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const chatInputRef = useRef(null);
  const { userId } = useParams();
  const DEFAULT_MSGS = [
    "How do you design the system for my home?",
    "Why are leases the most popular financing option?",
    "How is your process different than other companies?",
  ];

  const convertGPTMarkdownToHTML = (gptResponse) => {
    return marked.parse(gptResponse);
  };

  const onDefaultMessageClick = (message) => {
    sendMessage(message);
  };

  const trackResponseInGA = (question, answer) => {
    // GA text limit is 100 characters so truncating the answer
    let summary = answer.substring(0, 100) + "...";

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "chat_response",
      user_id: userId,
      question_text: question,
      answer_text: summary,
    });
  };

  const sendMessage = async (text) => {
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        text,
        sender: "user",
      },
    ]);
    setDefaultMessages([]);
    setLoading(true);
    setInput("");

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/chat_sunny`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
          is_proposal_chat: false,
          userId: userId,
        }),
      }
    );

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistant_msg = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, {
        stream: true,
      });

      const jsonObjects = chunk.split("\n\n").filter(Boolean);

      jsonObjects.forEach((jsonObject) => {
        try {
          const jsonResponse = JSON.parse(jsonObject);
          console.log(jsonResponse);

          if (jsonResponse.last_token) {
            assistant_msg = jsonResponse.final_text;
            trackResponseInGA(text, jsonResponse.final_text);
          } else {
            assistant_msg += jsonResponse.data;
          }

          setLoading(false);
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.sender === "bot") {
              return [
                ...prev.slice(0, -1),
                {
                  text: assistant_msg,
                  sender: "bot",
                },
              ];
            }
            return [
              ...prev,
              {
                text: assistant_msg,
                sender: "bot",
              },
            ];
          });
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          // Skip to the next chunk
        }
      });
    }
  };

  const handleKeyPress = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.key === "Enter") {
      sendMessage(input);
      // empty the input textarea
      chatInputRef.current.value = "";
      autosize.update(chatInputRef.current);
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/chat_history/${userId}`
        );
        if (response.status === 200) {
          const data = await response.json();
          const chatHistory = data.chat_history.map((chat) => ({
            text: chat.content,
            sender: chat.role === "user" ? "user" : "bot",
          }));
          setMessages([initialMessage, ...chatHistory]);
          setDefaultMessages([]);
        } else {
          if (response.status === 404) {
            setDefaultMessages(DEFAULT_MSGS);
          }
          console.error("Failed to fetch chat history:", response.status);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    chatInputRef.current.focus();
    autosize(chatInputRef.current);
  }, []);

  return (
    <Row className={styles.chatParentDiv}>
      {" "}
      {isVisible && (
        <div onClick={toggleVisibility} className={styles["close-button"]}>
          <img src={greenCloseIcon} alt="" />
        </div>
      )}{" "}
      <div className="col-lg-12 col-md-12 bg-white">
        <div className={styles["chat-container"]}>
          <div className={styles["chat-box"]} ref={chatBoxRef}>
            {" "}
            {messages.map((msg, index) =>
              msg.sender === "bot" ? (
                <div
                  key={index}
                  className={`message ${styles.bot} d-flex align-items-start my-2`}
                >
                  <Image
                    src={botIcon}
                    width={"32px"}
                    height={"32px"}
                    className={styles.botIcon + " me-2"}
                  />{" "}
                  <div
                    className={styles.botMessagetext + " px-3 py-2"}
                    style={{ padding: '0px 10px' }}
                    dangerouslySetInnerHTML={{
                      __html: convertGPTMarkdownToHTML(msg.text),
                    }}
                  />{" "}
                </div>
              ) : (
                <div
                  key={index}
                  className={`message ${styles.user} d-flex align-items-start my-2 d-flex flex-row-reverse`}
                >
                  <div className={styles.userMessagetext + " px-3 py-2"}>
                    <p className={styles.userMessageTextPara + " mb-0"} style={{ padding: '0px 10px' }}>
                      {" "}
                      {msg.text}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>
              )
            )}
            {loading && (
              <div className={`message ${styles.bot} d-flex align-items-start`}>
                <Image
                  src={botIcon}
                  width={"32px"}
                  height={"32px"}
                  className={styles.botIcon + " me-2"}
                />{" "}
                <div className={styles.botMessagetext + " px-3 py-2 w-100"}>
                  <p className={styles.userMessageTextPara + " mb-0"} style={{ padding: '0px 10px' }}>
                    Thinking...{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            )}{" "}
          </div>{" "}
          {defaultMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${styles.user} d-flex align-items-start my-2 d-flex flex-row`}
            >
              <div
                className={
                  styles.userMessagetext + " px-3 py-2 mx-3 cursor-pointer"
                }
                style={{
                  cursor: "pointer",
                }}
                onClick={() => onDefaultMessageClick(message)}
              >
                <p className={styles.userMessageTextPara + " mb-0"} style={{ padding: '0px 10px' }}>
                  {" "}
                  {message}{" "}
                </p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
          <div className={styles["chat-input"] + " d-flex px-3 mx-3"}>
            <div className="d-flex w-100">
              <textarea
                ref={chatInputRef}
                type="text"
                id="chat-user-input"
                rows={1}
                className={styles["chat-input-box"] + " w-100"}
                style={{ width: '380px' }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about solar and this process"
                onKeyUp={handleKeyPress}
              />
            </div>{" "}
            <div>
              <img
                src={sendIcon}
                onClick={() => {
                  sendMessage(input);
                  chatInputRef.current.value = "";
                  setInput("");
                }}
                className={styles["send-button"]}
              ></img>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </Row>
  );
};

export default ChatBox;
