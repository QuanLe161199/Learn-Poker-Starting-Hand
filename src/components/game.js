import { useEffect, useState } from "react";
const CARD_LENGTH = 13;
const HAND_SORT = [
    ["AA", 1],
    ["KK", 1],
    ["QQ", 2],
    ["JJ", 2],
    ["TT", 2],
    ["99", 2],
    ["88", 3],
    ["AKs", 3],
    ["77", 3],
    ["AQs", 3],
    ["AJs", 3],
    ["AKo", 3],
    ["ATs", 3],
    ["AQo", 3],
    ["AJo", 3],
    ["KQs", 3],
    ["66", 3],
    ["A9s", 3],
    ["KJs", 3],
    ["ATo", 3],
    ["A8s", 3],
    ["KTs", 3],
    ["KQo", 3],
    ["A7s", 3],
    ["A9o", 3],
    ["KJo", 3],
    ["55", 3],
    ["QJs", 3],
    ["K9s", 4],
    ["A5s", 4],
    ["A6s", 4],
    ["A8o", 4],
    ["KTo", 4],
];

const COLOR = ["white", "#12900d", "#bf7c18", "#e4d618", "#5e59e4"];

const RANDOM_RANGE = 33;

const Game = () => {
    const [table, setTable] = useState(null);
    const [index, setIndex] = useState(0);
    const [gameMode, setGameMode] = useState("seriated");
    const [randomHand, setRandomHand] = useState(null);
    const [exactlyChoose, setExactlyChoose] = useState([]);

    useEffect(() => {
        createTable();
    }, []);

    useEffect(() => {
        console.log(exactlyChoose);
        if (exactlyChoose.length !== RANDOM_RANGE) {
            while (true) {
                let random = Math.floor(Math.random() * RANDOM_RANGE + 1);
                let checkPoint = true;
                exactlyChoose.forEach((exactly) => {
                    if (exactly === random) checkPoint = false;
                });
                if (checkPoint) {
                    setRandomHand(random);
                    break;
                }
            }
        }
    }, [exactlyChoose]);

    const createTable = () => {
        const cards = [
            "A",
            "K",
            "Q",
            "J",
            "T",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2",
        ];

        let hands = [];
        for (let i = 0; i < CARD_LENGTH; i++) {
            let rowHands = [];
            for (let j = 0; j < CARD_LENGTH; j++) {
                if (i === j) {
                    rowHands.push([`${cards[i]}${cards[j]}`, 0]);
                } else if (i > j) {
                    rowHands.push([`${cards[j]}${cards[i]}o`, 0]);
                } else {
                    rowHands.push([`${cards[i]}${cards[j]}s`, 0]);
                }
            }
            hands.push(rowHands);
        }

        setTable(hands);
    };

    const tapHand = (hand) => {
        if (gameMode === "seriated") {
            if (hand === HAND_SORT[index][0]) {
                let array = [...table];
                for (let i = 0; i < CARD_LENGTH; i++) {
                    for (let j = 0; j < CARD_LENGTH; j++) {
                        if (hand === table[i][j][0]) {
                            array[i][j][1] = HAND_SORT[index][1];
                            setTable(array);
                        }
                    }
                }
                setIndex(index + 1);
            } else {
                setIndex(0);
                createTable();
            }
        } else {
            let checkPoint = true;
            for (let i = 0; i < HAND_SORT.length; i++) {
                if (hand === HAND_SORT[i][0]) {
                    if (i + 1 === randomHand) {
                        for (let j = 0; j < 13; j++) {
                            for (let k = 0; k < 13; k++) {
                                if (hand === table[j][k][0]) {
                                    checkPoint = false;
                                    var array = [...table];
                                    array[j][k][1] = HAND_SORT[i][1];
                                    setTable(array);
                                    var array2 = [...exactlyChoose];
                                    array2.push(randomHand);
                                    setExactlyChoose(array2);
                                    console.log(exactlyChoose);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (checkPoint) {
                setIndex(0);
                createTable();
                setExactlyChoose([]);
                findTrueHand();
            }
        }
    };

    const findTrueHand = () => {
        console.log(HAND_SORT[randomHand - 1]);
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                if (table[i][j][0] === HAND_SORT[randomHand - 1][0]) {
                    var array = [...table];
                    array[i][j][1] = HAND_SORT[randomHand - 1][1];
                    setTable(array);
                    setTimeout(() => {
                        setRandomHand(
                            Math.floor(Math.random() * RANDOM_RANGE) + 1
                        );
                        setIndex(0);
                        createTable();
                        setExactlyChoose([]);
                    }, 1000);
                }
            }
        }
        console.log(table);
    };

    return (
        <div className="row">
            {gameMode === "seriated" ? (
                <button
                    className="btn-change"
                    onClick={() => {
                        setRandomHand(
                            Math.floor(Math.random() * RANDOM_RANGE) + 1
                        );
                        setGameMode("random");
                        setIndex(0);
                        createTable();
                        setExactlyChoose([]);
                    }}
                >
                    Seriated
                </button>
            ) : (
                <button
                    className="btn-change"
                    onClick={() => {
                        setGameMode("seriated");
                        setIndex(0);
                        createTable();
                    }}
                >
                    {`Random: ${randomHand}`}
                </button>
            )}
            <table>
                <tbody>
                    {table?.map((row) => {
                        return (
                            <tr key={row[0]}>
                                {row?.map((hand) => {
                                    return (
                                        <td
                                            key={hand[0]}
                                            onClick={() => tapHand(hand[0])}
                                            style={{
                                                backgroundColor: `${
                                                    COLOR[hand[1]]
                                                }`,
                                            }}
                                        >
                                            {`${hand[0]}`}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="text">
                {gameMode === "seriated"
                    ? index === 33
                        ? "Congratulations! You will become a pro-player in the future"
                        : `You have found ${index} strongest starting hands`
                    : exactlyChoose.length == 33
                    ? "Congratulations! You will become a pro-player in the future"
                    : `You have found ${exactlyChoose.length} strongest starting hands`}
            </div>
        </div>
    );
};
export default Game;
