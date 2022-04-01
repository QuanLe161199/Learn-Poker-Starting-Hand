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
    ["A6", 4],
    ["A8o", 4],
    ["KTo", 4],
];

const COLOR = ["white", "#12900d", "#bf7c18", "#e4d618"];

const Game = () => {
    const [table, setTable] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        createTable();
    }, []);

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
    };

    return (
        <div className="container">
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
                {index == 33
                    ? "Congratulations! You will become a pro-player in the future"
                    : `You have found ${index} strongest starting hands`}
            </div>
        </div>
    );
};
export default Game;
