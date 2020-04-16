import React, {createContext, useContext} from 'react';
import App from "./App";

//createContext
const AppContext = createContext();
export function Cont() {
    const user = {
        nickname: 'hoyy',
        isAdmin: true
    }

    return (
        <AppContext.Provider value={user}>
            <div>
                <Main/>
            </div>
        </AppContext.Provider>
    )
}
function Main() {
    return (
        <main>
            <Avatar/>
        </main>
    );
}
function Avatar() {
    return (
        <div>
            <User/>
        </div>
    );
}
const User = () => (
    <AppContext.Consumer>
        {user => {
            let label = 'user';
            if(user.isAdmin){
                label = 'admin';
            }

            return (
                <div>
                    <div>{label}</div>
                    <div>{user.nickname}</div>
                </div>
            );
        }}
    </AppContext.Consumer>
);

//useContext => <Context.Consumer> 를 사용하지 않고 바로 probs를 받기 가능
//여러 Context를 사용시 코드가 더러워지는 것을 막을 수 있음
const DogContext = createContext();
const CatContext = createContext();
export function Dog() {
    const dog = {
        nickname: 'dog',
        isAdmin: true
    }

    return (
        <DogContext.Provider value={dog}>
            <div>
                <Cat/>
            </div>
        </DogContext.Provider>
    );
}
function Cat() {
    const cats = [
        {
            title: 'useContext 알아보기',
            content: 'React Context...'
        },
        {
            title: 'catcat',
            content: 'caatcatcat'
        }
    ];

    return (
        <CatContext.Provider value={cats}>
            <Children/>
        </CatContext.Provider>
    );
}
function Children() {
    const dog = useContext(DogContext);
    const cats = useContext(CatContext);

    let label = 'user';
    if(dog.isAdmin){
        label = 'admin';
    }

    return (
        <div>
            <div>{label}</div>
            <div>{dog.nickname}</div>
            <div>{cats.map((cat, index) => (
                <div key={index}>
                    <div>{cat.title}</div>
                    <div>{cat.content}</div>
                </div>
            ))}
            </div>
        </div>
    );
}
