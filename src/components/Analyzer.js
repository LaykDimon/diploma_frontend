import React, { useState } from 'react';
import '../style.css';
import TotalIndicator from './WordsIndicator';
//import AnalyzeButton from './AnalyzeButton';

export default function AnalyzeField() {
    
    const [inputText, setInputText] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const [showResults, setShowResults] = useState(false) 
    
    const handleTextChange = (e) => setInputText(e.target.value);
    const handleUrlChange = (e) => setInputUrl(e.target.value);
    
    const [analyzedText, setAnalyzedText] = useState('');

    const Results = () => (
        <table className='styledTable'>
            <thead>
                <tr>
                    <th>Параметр</th>
                    <th>Значення</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Кількість символів</td>
                    <td>{analyzedText["symbol_count"]}</td>
                </tr>
                <tr>
                    <td>Кількість символів без пунктуаційних знаків</td>
                    <td>{analyzedText["symbol_count_without_punct"]}</td>
                </tr>
                <tr>
                    <td>Кількість слів</td>
                    <td>{analyzedText["word_count"]}</td>
                </tr>
                <tr>
                    <td>Кількість речень</td>
                    <td>{analyzedText["sentence_count"]}</td>
                </tr>
                <tr>
                    <td className = 'tooltip'>Водність тексту
                        <span className='tooltipText'>Відношення стоп-слів до всіх слів в тексті</span>
                    </td>
                    <td>{analyzedText["water_content"]}%</td>
                </tr>
                <tr>
                    <td className = 'tooltip'>Класична нудота
                        <span className='tooltipText'>Квадратний корінь із числа повторень найчастішого слова</span>
                    </td>
                    <td>{analyzedText["classic_nausea"]}</td>
                </tr>
                <tr>
                    <td className = 'tooltip'>Академічна нудота
                        <span className='tooltipText'>Відношення кількості повторень найчастішого ключового слова до всіх слів в тексті</span>
                    </td>
                    <td>{analyzedText["academic_nausea"]}</td>
                </tr>
            </tbody>
        </table>
      )

    function analyze() {
        fetch('http://127.0.0.1:8000/api/analyzer/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            input_text: inputText
        }),
        mode: 'cors',
      }).then(response => response.json())
      .then(data => {
          setAnalyzedText(data.text_stats);
          setShowResults(true);
      });
    }

    function parse() {
        fetch('http://127.0.0.1:8000/api/analyzer/parse/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            url: inputUrl
        }),
        mode: 'cors',
      }).then(response => response.json())
      .then(data => setInputText(data.content));
    }
    
    
    return (
        <div>
            <div className='title'>Семантичний аналіз тексту</div>
            <textarea type="url" className='inputUrl' value={inputUrl} onChange={handleUrlChange}></textarea>
            <button className="analyzeBtn" onClick={parse}>Вивести текст</button>
            <textarea className="inputText" value={inputText} onChange={handleTextChange}></textarea>
            <br />
            {/* <TotalIndicator /> */}
            <button className="analyzeBtn" onClick={analyze}>Аналізувати</button>
            { showResults ? <Results /> : null }
        </div>
    );

    
}