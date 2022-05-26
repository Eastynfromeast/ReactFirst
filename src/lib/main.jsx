import React from 'react';
import Board from './components/board'

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    /**
     * calculateWinner
     * @param {*} squares => [null, null, null, null, 'X', null, null, null, null]
     * @returns "O" || "X" || null
     */
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    checkExistValue(squares, index) {
        return squares[index];
    }

    handleClick(index) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log( history, current );
        console.log("Squares is " + squares);

        // if (this.calculateWinner(squares)) {
        //     return;
        // }
        if (this.checkExistValue(squares, index)) {
            return;
        }

        // 선택된 블럭이 아무도 선택하지 않은 블럭 
        squares[index] = this.state.xIsNext ? 'X' : 'O';
        

        // 
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
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
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

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
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(index) => this.handleClick(index)}
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

