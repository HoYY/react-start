import React, {useState, useEffect, createRef, useRef, forwardRef, useMemo, useReducer} from 'react';
import './App.css';
import './Context';
import {Cont, Dog} from "./Context";
import Other, {Portal} from "./Other";

const animalList = ['dog', 'cat', 'tiger'];
const Animals = () => {
    return (
        <ol>
            <li>
                <span>{animalList[0]}</span>
            </li>
            <li>
                <span>{animalList[1]}</span>
            </li>
            <li>
                <span>{animalList[2]}</span>
            </li>
        </ol>
    );
}

//multiple components
const Animal = ({name}) => (
    <li>
        <span>{name}</span>
    </li>
);
const AnimalsMult = () => {
    return (
        <ol>
            {animalList.map((animal, index) => (
                <Animal key={index} name={animal} />
            ))}
        </ol>
    );
}

//useState, useEffect(count가 달라질 경우만 발동, [] => 처음 한번만 발동
const Counter = () => {
    const [nickName, setNickname] = useState('HoYY');
    const [count, setCount] = useState(() => {
        let count = 0;
        for(let index=0; index<100; index+=1){
            count += 1;
        }
        return count;
    });

    const toggleNickname = () => {
        if(nickName === 'HoYY') {
            setNickname('pooh');
        }
        else {
            setNickname('HoYY');
        }
    }

    const decreaseCount = () => {
        setCount(count - 1);
    }
    const increaseCount = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        document.title = count;
    }, [count]);

    return (
        <div>
            <p>{nickName}</p>
            <button onClick={toggleNickname}>toggle</button>
            <p>{count}</p>
            <button onClick={decreaseCount}>- 1</button>
            <button onClick={increaseCount}>+ 1</button>
        </div>
    );
}

//Custom Hooks : 컴포넌트와 로직을 분리할 수 있음, 로직을 재활용할 수 있음
const useUser = () => {
    const [nickname, setNickname] = useState('');

    const updateNickname = event => {
        const nickname = event.target.value;
        setNickname(nickname);
    }

    return [nickname, updateNickname];
}
const User = () => {
    const [nickname, setNickname] = useUser();

    return (
        <div>
            <label>{nickname}</label>
            <input value={nickname} onChange={setNickname}/>
        </div>
    );
}

//document.getElememtById
const LoginDocument = () => {
    const requestToLogin = event => {
        event.preventDefault();

        const idReference = document.getElementById('id');
        const pwReference = document.getElementById('pw');

        const id = idReference.value;
        const pw = pwReference.value;

        // a Ajax logic
    }

    return (
        <div>
            <form onSubmit={requestToLogin}>
                <label>
                    id:
                    <input id={'id'} type={'text'} />
                </label>
                <label>
                    pw:
                    <input id={'pw'} type={'password'} />
                </label>
                <button type={'submit'}>login</button>
            </form>
        </div>
    )
}

//useRef() == useState(() => createRef())
//ref를 하위 컴포넌트에서 받아오려면 forwardRef()를 사용해야 한다.
const LoginRef = () => {
    const idReference = useRef();
    const [pwReference, setPwReference] = useState(() => createRef());

    const requestToLogin = event => {
        event.preventDefault();

        const id = idReference.current;
        const pw = pwReference.current;

        // a Ajax logic
    }

    return (
        <form onSubmit={requestToLogin}>
            <LabelInput text={'id:'} ref={idReference} type={'text'} />
            <LabelInput text={'pw:'} ref={pwReference} type={'password'} />
            <button type={'submit'}>login</button>
        </form>
    );
}
const LabelInput = forwardRef(({text, type}, ref) => (
    <label>
        {text}
        <input ref={ref} type={type}/>
    </label>
))

//useMemo() => useEffect()처럼 2번째 파라미터에 전달한 배열이 이전의 배열과 다르면 1번째 파라미터가
//발동하며, useState()랑 다르게 State를 변경하는 함수를 제공하지 않는다.
const UserMemo = () => {
    const [nickname, setNickname] = useState('');
    const nicknameLength = useMemo(() => nickname.length, [nickname]);

    const updateNickname = event => {
        const nickname = event.target.value;
        setNickname(nickname);
    }

    return (
        <div>
            <input onChange={updateNickname} />
            <label>{nicknameLength}</label>
        </div>
    );
}

