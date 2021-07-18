import React from "react"
import axios from 'axios';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
let message;

export default class WalletApp extends React.Component{

    constructor(){
        super()
        this.getById=this.getById.bind(this)
        this.create=this.create.bind(this)
        this.setInput=this.setInput.bind(this)
        this.setId=this.setId.bind(this)
        this.update=this.update.bind(this)
        this.withdraw=this.withdraw.bind(this)
        this.getAll=this.getAll.bind(this)
        
       this.state={
           output:"Output Body",
           input:"",
           userId:"",
           rowData : []
       }
    }
    setId(event){
        event.preventDefault()
        this.setState({
            userId:event.target.value
        })
    }
    getById(event){
        event.preventDefault()
        axios.get(`https://ncy7xi9hz2.execute-api.us-east-1.amazonaws.com/Prod/getFunds/${this.state.userId}`)
        .then(res => {
            
          const data = res.data;
          this.setState({
            output:JSON.stringify(res.data)
        })
        })
       
       
   
    }
    create(event){
        
        let user=JSON.parse(this.state.input)
       

        event.preventDefault()
        axios.post(`https://ncy7xi9hz2.execute-api.us-east-1.amazonaws.com/Prod/createUser`, {
            "userAccountId":user.userAccountId ,
            "Amount":user.Amount,
            "Name":user.Name,
            "Balance":user.Balance
            })
        .then(res => {
            this.setState({
                output:res.data.msg
            })
        })
    }
    setInput(event){
        
        event.preventDefault()
        this.setState({
            input:event.target.value
        })
    }
    update(event){
        let user=JSON.parse(this.state.input)
      
        event.preventDefault()
        axios.put(`https://ncy7xi9hz2.execute-api.us-east-1.amazonaws.com/Prod/addFunds/1`, { 
            "userAccountId":user.userAccountId ,
            "Amount":user.Amount,
            "Name":user.Name,
            "Balance":user.Balance
         })
        .then(res => {
            this.setState({
                output:res.data.msg
            })
        })
    }
    withdraw(event){
        let user=JSON.parse(this.state.input)

        axios.put(`https://ncy7xi9hz2.execute-api.us-east-1.amazonaws.com/Prod/withdrawFunds/1`,{
            "userAccountId":user.userAccountId ,
            "Amount":user.Amount,
            "Name":user.Name,
            "Balance":user.Balance
        })
      .then(res => {
        this.setState({
            output:res.data.msg
        })
      })
    }
    getAll(event){
        axios.get(`https://ncy7xi9hz2.execute-api.us-east-1.amazonaws.com/Prod/getRecords/${this.state.userId}`)
        .then(res => {
          this.setState({
              rowData:res.data
          })
        })
        
    }
    render(){
        return (
            <div>
            <div style={{marginTop:"50px"}}>
                    <div className="submit"style={{float:"left"}}>
                        <div>
                            <button className="create-btn" onClick={this.create}>Create </button>
                        </div>
                        <div>
                            <button className="create-btn" onClick={this.getById}>Get</button>
                        </div>
                       
                        <div>
                            <button onClick={this.update} className="create-btn">Add</button>
                        </div>
                        <div>
                            <button onClick={this.withdraw} className="create-btn">Withdraw</button>
                        </div>
                        <div>
                             <button onClick={this.getAll}className="create-btn">Get all records</button>
                         </div>
                </div>
                <div  className="inputContainer" style={{float:"right"}}>
                    <div>
                        <input className="userip" onChange={this.setId} placeholder="User Id"></input>
                    </div>
                    <div>
                        <textarea className="text-area" onChange={this.setInput} placeholder="input"></textarea>
                    </div>
                </div>
               
            </div>
            <div className="output">
                         <div className="outputDisplay" >
                         {this.state.output}
                        </div> 
            </div>
           <div className="tableData">
                <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
                    <AgGridReact
                        rowData={this.state.rowData}>
                        <AgGridColumn field="Balance"></AgGridColumn>
                        <AgGridColumn field="Timestamp"></AgGridColumn>
                        <AgGridColumn field="userAccountId"></AgGridColumn>
                        <AgGridColumn field="Name"></AgGridColumn>

                    </AgGridReact>
                  </div>
                   
           </div>
        </div>
        )
    }
}