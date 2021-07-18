let message;
export default function walletApp(){

    const getById=(event)=>{
       
        message="YES"
    }
    const submit=(event)=>{
       event.preventDefault()
        //message="YES"
    }
    return (
        <div>
            <form onSubmit={submit}>
                    <div>
                    <div>
                    <button onClick={getById}>Get</button>
                    </div>
                    <div>
                    <button>Create</button>
                    </div>
                    <div>
                    <button>Add</button>
                    </div>
                    <div>
                    <button>X</button>
                    </div>
                    <div>
                    <button>GetAll</button>
                </div>
                </div>
                <div>
                    <input placeholder="User Id"></input>
                </div>
                <div>
                    <textArea placeholder="input"></textArea>
                </div>
                <div>{message}</div>
            </form>
            
        </div>
    )
}