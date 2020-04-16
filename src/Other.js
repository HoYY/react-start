import React, {Component} from "react";
import {createPortal} from "react-dom";

//React Portal을 사용하여 App 이외의 최상위 컴포넌트를 사용할 수 있다.
//또한 App 컴포넌트와 Other 컴포넌트 사이에 State를 공유할 경우 구조가 이상해질 수 있는 것을 막을 수 있다.
class Other extends Component {
    render() {
        return (
            <div>
                <h1>React Portal</h1>
                Other
            </div>
        );
    }
}
export function Portal({children}) {
    const rootElement = document.getElementById('other');

    return createPortal(children, rootElement);
}



export default Other