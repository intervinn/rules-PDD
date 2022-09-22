
import React from "react"

import "./styles.css"
import logo1 from "./imgs/1.jpg"
import logo2 from "./imgs/2.jpg"
import logo3 from "./imgs/3.jpg"
import logo4 from "./imgs/4.jpg"
import logo5 from "./imgs/5.jpg"


let selected : {[key : string] : string} = {}

const set = (index: string, value: string) => {
    selected[index] = value
    console.log(selected)
}

const submit = async () => {
    console.log("hi")
    await fetch(
        "/result",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selected)
        }
    ).then( async () => {
        const req = await fetch("/result", {method: "GET"})
        const res = await req.json()
        console.log(res)
        const renderRoot = document.getElementById("resultroot") as HTMLElement
        let cardContent = `
        <h3>Результат</h3> </br>
        <p> 1 - ${res["1"]} </p> 
        <p> 2 - ${res["2"]} </p> 
        <p> 3 - ${res["3"]} </p> 
        <p> 4 - ${res["4"]} </p> 
        <p> 5 - ${res["5"]} </p>

        Итог: ${res["score"]}/5
        `
        cardContent = cardContent.replaceAll("true", "Верно")
        cardContent = cardContent.replaceAll("false", "Неверно")
        renderRoot.innerHTML = cardContent
    })

}

interface SelectionProps {
    option1Title : string, 
    option2Title : string, 
    option3Title: string, 
    selectionIndex: string
}

const ThreeOptionsSelection = ({option1Title, option2Title, option3Title, selectionIndex} : SelectionProps) => {
    return (
        <div>
            <input 
                id={`${selectionIndex}-1`} 
                value={`${selectionIndex}-1`} 
                name={`${selectionIndex}-1`} 
                onClick={() => { set(selectionIndex, "1") }} 
                type={"radio"}/> <label htmlFor={`${selectionIndex}-1`} >{option1Title}</label> <br/>
            <input 
                id={`${selectionIndex}-2`}
                value={`${selectionIndex}-1`} 
                name={`${selectionIndex}-1`}  
                onClick={() => { set(selectionIndex, "2") }} 
                type={"radio"}/> <label htmlFor={`${selectionIndex}-2`} >{option2Title}</label>  <br/>
            <input 
                id={`${selectionIndex}-3`} 
                value={`${selectionIndex}-1`} 
                name={`${selectionIndex}-1`}  
                onClick={() => { set(selectionIndex, "3") }} 
                type={"radio"}/> <label htmlFor={`${selectionIndex}-3`} >{option3Title}</label>  <br/>
        </div>
    )
}

const App = () => {
    return (
        <>

        <table className="quiztable">
            <tbody>
            <tr>
                <td>
                    <img className="img1" src={logo1} alt={"signs"}/>
                </td>
                <td className="question">
                <h3> Какой из знаков используется для обозначения пешеходной дорожки?</h3>
                    <ThreeOptionsSelection option1Title="Б" option2Title="Б и В" option3Title="Все" selectionIndex="1" ></ThreeOptionsSelection>
                </td>
            </tr>

            <tr>
                <td>
                    <img className="img2" src={logo2} alt={"bluecar"}/>
                </td>
                <td className="question">
                    <h3>Вы (синий автомобиль) намерены повернуть налево, кому следует уступить дорогу?</h3>
                    <ThreeOptionsSelection option1Title="Легковому автомобилю и автобусу" option2Title="Автобусу и мотоциклу" option3Title="Всем" selectionIndex="2"></ThreeOptionsSelection>
                </td>
            </tr>

            <tr>
                <td>
                    <img className="img3" src={logo3} alt={"whoviolated"}/>
                </td>
                <td className="question">
                    <h3>Кто из водителей нарушил правила стоянки</h3>
                    <ThreeOptionsSelection option1Title="А" option2Title="Б" option3Title="Оба нарушили" selectionIndex="3"></ThreeOptionsSelection>
                </td>
            </tr>

            <tr>
                <td>
                    <img src={logo4} />
                </td>
                <td className="question">
                    <h3>Действие каких знаков из указанных распространяется только до ближайшего по ходу движения перекрёстка?</h3>
                    <ThreeOptionsSelection option1Title="А и В" option2Title="Б и Г" option3Title="Г и В" selectionIndex="4"></ThreeOptionsSelection>
                </td>
            </tr>

            <tr>
                <td>
                    <img src={logo5} />
                </td>
                <td className="question">
                    <h3>Какой из указанных знаков запрещает дальнейшее движение всех без исключения транспортных средств?</h3>
                    <ThreeOptionsSelection option1Title="А" option2Title="Б" option3Title="В" selectionIndex="5"></ThreeOptionsSelection>
                </td>
            </tr>
            </tbody>
            
        </table>

        <div className="submitcontainer">
            <button className="submit" onClick={ () => {submit()} }>
                {"Отправить"}
            </button>
        </div>

        </>
    )
}

export default App