//하나의 컴포넌트에 State 여러개
//useState
const useAdmin = () => {
    const [user, setUser] = useState({
        isAdmin: false,
        nickname: '',
        email: ''
    });

    const reset = () => setUser({
        isAdmin: false,
        nickname: '',
        email: ''
    });

    const toggleToBeAdmin = () => setUser({ ...user, isAdmin: !user.isAdmin});
    const updateNickname = event => setUser({ ...user, nickname: event.target.value});
    const updateEmail = event => setUser({ ...user, email: event.target.value});

    return {
        user,
        reset,
        toggleToBeAdmin,
        updateNickname,
        updateEmail
    }
}
const Admin = () => {
    const user = useAdmin();

    let label = 'user';
    if(user.user.isAdmin){
        label = 'admin';
    }

    return (
        <div>
            <label>{label}</label>
            <h2>{user.user.nickname}</h2>
            <h3>{user.user.email}</h3>
            <button onClick={user.reset}>reset</button>
            <button onClick={user.toggleToBeAdmin}>toggle</button>
            <input type={'text'} value={user.user.nickname} onChange={user.updateNickname} />
            <input type={'text'} value={user.user.email} onChange={user.updateEmail} />
        </div>
    );
}

//useReducer
const initialUserState = {
    isAdmin: false,
    nickname: '',
    email: ''
}
const userReducer = (state, action) => {
    switch (action.type) {
        case 'reset': {
            return initialUserState;
        }
        case 'toggleToBeAdmin': {
            return {...state, isAdmin: !state.isAdmin};
        }
        case 'updateNickname': {
            return {...state, nickname: action.nickname};
        }
        case 'updateEmail': {
            return {...state, email: action.email};
        }
        default: {
            throw new Error('unexpected action.type: ${action.type}');
        }
    }
}
const AdminReducer = () => {
    const [user, dispatchUser] = useReducer(userReducer, initialUserState);

    let label = 'user';
    if(user.isAdmin){
        label = 'admin';
    }

    const reset = () => dispatchUser({type: 'reset'});
    const toggleToBeAdmin = () => dispatchUser({type: 'toggleToBeAdmin'});
    const updateNickname = event => dispatchUser({type: 'updateNickname'
        , nickname: event.target.value});
    const updateEmail = event => dispatchUser({type: 'updateEmail'
        , email: event.target.value});

    return (
        <div>
            <label>{label}</label>
            <h2>{user.nickname}</h2>
            <h3>{user.email}</h3>
            <button onClick={reset}>reset</button>
            <button onClick={toggleToBeAdmin}>toggle</button>
            <input type={'text'} value={user.nickname} onChange={updateNickname} />
            <input type={'text'} value={user.email} onChange={updateEmail} />
        </div>
    );
}


class App extends React.Component {
    state = {
        count: 0
    }

    add = () => {
        this.setState(current => ({count: current.count + 1}));
    }

    minus = () => {
        this.setState(current => ({ count: current.count - 1 }));
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.add}>Add</button>
                <button onClick={this.minus}>Minus</button>
                <hr/>
                <h1>useState, useEffect</h1>
                <Counter/>
                <hr/>
                <h1>Multiple Components</h1>
                <Animals/>
                <AnimalsMult/>
                <hr/>
                <h1>Custom Hooks</h1>
                <User/>
                <hr/>
                <h1>useRef</h1>
                <LoginDocument/>
                <LoginRef/>
                <hr/>
                <h1>userMemo</h1>
                <UserMemo/>
                <hr/>
                <h1>여러 속성 하나의 State로 묶이</h1>
                <Admin/>
                <hr/>
                <h1>useReducer</h1>
                <AdminReducer/>
                <hr/>
                <h1>createContext</h1>
                <Cont/>
                <hr/>
                <h1>useContext</h1>
                <Dog/>
                <hr/>

                <Portal>
                    <Other/>
                </Portal>
            </div>
        );
    }
}

export default App;
