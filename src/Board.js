import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
    
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps ={

    nrows: 5,
    ncols: 5,
    gameProbability: 0.25

  }

  constructor(props) {
    super(props);
    this.state ={
      hasWon: false,
      board : this.createBoard()
    }

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(let y=0; y<this.props.nrows; y++){
      let row = [];
      for(let x=0;x<this.props.ncols;x++){
       row.push(Math.random() < this.props.gameProbability);
      }
      board.push(row);
    }

    return board;
    // TODO: create array-of-arrays of true/false values
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log(coord)


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y+1,x);
    flipCell(y-1,x);
    flipCell(y,x+1);
    flipCell(y,x-1);

    let hasWon = board.every(row => row.every(cell => {console.log(cell); return !cell})); 
    console.log('HasWon:'+hasWon);
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    let tableBoard = []; 

    if(this.state.hasWon){
      return <h1>You Won</h1>
    }

    else{    // if the game is won, just show a winning msg & render nothing else

    // TODO
    for(let y =0; y < this.props.nrows;y++){
      let row =[];
      for(let x=0; x< this.props.ncols;x++){
        let coord=`${y}-${x}`
         row.push(<Cell isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
      }
      tableBoard.push(<tr>{row}</tr>)
    }}
    // make table board

    // TODO

    return(
      <table className="Board">
        <tbody>{tableBoard}
         </ tbody>
         </ table>

    )
  }
}


export default Board;
