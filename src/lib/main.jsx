
import React from 'react';
import Board from './components/board'

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            played: 0,
            turnForX: true
        }
    }

    /**
     * calculateWinner
     * @param {*} squares => [null, null, null, null, 'X', null, null, null, null]
     * @returns "O" || "X" || null
     */
    checkWinningCases(squares) {
        const winningCases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winningCases.length; i++) {
            const [a, b, c] = winningCases[i];
            
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    checkExistValue(squares, index) {
        //console.log(squares[index]); 값은 무조건 null 이 나옴 
        return squares[index];
        
    }

    squareClicked(index) {
        const history = this.state.history.slice(0, this.state.played + 1);
        const markedLast = history[history.length - 1];
        const checkedSquare = markedLast.squares.slice();

        // if (this.calculateWinner(squares)) {
        //     return;
        // }
        // if (this.checkExistValue(squares, index)) {
        //     return;
        // }

        // 선택된 블럭이 아무도 선택하지 않은 블럭 
        checkedSquare[index] = this.state.turnForX ? 'X' : 'O';
        

        // 
        this.setState({
            history: history.concat([{
                squares: checkedSquare
            }]),
            played: history.length,
            turnForX: !this.state.turnForX
        });
    }

    // jumpTo(step) {
    //     this.setState({
    //         stepNumber: step,
    //         xIsNext: (step % 2) === 0,
    //     });
    // }


    render() {
        const history = this.state.history;
        const markedLast = history[this.state.played];
        const winner = this.checkWinningCases(markedLast.squares);

        // const moves = history.map((step, move) => {
        //     const desc = move ?
        //         'Go to move #' + move :
        //         'Go to game start';

        //     return (
        //         <li key={move}>
        //             <button onClick={() => this.jumpTo(move)}> {desc} </button>
        //         </li>
        //     )

        // })

        let status;
        if (winner) {
            status =  winner + ' Won!';
        } else {
            status = 'Next player: ' + (this.state.turnForX ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={markedLast.squares}
                        onClick={(index) => this.squareClicked(index)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/* <ol>{moves}</ol> */}
                </div>
            </div>
        );
    }
}

export default Main;

