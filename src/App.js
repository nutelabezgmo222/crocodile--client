import "./styles/main.scss";
import React from "react";
import { StartPage, GamePage, NotFoundPage } from "./pages";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  setRoomID,
  setRoomHostID,
  setGameStarted,
  setLetters,
  setRoundStarted,
  setGameModalData,
  discardGameData,
  setGameCounter,
  setTotalPlayers,
  setLeaderID,
  setMessages
} from "./store/actions/gameActions";
import {
  setUsername,
  setUserID,
  setConnection,
  setAvatar,
  setWordHint,
} from "./store/actions/userActions";
import { io } from "socket.io-client";
import { useLocalStorage, c, errMsg } from "./helpers";
import { WarningModal } from "./components";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const roomID = useSelector((state) => state.game.roomID);
  const [sessionID, setSessionID] = useLocalStorage("sessionID");
  const history = useHistory();
  const location = useLocation();
  const socket = React.useRef(io(c.SERVER_URL, { autoConnect: false }));

  const [modalData, setModalData] = React.useState({
    isSeen: false,
    title: "",
    body: "",
  });

  React.useEffect(() => {
    socket.current.on("newPlayer", (body) => {
      dispatch(setTotalPlayers(body.totalPlayers));
    })
    socket.current.on("room:kicked", () => {
      console.log("you was kicked from lobby");
      dispatch(setRoomID(""));
      dispatch(setUsers([]));
      history.push("/");
    });
    socket.current.on("room:userJoin", (users) => {
      dispatch(setUsers(users));
    });
    socket.current.on("room:userLeave", (users) => {
      dispatch(setUsers(users));
    });

    socket.current.on("game:newLetter", (letters) => {
      dispatch(setLetters(letters));
    });
    socket.current.on("game:start", ({users, leaderID}) => {
      dispatch(setUsers(users));
      dispatch(setLeaderID(leaderID));
      dispatch(setGameStarted(true));
    });
    socket.current.on("game:startNewRound", () => {
      dispatch(setRoundStarted(true));
      dispatch(discardGameData());
      dispatch(setGameCounter(180));
    });
    socket.current.on("game:endRound", (data) => {
      dispatch(setRoundStarted(false));
      dispatch(setUsers(data.users));
      dispatch(setLeaderID(data.leaderID));
      dispatch(setGameModalData(data, true));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!location.pathname.match(/\/game\/\w+/g) && roomID) {
      handleRoomLeave();
    }
  }, [location.pathname]);

  const handleRoomLeave = () => {
    socket.current.emit("room:leave");
    dispatch(discardGameData());
    dispatch(setUsers([]));
    dispatch(setMessages([]));
    dispatch(setRoundStarted(false));
    dispatch(setGameStarted(false));
  };

  const handlePlayerKick = (userID) => {
    socket.current.emit("room:kickPlayer", userID);
  };

  const handleWordChoose = (word) => {
    dispatch(setWordHint(word));
    socket.current.emit("game:wordChoose", word);
  };

  const socketGetConnection = (initialConnection = false, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      if ((initialConnection && sessionID) || user.username) {
        if (socket.current.connected) {
          resolve(true);
          return;
        }
        let timer;
        socket.current.auth = {
          avatarID: user.avatarID,
          username: user.username,
          sessionID,
        };

        socket.current.connect();

        function responseHandler(body) {
          const username = body.username;
          const userID = body.userID;
          const avatarID = body.avatarID;
          socket.current.auth = { sessionID: body.sessionID };
          socket.current.userID = body.userID;
          setSessionID(body.sessionID);
          dispatch(setUsername(username));
          dispatch(setUserID(userID));
          dispatch(setAvatar(avatarID));
          dispatch(setConnection(true));
          clearTimeout(timer);
          resolve(true);
        }
        function errorHandler(error) {
          clearTimeout(timer);
          reject(error);
        }

        socket.current.on("connect_error", errorHandler);
        socket.current.on("session", responseHandler);

        timer = setTimeout(() => {
          reject(new Error("timeout expired"));
          socket.current.removeListener("session", responseHandler);
          socket.current.removeListener("session", errorHandler);
        }, timeout);
      } else {
        reject(errMsg.voidUsername);
      }
    });
  };
  const handleLobbyLoading = ( roomID, setLoading, setRoomFound, setErrorMessage) => {
    socketGetConnection(true, 2000)
      .then((connected) => {
        socket.current.emit("room:join", { roomID },
          ({ response, users, isGameStarted, isRoundStarted, gameCounter, leaderID, messages }) => {
            setTimeout(() => {
              // loading imitation
              setLoading(false);
              if (response.status === "error") {
                setRoomFound(false);
                setErrorMessage(response.message);
              }
              if (response.status === "success") {
                setRoomFound(true);
                dispatch(setRoomHostID(response.hostID));
                dispatch(setRoomID(roomID));
                dispatch(setUsers(users));
                dispatch(setLeaderID(leaderID));
                dispatch(setGameStarted(isGameStarted));
                dispatch(setRoundStarted(isRoundStarted));
                dispatch(setMessages(messages));
                dispatch(setGameCounter(gameCounter));
              }
            }, 200);
          }
        );
      })
      .catch((msg) => {
        setLoading(false);
        if (msg.message === errMsg.voidUsername) {
          setRoomFound(false);
          setErrorMessage({
            title: "Ошибка",
            body: msg.message,
          }); // here we can show modal
        } else {
          setRoomFound(false);
          setErrorMessage({
            title: "Ошибка",
            body: "Сессия не найдена или имя пользователя не указано",
          });
        }
      });
  };
  const closeModal = () => {
    setModalData({
      ...modalData,
      isSeen: false,
    });
  };
  const handleStartGameClick = () => {
    socket.current.emit("game:start");
  };
  const handleJoinByCode = (code) => {
    history.push("/game/" + code);
  };
  const handleNewGameClick = () => {
    socketGetConnection()
      .then(() => {
        socket.current.emit("room:host", (url) => {
          history.push("/game/" + url);
        });
      })
      .catch((msg) => {
        if (msg === errMsg.voidUsername) {
          setModalData({
            isSeen: true,
            title: "Ошибка",
            body: msg,
          }); // here we can show modal
        }
      });
  };
  const handleFindGameClick = async (setLoading, setErrorMessage) => {
    socketGetConnection()
    .then(() => {
      setLoading(true);

      return new Promise((resolve, reject) => {
        socket.current.emit("game:findGame", (curUrl) => {
          resolve(curUrl)
        });
      })

    })
    .then((url) => {
      setLoading(false);
      if (url) {
        history.push("/game/" + url);
      } else {
        setErrorMessage({
          title: "Ошибка при поиске комнаты",
          body: "Открытых комнат не найдено. Попробуйте создать свою.",
        });
      }
    })
    .catch((msg) => {
      if (msg === errMsg.voidUsername) {
        setModalData({
          isSeen: true,
          title: "Ошибка",
          body: msg,
        }); // here we can show modal
      }
    });
  };
  
  return (
    <div className="app">
      {modalData.isSeen ? (
        <WarningModal title={modalData.title} body={modalData.body}>
          <button onClick={closeModal} className="button-medium-filled">
            Ладно
          </button>
        </WarningModal>
      ) : (
        ""
      )}
      <Switch>
        <Route path="/" exact>
          <StartPage
            socketGetConnection={socketGetConnection}
            onNewGameClick={handleNewGameClick}
            onFindGameClick={handleFindGameClick}
            onJoibByCodeClick={handleJoinByCode}
          />
        </Route>
        <Route path="/game/:roomID" exact>
          <GamePage
            socket={socket.current}
            onWordChoose={handleWordChoose}
            onStartGameClick={handleStartGameClick}
            onPlayerKick={handlePlayerKick}
            onLobbyLoading={handleLobbyLoading}
          />
        </Route>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
