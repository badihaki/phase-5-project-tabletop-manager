import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";

function MessageBoard(){
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupsContext)
    const {id} = useParams();

    const group = groups.find(group => group.id==id)

    console.log(group);
    if(user!=null && group != null){
        return(
            <div>
                <h3>
                    {group.name}'s Message Board
                    <GroupMessages group={group} user={user} />
                    <br />
                    <br />
                    <form>
                        <h4>New Message:</h4>
                        <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} />
                    </form>
                    <br />
                    <Link to={"/dashboard"}> Back </Link>
                </h3>
            </div>
        )
    }
    else{
        return(
            <div>
                <Link to={"/dashboard"}><button>Back</button></Link>
            </div>
        )
    }
}

export default MessageBoard;