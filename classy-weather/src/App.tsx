import React from "react";
interface State{
count:number
}
class Counter extends React.Component<{},State>{
  constructor(props:{}){
    super(props)
    this.state ={count:5}

    this.decrementCount= this.decrementCount.bind(this)
    this.increseCount= this.increseCount.bind(this)
  }

  decrementCount(){
    this.setState(curState=>{return{count:curState.count-1}})
  }
  increseCount(){
    this.setState(curState=>{return{count:curState.count+1}})
  }
render(){
  return(
    <div>
      <button onClick={this.decrementCount}>-</button>
      <span>{this.state.count}</span>
      <button onClick={this.increseCount}>+</button>
    </div>
  )
}
}

export default Counter